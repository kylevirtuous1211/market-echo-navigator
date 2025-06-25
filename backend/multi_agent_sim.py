from langchain_community.tools.tavily_search import TavilySearchResults
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from pathlib import Path
import json
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.store.memory import InMemoryStore
from langgraph.prebuilt import create_react_agent
from langgraph_swarm import create_handoff_tool, create_swarm
import re
import datetime
import uuid
from agent_class import Agent, SynthesizerAgent
# from supabase import create_client, Client

# Setup
load_dotenv(dotenv_path='.env')  
api_key = os.getenv("API_KEY")
model = ChatOpenAI(model="llama-3.3-70b-versatile", api_key=api_key, base_url="https://api.groq.com/openai/v1")

# supabase: Client = create_client(
#     os.getenv("SUPABASE_URL"),
#     os.getenv("SUPABASE_ANON_KEY")
# )

def save_agent_simulations_to_supabase(agent_simulations):
    """Save agent simulation results to Supabase"""
    try:
        if agent_simulations:
            response = supabase.table('beauty_agent_simulations').insert(agent_simulations).execute()
            print(f"Saved {len(agent_simulations)} agent simulations to Supabase")
            return response.data
    except Exception as e:
        print(f"Error saving to Supabase: {e}")
        raise e

def clean_agent_response(content):
    """清理代理回應"""
    cleaned = re.sub(r'\n{3,}', '\n\n', content)
    return cleaned.strip()

def create_persona_agents():
    """創建所有角色代理實例"""
    agents = [
        Agent(
            name="注重預算的貝絲",
            agent_name="budget_conscious_beth",
            demographics="35-45歲，中層管理，郊區家庭生活方式",
            motivations="尋求物超所值，廣泛比較價格",
            concerns="價格點，長期耐用性，隱藏成本，保固覆蓋"
        ),
        Agent(
            name="精通科技的泰勒",
            agent_name="tech_savvy_taylor",
            demographics="25-34歲，軟體工程師，都市早期採用者",
            motivations="想要尖端功能，最新技術，無縫整合",
            concerns="技術規格，相容性，未來防護，軟體更新"
        ),
        Agent(
            name="注重品質的昆恩",
            agent_name="quality_focused_quinn",
            demographics="45-60歲，資深專業人士，重視工藝",
            motivations="優先考慮製造品質，品牌聲譽，優質材料",
            concerns="製造品質，客戶服務，品牌可靠性，轉售價值"
        )
    ]
    return agents

def agent_to_simulation_result(persona, content, simulation_id, product_name, product_question):
    """Format agent result to match AgentSimulation interface"""
    return {
        "id": str(uuid.uuid4()),
        "simulation_id": simulation_id,
        "product_name": product_name,
        "agent_name": persona.agent_name,
        "agent_type": persona.name,
        "agent_demographics": persona.demographics,
        "agent_motivations": persona.motivations,
        "agent_concerns": persona.concerns,
        "purchase_intent": None,  # Fill with actual value if available
        "price_sensitivity": None,  # Fill with actual value if available
        "brand_loyalty": None,  # Fill with actual value if available
        "response_text": content,
        "feedback_categories": None,  # Fill if available
        "recommendations": None,      # Fill if available
        "risk_factors": None,         # Fill if available
        "simulation_date": datetime.utcnow().isoformat()
    }

def run_market_research_discussion(product_name, price):
    """執行完整的市場研究討論"""
    product_question = f"我正在銷售{product_name}，價格={price}"
    # 創建角色代理實例
    persona_agents = create_persona_agents()
    synthesizer = SynthesizerAgent()
    
    print(f"產品問題：{product_question}")
    print(f"已創建 {len(persona_agents)} 個角色代理：{[agent.name for agent in persona_agents]}")
    
    # 創建LangGraph代理
    langgraph_agents = []
    for persona in persona_agents:
        lg_agent = persona.create_langgraph_agent(model, product_question)
        langgraph_agents.append(lg_agent)
    
    # 添加綜合分析師
    synthesizer_lg_agent = synthesizer.create_langgraph_agent(model, product_question)
    langgraph_agents.append(synthesizer_lg_agent)
    
    # 設置工作流程
    checkpointer = InMemorySaver()
    store = InMemoryStore()
    
    workflow = create_swarm(
        langgraph_agents,
        default_active_agent=persona_agents[0].agent_name
    )
    
    app = workflow.compile(checkpointer=checkpointer, store=store)
    config = {"configurable": {"thread_id": f"discussion_{hash(product_question)}"}}
    
    results = {}
    current_result = None
    simulation_id = str(uuid.uuid4())
    agent_simulations = []
    
    try:
        # 順序執行每個角色代理
        for i, persona in enumerate(persona_agents):
            print(f"\n=== 執行 {persona.name} ===")
            
            if i == 0:
                # 第一個代理
                current_result = app.invoke(
                    {
                        "messages": [{"role": "user", "content": product_question}],
                        "active_agent": persona.agent_name
                    },
                    config
                )
            else:
                # 後續代理
                current_result = app.invoke(
                    {
                        "messages": current_result["messages"] + [{"role": "user", "content": product_question}],
                        "active_agent": persona.agent_name
                    },
                    config
                )
            
            # 提取並存儲回應
            if "messages" in current_result and current_result["messages"]:
                latest_message = current_result["messages"][-1]
                if hasattr(latest_message, "content"):
                    content = clean_agent_response(latest_message.content)
                    results[persona.name] = content
                    # TODO: more detail, change prompting
                    agent_simulations.append(
                        agent_to_simulation_result(
                            persona, content, simulation_id, product_name, product_question
                        )
                    )
                    print(f"{persona.name}：{content}")
        
        # 執行綜合分析師
        print("\n=== 最終綜合分析 ===")
        current_result = app.invoke(
            {
                "messages": current_result["messages"] + [{"role": "user", "content": "請綜合所有回應並提供您的最終分析。"}],
                "active_agent": synthesizer.agent_name
            },
            config
        )
        
        # 提取綜合分析師回應
        if "messages" in current_result and current_result["messages"]:
            latest_message = current_result["messages"][-1]
            if hasattr(latest_message, "content"):
                content = clean_agent_response(latest_message.content)
                results["綜合分析師"] = content
                print(f"綜合分析師：{content}")
        
        print("\n市場研究討論成功完成！")
        
        # 打印角色詳情
        print("\n=== 使用的角色 ===\n")
        for i, persona in enumerate(persona_agents, 1):
            print(f"角色 {i}：{persona.name}")
            print(f"人口統計：{persona.demographics}")
            print(f"動機：{persona.motivations}")
            print(f"關注點：{persona.concerns}")
            print()
            
        # After generating agent_simulations, save to Supabase
        try:
            if agent_simulations:
                # Add simulation_id and timestamp to each record
                simulation_id = str(uuid.uuid4())
                for sim in agent_simulations:
                    sim['simulation_id'] = simulation_id
                    sim['simulation_date'] = datetime.now().isoformat()
                    sim['product_name'] = product_name
                
                # Save to Supabase
                save_agent_simulations_to_supabase(agent_simulations)
                
        except Exception as e:
            print(f"Error saving simulation results: {e}")
            # Continue execution even if saving fails
        
        return results, persona_agents, agent_simulations
        
    except Exception as e:
        print(f"討論過程中發生錯誤：{str(e)}")
        return results, persona_agents

def add_custom_agent(name, agent_name, demographics, motivations, concerns):
    """幫助函數，輕鬆添加新的自定義代理"""
    return Agent(name, agent_name, demographics, motivations, concerns)

# 使用範例和擴展
if __name__ == "__main__":
    # 定義您的產品問題
    price = 300
    product_name = "柯南手機遊戲"
    
    # 執行市場研究
    results, personas, agent_simulations = run_market_research_discussion(product_name, price)
    import json
    print(json.dumps(agent_simulations, ensure_ascii=False, indent=2))