// 国际化系统核心文件
export type Language = "zh" | "en"

export interface Translations {
  // 导航栏
  nav: {
    home: string
    profile: string
    recommendations: string
    essays: string
    applications: string
    features: string
    login: string
    register: string
    freeRegister: string
    successStories: string
    community: string
    help: string
  }
  auth: {
    welcome: string
    signIn: string
    signUp: string
    email: string
    password: string
    name: string
    confirmPassword: string
    emailPlaceholder: string
    passwordPlaceholder: string
    namePlaceholder: string
    confirmPasswordPlaceholder: string
    emailRequired: string
    emailInvalid: string
    passwordRequired: string
    passwordTooShort: string
    nameRequired: string
    passwordMismatch: string
    signInFailed: string
    signUpFailed: string
    signingIn: string
    signingUp: string
  }
  // 主页
  home: {
    title: string
    subtitle: string
    description: string
    getStarted: string
    learnMore: string
    features: {
      smartMatch: string
      smartMatchDesc: string
      aiEssay: string
      aiEssayDesc: string
      oneStop: string
      oneStopDesc: string
      expertGuidance: string
      expertGuidanceDesc: string
      whyChooseUs: string
      whyChooseUsDesc: string
      exploreServices: string
    }
    stats: {
      successfulApplications: string
      partnerUniversities: string
      averageScore: string
      satisfactionRate: string
      title: string
      description: string
    }
  }
  // 个人中心页面翻译
  profile: {
    title: string
    description: string
    tabs: {
      basic: string
      academic: string
      progress: string
      documents: string
    }
    basic: {
      title: string
      description: string
      name: string
      email: string
      phone: string
      gender: string
      birthDate: string
      nationality: string
      currentLocation: string
      targetCountries: string
      bio: string
      changeAvatar: string
      save: string
      placeholders: {
        name: string
        email: string
        phone: string
        gender: string
        location: string
        countries: string
        bio: string
      }
      genderOptions: {
        male: string
        female: string
        other: string
      }
      nationalityOptions: {
        china: string
        usa: string
        canada: string
        other: string
      }
    }
    academic: {
      title: string
      description: string
      currentEducation: string
      school: string
      major: string
      gpa: string
      gpaScale: string
      graduationDate: string
      targetDegree: string
      targetMajor: string
      languageTests: string
      addScore: string
      testType: string
      score: string
      testDate: string
      save: string
      placeholders: {
        school: string
        major: string
        gpa: string
        targetMajor: string
        score: string
      }
      educationLevels: {
        highSchool: string
        bachelor: string
        master: string
        phd: string
      }
      testTypes: {
        toefl: string
        ielts: string
        gre: string
        gmat: string
        sat: string
      }
    }
  }
  // 学校推荐页面翻译
  recommendations: {
    title: string
    description: string
    profile: {
      title: string
      description: string
      major: string
      targetDegree: string
      usa: string
      uk: string
      majorLabel: string
      degreeLabel: string
      countryLabel: string
    }
    generating: string
    regenerate: string
    updateProfile: string
    searchPlaceholder: string
    sortByMatch: string
    sortByRanking: string
    sortByAdmission: string
    sortByTuition: string
    filter: string
    foundSchools: string
    reachSchools: string
    matchSchools: string
    safetySchools: string
    loadMore: string
    schools: {
      stanford: {
        name: string
        location: string
        program: string
        highlights: string[]
      }
      mit: {
        name: string
        location: string
        program: string
        highlights: string[]
      }
      cmu: {
        name: string
        location: string
        program: string
        highlights: string[]
      }
      berkeley: {
        name: string
        location: string
        program: string
        highlights: string[]
      }
      imperial: {
        name: string
        location: string
        program: string
        highlights: string[]
      }
    }
  }
  // 文书助手页面翻译
  essays: {
    title: string
    description: string
    tabs: {
      generator: string
      editor: string
      templates: string
      library: string
    }
    editor: {
      title: string
      description: string
      undo: string
      preview: string
      save: string
      export: string
      share: string
      wordCount: string
      analysis: {
        title: string
        description: string
        readability: string
        sentiment: string
        keywords: string
        structure: string
      }
      feedback: {
        title: string
        description: string
        getMore: string
      }
      quickActions: {
        title: string
        grammar: string
        structure: string
        expression: string
        length: string
      }
    }
  }
  // 申请管理页面翻译
  applications: {
    title: string
    description: string
    tabs: {
      overview: string
      applications: string
      calendar: string
      analytics: string
    }
  }
  // 功能页面翻译
  features: {
    title: string
    description: string
  }
  // AI助手翻译
  aiAssistant: {
    title: string
    subtitle: string
    placeholder: string
    greeting: string
  }
  // 通用
  common: {
    save: string
    cancel: string
    confirm: string
    delete: string
    edit: string
    loading: string
    success: string
    error: string
    next: string
    previous: string
    submit: string
    required: string
    optional: string
    select: string
    add: string
    remove: string
  }
}

export const translations: Record<Language, Translations> = {
  zh: {
    nav: {
      home: "首页",
      profile: "个人中心",
      recommendations: "学校推荐",
      essays: "文书助手",
      applications: "申请管理",
      features: "新功能",
      login: "登录",
      register: "注册",
      freeRegister: "免费注册",
      successStories: "成功案例",
      community: "学长社区",
      help: "帮助中心",
    },
    auth: {
      welcome: "欢迎来到 ioffer",
      signIn: "登录",
      signUp: "注册",
      email: "邮箱地址",
      password: "密码",
      name: "姓名",
      confirmPassword: "确认密码",
      emailPlaceholder: "请输入邮箱地址",
      passwordPlaceholder: "请输入密码",
      namePlaceholder: "请输入姓名",
      confirmPasswordPlaceholder: "请再次输入密码",
      emailRequired: "请输入邮箱地址",
      emailInvalid: "请输入有效的邮箱地址",
      passwordRequired: "请输入密码",
      passwordTooShort: "密码至少需要6位字符",
      nameRequired: "请输入姓名",
      passwordMismatch: "两次输入的密码不一致",
      signInFailed: "登录失败",
      signUpFailed: "注册失败",
      signingIn: "登录中...",
      signingUp: "注册中...",
    },
    home: {
      title: "你的留学梦想，我们来实现",
      subtitle: "智能匹配 • AI文书 • 一站式服务",
      description: "基于大数据和AI技术，为中国留学生提供个性化的海外申请解决方案",
      getStarted: "开始免费评估",
      learnMore: "了解更多",
      features: {
        smartMatch: "🎯 智能匹配",
        smartMatchDesc: "基于你的背景和目标，智能推荐最适合的学校和专业",
        aiEssay: "✍️ AI文书助手",
        aiEssayDesc: "AI辅助创作个性化文书，提升申请竞争力",
        oneStop: "🚀 一站式服务",
        oneStopDesc: "从选校到提交，全程跟踪申请进度",
        expertGuidance: "👨‍🎓 专家指导",
        expertGuidanceDesc: "资深留学顾问提供专业建议和支持",
        whyChooseUs: "为什么选择我们",
        whyChooseUsDesc: "专业的留学申请平台，为全球学生提供个性化的申请解决方案和专业指导",
        exploreServices: "探索我们的服务",
      },
      stats: {
        title: "数据说话，实力见证",
        description: "多年来我们专注于为中国留学生提供最优质的申请服务，用数据证明我们的专业实力",
        successfulApplications: "成功申请学生",
        partnerUniversities: "合作院校",
        averageScore: "申请成功率",
        satisfactionRate: "专业顾问",
      },
    },
    profile: {
      title: "个人中心",
      description: "完善您的个人信息，获得更精准的学校推荐和申请建议",
      tabs: {
        basic: "基本信息",
        academic: "学术背景",
        progress: "申请进度",
        documents: "文档管理",
      },
      basic: {
        title: "基本信息",
        description: "请填写您的基本个人信息",
        name: "姓名",
        email: "邮箱",
        phone: "手机号码",
        gender: "性别",
        birthDate: "出生日期",
        nationality: "国籍",
        currentLocation: "当前所在地",
        targetCountries: "目标留学国家",
        bio: "个人简介",
        changeAvatar: "更换头像",
        save: "保存基本信息",
        placeholders: {
          name: "请输入您的姓名",
          email: "your.email@example.com",
          phone: "+86 138 0000 0000",
          gender: "请选择性别",
          location: "如：北京市朝阳区",
          countries: "如：美国、英国、澳大利亚",
          bio: "简单介绍一下您的背景、兴趣和留学目标...",
        },
        genderOptions: {
          male: "男",
          female: "女",
          other: "其他",
        },
        nationalityOptions: {
          china: "中国",
          usa: "美国",
          canada: "加拿大",
          other: "其他",
        },
      },
      academic: {
        title: "学术背景",
        description: "请填写您的教育背景和学术信息",
        currentEducation: "当前学历",
        school: "学校名称",
        major: "专业",
        gpa: "GPA",
        gpaScale: "GPA满分",
        graduationDate: "毕业时间",
        targetDegree: "目标学位",
        targetMajor: "目标专业",
        languageTests: "语言考试成绩",
        addScore: "添加成绩",
        testType: "考试类型",
        score: "分数",
        testDate: "考试日期",
        save: "保存学术信息",
        placeholders: {
          school: "如：清华大学",
          major: "如：计算机科学与技术",
          gpa: "如：3.8",
          targetMajor: "如：计算机科学",
          score: "如：110",
        },
        educationLevels: {
          highSchool: "高中",
          bachelor: "本科",
          master: "硕士",
          phd: "博士",
        },
        testTypes: {
          toefl: "TOEFL",
          ielts: "IELTS",
          gre: "GRE",
          gmat: "GMAT",
          sat: "SAT",
        },
      },
    },
    recommendations: {
      title: "智能学校推荐",
      description: "基于您的学术背景和申请目标，我们为您推荐最适合的学校和专业",
      profile: {
        title: "您的申请档案",
        description: "基于以下信息为您生成个性化推荐",
        major: "计算机科学",
        targetDegree: "硕士",
        usa: "美国",
        uk: "英国",
        majorLabel: "专业背景",
        degreeLabel: "目标学位",
        countryLabel: "目标国家",
      },
      generating: "重新生成推荐",
      regenerate: "重新生成推荐",
      updateProfile: "更新档案信息",
      searchPlaceholder: "搜索学校、专业或地区...",
      sortByMatch: "匹配度排序",
      sortByRanking: "排名排序",
      sortByAdmission: "录取率排序",
      sortByTuition: "学费排序",
      filter: "筛选",
      foundSchools: "为您找到 {count} 所推荐学校",
      reachSchools: "冲刺院校: 2所",
      matchSchools: "匹配院校: 2所",
      safetySchools: "保底院校: 1所",
      loadMore: "加载更多",
      schools: {
        stanford: {
          name: "斯坦福大学",
          location: "加利福尼亚州，帕洛阿尔托",
          program: "计算机科学硕士",
          highlights: ["顶尖CS项目", "硅谷地理优势", "创业氛围浓厚", "师资力量雄厚"],
        },
        mit: {
          name: "麻省理工学院",
          location: "马萨诸塞州，剑桥",
          program: "计算机科学与工程硕士",
          highlights: ["世界顶级理工院校", "前沿科研项目", "校友网络强大", "就业前景优秀"],
        },
        cmu: {
          name: "卡内基梅隆大学",
          location: "宾夕法尼亚州，匹兹堡",
          program: "计算机科学硕士",
          highlights: ["CS专业全美第一", "人工智能领域领先", "产学研结合紧密", "实习机会丰富"],
        },
        berkeley: {
          name: "加州大学伯克利分校",
          location: "加利福尼亚州，伯克利",
          program: "电气工程与计算机科学硕士",
          highlights: ["公立大学翘楚", "学术声誉卓著", "多元化校园文化", "性价比高"],
        },
        imperial: {
          name: "帝国理工学院",
          location: "英国，伦敦",
          program: "计算机科学硕士",
          highlights: ["英国顶尖理工院校", "伦敦地理优势", "一年制硕士项目", "就业率高"],
        },
      },
    },
    essays: {
      title: "AI文书助手",
      description: "利用人工智能技术，帮助您创作出色的申请文书，提升申请竞争力",
      tabs: {
        generator: "智能生成",
        editor: "文书编辑",
        templates: "模板库",
        library: "我的文书",
      },
      editor: {
        title: "文书编辑器",
        description: "在这里编辑和完善您的申请文书",
        undo: "撤销",
        preview: "预览",
        save: "保存",
        export: "导出PDF",
        share: "分享",
        wordCount: "字符数",
        analysis: {
          title: "实时分析",
          description: "文书质量评估和改进建议",
          readability: "可读性",
          sentiment: "情感表达",
          keywords: "关键词密度",
          structure: "结构完整性",
        },
        feedback: {
          title: "AI反馈建议",
          description: "基于文书内容的智能分析和建议",
          getMore: "获取更多建议",
        },
        quickActions: {
          title: "快速操作",
          grammar: "检查语法和拼写",
          structure: "优化句式结构",
          expression: "增强表达力度",
          length: "调整文书长度",
        },
      },
    },
    applications: {
      title: "申请管理",
      description: "统一管理您的所有留学申请，跟踪进度，确保不错过任何重要截止日期",
      tabs: {
        overview: "概览",
        applications: "申请清单",
        calendar: "时间规划",
        analytics: "数据分析",
      },
    },
    features: {
      title: "新功能预告",
      description: "这些新功能会让我们的平台更棒！",
    },
    aiAssistant: {
      title: "ioffer智能助手",
      subtitle: "在线为你服务",
      placeholder: "输入你的问题...",
      greeting: "你好！我是ioffer智能留学助手，有什么可以帮助你的吗？",
    },
    common: {
      save: "保存",
      cancel: "取消",
      confirm: "确认",
      delete: "删除",
      edit: "编辑",
      loading: "加载中...",
      success: "成功",
      error: "错误",
      next: "下一步",
      previous: "上一步",
      submit: "提交",
      required: "必填",
      optional: "可选",
      select: "请选择",
      add: "添加",
      remove: "移除",
    },
  },
  en: {
    nav: {
      home: "Home",
      profile: "Profile",
      recommendations: "Recommendations",
      essays: "Essays",
      applications: "Applications",
      features: "Features",
      login: "Login",
      register: "Register",
      freeRegister: "Free Register",
      successStories: "Success Stories",
      community: "Community",
      help: "Help Center",
    },
    auth: {
      welcome: "Welcome to ioffer",
      signIn: "Sign In",
      signUp: "Sign Up",
      email: "Email Address",
      password: "Password",
      name: "Full Name",
      confirmPassword: "Confirm Password",
      emailPlaceholder: "Enter your email address",
      passwordPlaceholder: "Enter your password",
      namePlaceholder: "Enter your full name",
      confirmPasswordPlaceholder: "Confirm your password",
      emailRequired: "Email address is required",
      emailInvalid: "Please enter a valid email address",
      passwordRequired: "Password is required",
      passwordTooShort: "Password must be at least 6 characters",
      nameRequired: "Full name is required",
      passwordMismatch: "Passwords do not match",
      signInFailed: "Sign in failed",
      signUpFailed: "Sign up failed",
      signingIn: "Signing in...",
      signingUp: "Signing up...",
    },
    home: {
      title: "Your Study Abroad Dreams, We Make Them Real",
      subtitle: "Smart Matching • AI Essays • One-Stop Service",
      description:
        "Personalized overseas application solutions for students worldwide based on big data and AI technology",
      getStarted: "Start Free Assessment",
      learnMore: "Learn More",
      features: {
        smartMatch: "🎯 Smart Matching",
        smartMatchDesc:
          "Intelligently recommend the most suitable schools and programs based on your background and goals",
        aiEssay: "✍️ AI Essay Assistant",
        aiEssayDesc: "AI-assisted personalized essay creation to enhance application competitiveness",
        oneStop: "🚀 One-Stop Service",
        oneStopDesc: "Full application progress tracking from school selection to submission",
        expertGuidance: "👨‍🎓 Expert Guidance",
        expertGuidanceDesc: "Professional advice and support from experienced study abroad consultants",
        whyChooseUs: "Why Choose Us",
        whyChooseUsDesc:
          "Professional study abroad platform providing personalized application solutions and expert guidance for students worldwide",
        exploreServices: "Explore Our Services",
      },
      stats: {
        title: "Numbers Speak, Strength Witnesses",
        description:
          "For years, we have focused on providing the highest quality application services for Chinese students, proving our professional strength with data",
        successfulApplications: "Successful Students",
        partnerUniversities: "Partner Universities",
        averageScore: "Success Rate",
        satisfactionRate: "Professional Advisors",
      },
    },
    profile: {
      title: "Profile Center",
      description:
        "Complete your personal information to get more accurate school recommendations and application advice",
      tabs: {
        basic: "Basic Info",
        academic: "Academic Background",
        progress: "Application Progress",
        documents: "Document Management",
      },
      basic: {
        title: "Basic Information",
        description: "Please fill in your basic personal information",
        name: "Name",
        email: "Email",
        phone: "Phone Number",
        gender: "Gender",
        birthDate: "Date of Birth",
        nationality: "Nationality",
        currentLocation: "Current Location",
        targetCountries: "Target Countries",
        bio: "Bio",
        changeAvatar: "Change Avatar",
        save: "Save Basic Info",
        placeholders: {
          name: "Please enter your name",
          email: "your.email@example.com",
          phone: "+1 555 0000 000",
          gender: "Please select gender",
          location: "e.g., Beijing, Chaoyang District",
          countries: "e.g., USA, UK, Australia",
          bio: "Briefly introduce your background, interests and study abroad goals...",
        },
        genderOptions: {
          male: "Male",
          female: "Female",
          other: "Other",
        },
        nationalityOptions: {
          china: "China",
          usa: "United States",
          canada: "Canada",
          other: "Other",
        },
      },
      academic: {
        title: "Academic Background",
        description: "Please fill in your educational background and academic information",
        currentEducation: "Current Education",
        school: "School Name",
        major: "Major",
        gpa: "GPA",
        gpaScale: "GPA Scale",
        graduationDate: "Graduation Date",
        targetDegree: "Target Degree",
        targetMajor: "Target Major",
        languageTests: "Language Test Scores",
        addScore: "Add Score",
        testType: "Test Type",
        score: "Score",
        testDate: "Test Date",
        save: "Save Academic Info",
        placeholders: {
          school: "e.g., Tsinghua University",
          major: "e.g., Computer Science and Technology",
          gpa: "e.g., 3.8",
          targetMajor: "e.g., Computer Science",
          score: "e.g., 110",
        },
        educationLevels: {
          highSchool: "High School",
          bachelor: "Bachelor",
          master: "Master",
          phd: "PhD",
        },
        testTypes: {
          toefl: "TOEFL",
          ielts: "IELTS",
          gre: "GRE",
          gmat: "GMAT",
          sat: "SAT",
        },
      },
    },
    recommendations: {
      title: "Smart School Recommendations",
      description:
        "Based on your academic background and application goals, we recommend the most suitable schools and programs for you",
      profile: {
        title: "Your Application Profile",
        description: "Personalized recommendations based on the following information",
        major: "Computer Science",
        targetDegree: "Master's",
        usa: "United States",
        uk: "United Kingdom",
        majorLabel: "Major Background",
        degreeLabel: "Target Degree",
        countryLabel: "Target Countries",
      },
      generating: "Generating Recommendations",
      regenerate: "Regenerate Recommendations",
      updateProfile: "Update Profile",
      searchPlaceholder: "Search schools, majors, or regions...",
      sortByMatch: "Sort by Match",
      sortByRanking: "Sort by Ranking",
      sortByAdmission: "Sort by Admission Rate",
      sortByTuition: "Sort by Tuition",
      filter: "Filter",
      foundSchools: "Found {count} recommended schools for you",
      reachSchools: "Reach Schools: 2",
      matchSchools: "Match Schools: 2",
      safetySchools: "Safety Schools: 1",
      loadMore: "Load More",
      schools: {
        stanford: {
          name: "Stanford University",
          location: "California, Palo Alto",
          program: "Master of Science in Computer Science",
          highlights: ["Top CS Program", "Silicon Valley Advantage", "Entrepreneurial Culture", "World-class Faculty"],
        },
        mit: {
          name: "Massachusetts Institute of Technology",
          location: "Massachusetts, Cambridge",
          program: "Master of Engineering in Computer Science",
          highlights: [
            "World's Top Tech School",
            "Cutting-edge Research",
            "Strong Alumni Network",
            "Excellent Career Prospects",
          ],
        },
        cmu: {
          name: "Carnegie Mellon University",
          location: "Pennsylvania, Pittsburgh",
          program: "Master of Science in Computer Science",
          highlights: [
            "#1 CS Program in US",
            "AI Research Leader",
            "Industry Partnerships",
            "Rich Internship Opportunities",
          ],
        },
        berkeley: {
          name: "UC Berkeley",
          location: "California, Berkeley",
          program: "Master of Engineering in EECS",
          highlights: ["Top Public University", "Academic Excellence", "Diverse Campus Culture", "Great Value"],
        },
        imperial: {
          name: "Imperial College London",
          location: "United Kingdom, London",
          program: "Master of Science in Computing",
          highlights: ["UK's Top Tech School", "London Location", "One-year Program", "High Employment Rate"],
        },
      },
    },
    essays: {
      title: "AI Essay Assistant",
      description:
        "Use artificial intelligence technology to help you create excellent application essays and improve application success rate",
      tabs: {
        generator: "Smart Generator",
        editor: "Essay Editor",
        templates: "Templates",
        library: "My Essays",
      },
      editor: {
        title: "Essay Editor",
        description: "Edit and refine your application essays here",
        undo: "Undo",
        preview: "Preview",
        save: "Save",
        export: "Export PDF",
        share: "Share",
        wordCount: "Character Count",
        analysis: {
          title: "Real-time Analysis",
          description: "Essay quality assessment and improvement suggestions",
          readability: "Readability",
          sentiment: "Sentiment",
          keywords: "Keyword Density",
          structure: "Structure Integrity",
        },
        feedback: {
          title: "AI Feedback",
          description: "Intelligent analysis and suggestions based on essay content",
          getMore: "Get More Suggestions",
        },
        quickActions: {
          title: "Quick Actions",
          grammar: "Check Grammar and Spelling",
          structure: "Optimize Sentence Structure",
          expression: "Enhance Expression",
          length: "Adjust Essay Length",
        },
      },
    },
    applications: {
      title: "Application Management",
      description:
        "Manage all your study abroad applications, track progress, and ensure you don't miss any important deadlines",
      tabs: {
        overview: "Overview",
        applications: "Application List",
        calendar: "Timeline",
        analytics: "Analytics",
      },
    },
    features: {
      title: "Upcoming Features",
      description: "These new features will make our platform even better!",
    },
    aiAssistant: {
      title: "ioffer Smart Assistant",
      subtitle: "Online to serve you",
      placeholder: "Enter your question...",
      greeting: "Hello! I'm ioffer's smart study abroad assistant. How can I help you?",
    },
    common: {
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      delete: "Delete",
      edit: "Edit",
      loading: "Loading...",
      success: "Success",
      error: "Error",
      next: "Next",
      previous: "Previous",
      submit: "Submit",
      required: "Required",
      optional: "Optional",
      select: "Please select",
      add: "Add",
      remove: "Remove",
    },
  },
}

export function getTranslation(language: Language, key: string): any {
  const keys = key.split(".")
  let value: any = translations[language]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
