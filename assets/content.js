window.caseStudyContent = {
  meta: {
    title: "周度运营分析看板案例",
    subtitle: "Anonymous Weekly Dashboard Case",
    description: "一个匿名化的周度运营分析案例站，展示多维筛选、周度趋势、模块化看板结构与视频演示位。",
    repoName: "ops-dashboard-case-study",
    lastUpdated: "2026-03-30",
    demoVideo: {
      url: "assets/videos/weekly-ops-demo.mp4",
      caption: "周度自动化看板演示视频"
    }
  },

  hero: {
    eyebrow: "Weekly Ops Dashboard",
    title: "把周度经营观察压缩成一个可公开展示的案例站",
    summary: "这个页面展示的是一套匿名化后的周度运营分析看板：保留多维筛选、周度走势和模块化分析结构，同时去掉所有真实业务标识与内部实现细节。",
    tags: [
      "静态部署",
      "周度分析",
      "匿名化表达",
      "模块化可视化",
      "GitHub Pages"
    ]
  },

  background: [
    {
      title: "从内部看板转为公开案例",
      text: "原始素材来自一份周度仪表盘导出结果。公开版不直接暴露原文件，而是提炼出结构、节奏和展示重点，重新组织成一页读完的案例叙事。"
    },
    {
      title: "保留分析逻辑，移除实现细节",
      text: "页面只保留业务维度、场景维度、指标切换和周度趋势这些核心观察方式；所有真实品牌、字段、查询逻辑和账号线索都被去除。"
    },
    {
      title: "用示意数据表达真实能力",
      text: "图表全部由本地脚本生成，重点呈现趋势、对比、变化率和活跃度等观察关系，而不是对外发布真实经营数据。"
    }
  ],

  capabilities: [
    {
      title: "三层筛选联动",
      text: "业务维度、场景维度、指标焦点三组控件同步工作，模拟真实看板的阅读路径。"
    },
    {
      title: "周度节奏清晰",
      text: "所有图形都围绕固定周序列展开，让规模变化、波动区间和结构调整一眼可读。"
    },
    {
      title: "模块化信息架构",
      text: "从总体概览到细项拆解，再到数据流和演示位，整页结构足够清晰，适合公开展示。"
    },
    {
      title: "后续可直接扩展",
      text: "内容、标签、图表数据和视频入口都集中在一个配置文件里，后续替换成本很低。"
    }
  ],

  modules: [
    {
      id: "overview",
      title: "总体概览",
      subtitle: "当前筛选下的周度快照与焦点指标切换",
      description: "先看当前切片里最重要的信号，再决定是否进入规模、结构或波动层做细看。"
    },
    {
      id: "amount",
      title: "交易规模",
      subtitle: "总量走势与对照趋势",
      description: "适合快速观察周度规模变化、阶段性抬升和近期波动是否偏离常态。"
    },
    {
      id: "count",
      title: "交易笔数",
      subtitle: "数量变化与节奏对比",
      description: "用于识别规模增长究竟来自频次变化，还是结构与效率的共同抬升。"
    },
    {
      id: "fee",
      title: "手续费",
      subtitle: "收益指标与稳定性观察",
      description: "把收益线单独拆出，便于判断阶段内的质量变化是否与总量变化同向。"
    },
    {
      id: "growth",
      title: "环比变化",
      subtitle: "正负波动与异常周定位",
      description: "用正负条形观察增长斜率，帮助快速判断哪几周值得进一步复盘。"
    },
    {
      id: "active",
      title: "活跃主体",
      subtitle: "参与深度与覆盖范围",
      description: "关注有多少主体持续参与，补充总量之外的活跃度和韧性信息。"
    }
  ],

  systemFlow: [
    {
      title: "采集层",
      text: "汇聚多个来源的周度经营数据，先对时间粒度与口径进行统一。"
    },
    {
      title: "整理层",
      text: "将业务维度、场景维度和指标定义映射到统一语义层，方便筛选与聚合。"
    },
    {
      title: "度量层",
      text: "围绕规模、笔数、手续费、变化率和活跃度建立一组稳定的周度指标。"
    },
    {
      title: "看板层",
      text: "按照总览优先、细项跟进的顺序组织模块，让阅读成本尽量低。"
    },
    {
      title: "复盘层",
      text: "把异常周、结构变化和后续演示统一沉淀到页面底部，便于持续补充。"
    }
  ],

  outcomes: [
    {
      title: "单页完成理解",
      value: "7 Sections",
      text: "不跳页也能完整读懂背景、逻辑、图表、结构和演示入口。"
    },
    {
      title: "看板模块覆盖",
      value: "6 Modules",
      text: "保留总览、规模、笔数、手续费、变化率、活跃度六种观察面。"
    },
    {
      title: "内容集中配置",
      value: "1 Config",
      text: "站点文案、图形语义、流程节点和视频地址都收敛在一个内容文件里。"
    },
    {
      title: "部署方式简洁",
      value: "0 Build",
      text: "不依赖框架和打包流程，静态资源即可直接部署到 GitHub Pages。"
    }
  ],

  filters: {
    dimensions: [
      { id: "all", label: "全部业务" },
      { id: "omni", label: "综合零售" },
      { id: "content", label: "内容消费" },
      { id: "membership", label: "会员服务" },
      { id: "service", label: "本地服务" }
    ],
    scenes: [
      { id: "all", label: "全部场景" },
      { id: "store", label: "线下门店" },
      { id: "online", label: "线上转化" },
      { id: "renewal", label: "会员续费" },
      { id: "campaign", label: "联合活动" }
    ],
    kpis: [
      { id: "amount", label: "交易规模" },
      { id: "count", label: "交易笔数" },
      { id: "fee", label: "手续费" },
      { id: "growth", label: "环比变化" },
      { id: "active", label: "活跃主体" }
    ]
  },

  model: {
    weeks: [
      "2026 W03",
      "2026 W04",
      "2026 W05",
      "2026 W06",
      "2026 W07",
      "2026 W08",
      "2026 W09",
      "2026 W10",
      "2026 W11",
      "2026 W12",
      "2026 W13",
      "2026 W14"
    ],
    seasonal: [0.2, 0.8, -0.3, 1.4, -0.6, 0.5, 1.1, -0.4, 0.7, -0.2, 1.0, 0.4],
    pulse: [0.0, 0.2, 0.5, -0.3, 0.1, 0.6, -0.2, 0.4, -0.1, 0.3, 0.5, -0.2],
    dimensionProfiles: [
      {
        id: "omni",
        amountBase: 6.8,
        amountStep: 0.24,
        countBase: 44,
        countStep: 1.3,
        activeBase: 154,
        activeStep: 2.0,
        feeRate: 0.031,
        volatility: 1.1
      },
      {
        id: "content",
        amountBase: 5.1,
        amountStep: 0.18,
        countBase: 36,
        countStep: 1.0,
        activeBase: 126,
        activeStep: 1.7,
        feeRate: 0.028,
        volatility: 0.9
      },
      {
        id: "membership",
        amountBase: 4.2,
        amountStep: 0.16,
        countBase: 31,
        countStep: 0.9,
        activeBase: 118,
        activeStep: 1.4,
        feeRate: 0.034,
        volatility: 0.8
      },
      {
        id: "service",
        amountBase: 7.3,
        amountStep: 0.22,
        countBase: 48,
        countStep: 1.5,
        activeBase: 173,
        activeStep: 2.1,
        feeRate: 0.026,
        volatility: 1.2
      }
    ],
    sceneProfiles: [
      {
        id: "store",
        amountFactor: 0.43,
        countFactor: 0.45,
        activeFactor: 0.34,
        amountTrend: 0.03,
        countTrend: 0.4,
        activeTrend: 0.5,
        feeDelta: 0.002,
        momentum: 0.9,
        wave: [0.3, 0.1, -0.4, 0.2, -0.1, 0.3]
      },
      {
        id: "online",
        amountFactor: 0.27,
        countFactor: 0.24,
        activeFactor: 0.23,
        amountTrend: 0.05,
        countTrend: 0.3,
        activeTrend: 0.4,
        feeDelta: 0.001,
        momentum: 0.7,
        wave: [0.1, 0.2, 0.4, -0.2, 0.3, 0.0]
      },
      {
        id: "renewal",
        amountFactor: 0.18,
        countFactor: 0.17,
        activeFactor: 0.19,
        amountTrend: 0.02,
        countTrend: 0.2,
        activeTrend: 0.3,
        feeDelta: 0.003,
        momentum: 0.5,
        wave: [0.0, -0.1, 0.2, 0.3, -0.2, 0.1]
      },
      {
        id: "campaign",
        amountFactor: 0.12,
        countFactor: 0.14,
        activeFactor: 0.16,
        amountTrend: 0.04,
        countTrend: 0.3,
        activeTrend: 0.4,
        feeDelta: 0.004,
        momentum: 1.1,
        wave: [0.5, -0.2, 0.3, 0.6, -0.4, 0.2]
      }
    ]
  }
};

