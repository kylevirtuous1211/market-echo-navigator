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

# Setup
load_dotenv(dotenv_path='.env')  
api_key = os.getenv("API_KEY")
model = ChatOpenAI(model="llama-3.3-70b-versatile", api_key=api_key, base_url="https://api.groq.com/openai/v1")

def clean_agent_response(content):
    """清理代理回應"""
    cleaned = re.sub(r'\n{3,}', '\n\n', content)
    return cleaned.strip()

class Agent:
    """用於創建角色代理的通用代理類別"""
    
    def __init__(self, name, agent_name, demographics, motivations, concerns):
        self.name = name
        self.agent_name = agent_name
        self.demographics = demographics
        self.motivations = motivations
        self.concerns = concerns
    
    def create_langgraph_agent(self, model, product_question, tools=None):
        """創建實際的LangGraph代理"""
        if tools is None:
            tools = [create_handoff_tool(agent_name="synthesizer")]
        
        prompt = f"""您是{self.name}，一位正在分析此產品問題的潛在客戶：{product_question}

        您的個人資料：
        - 人口統計：{self.demographics}
        - 動機：{self.motivations}
        - 關注點：{self.concerns}

        任務：從您的角色視角回答產品問題。請專注於：
        1. 此問題如何與您的特定關注點和動機相關
        2. 作為這類型客戶您會有什麼痛點
        3. 您對所提及的定價和目標人群的看法
        4. 基於您的角色的具體建議
        
        重要：請使用純文字格式回應，不要使用任何Markdown格式符號（如**或*）。

        在提供完整分析後，請使用交接工具將控制權交給綜合分析師。
        
        請保持詳盡但簡潔。在整個回應中保持您的角色特性。
        """
        
        return create_react_agent(
            model,
            tools,
            prompt=prompt,
            name=self.agent_name
        )

class SynthesizerAgent:
    """用於最終分析的綜合分析師代理"""
    
    def __init__(self, agent_name="synthesizer"):
        self.agent_name = agent_name
    
    def create_langgraph_agent(self, model, product_question):
        """創建綜合分析師代理"""
        prompt = f"""您是一位市場研究綜合分析師，正在分析對以下問題的回應：{product_question}

        您的任務：
        1. 審查所有角色代理的觀點
        2. 識別各角色間的共同痛點和關注點
        3. 突出每個人口群體的獨特見解
        4. 分析定價策略和目標人群
        5. 提供解決客戶痛點的可行建議
        6. 總結整體市場可行性評估
        
        重要：請使用純文字格式回應，不要使用任何Markdown格式符號（如**或*）。
        
        請用清晰的章節結構化您的分析：
        - **共同痛點**
        - **角色特定見解** 
        - **定價分析**
        - **建議**
        - **市場可行性**
        
        請提供全面且具體的可行見解。
        """
        
        return create_react_agent(
            model,
            [],
            prompt=prompt,
            name=self.agent_name
        )

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

def run_market_research_discussion(product_question):
    """執行完整的市場研究討論"""
    
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
        
        return results, persona_agents
        
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
    buyer_age = 21
    question_for_analysis = "客戶在玩這類遊戲時的痛點是什麼？"
    
    product_question = f"我正在銷售糖果。價格={price}，買家年齡={buyer_age}。問題：{question_for_analysis}"
    
    # 執行市場研究
    results, personas = run_market_research_discussion(product_question)
    
    # 如何擴展自定義代理的範例
    print("\n=== 範例：添加自定義代理 ===")
    custom_agent = add_custom_agent(
        name="注重健康的漢娜",
        agent_name="health_conscious_hannah",
        demographics="30-40歲，健身愛好者，注重健康的生活方式",
        motivations="尋求健康、天然且具有明確營養益處的產品",
        concerns="糖分含量，人工成分，卡路里計算，健康影響"
    )
    print(f"已創建自定義代理：{custom_agent.name}")
    print(f"人口統計：{custom_agent.demographics}")
    
    # 要使用自定義代理，您需要將其添加到create_persona_agents()中的persona_agents列表
    # 或修改函數以接受額外的代理作為參數
