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