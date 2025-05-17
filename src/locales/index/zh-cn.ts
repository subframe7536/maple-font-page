import type { IndexTranslation } from './en'

const zh: IndexTranslation = {
  hero: {
    slogan: 'Smooth your coding flow',
    description: '我们用代码将创意构筑成产品，而字体如同旅途中沉默的基石，熟视无睹，却塑造着每天编码的体验。Maple Mono 专为极客匠心打造，它以一种内敛的优雅，提升您的工作效率，让您在阅读和编写每一行代码时都能感受到丝滑和愉悦。',
    learnMoreText: '了解更多',
    tryItText: '去试一试',
  },
  why: {
    title: '为什么再做一个字体？',
  },
  features: {
    title: '特性',
    variable: {
      title: '一款字体，无限字重',
      description: '可变字体支持，随心所欲获取想要的字重。',
    },
    design: {
      title: '独特字形，流畅设计',
      description: '圆角设计，全新的字形设计，手写体风格的斜体样式。',
      items: {
        cv01: {
          name: 'cv01',
          desc: '带有小间隙的全新字形，如果不喜欢可以禁用。',
        },
        plain: {
          name: '常规样式',
          desc: '手写体风格的斜体样式，允许精细的自定义。',
        },
        cv04: {
          name: 'cv04',
          desc: '为容易混淆的字符设计了独特的形状。',
        },
        zero: {
          name: 'zero',
          desc: '默认使用斜线风格的零，而不是点状风格。',
        },
      },
    },
    ligature: {
      title: '智能连字，数量丰富',
      description: '大量智能连字，纯文本标签，连接字母，将字体能力提升到新的水平。',
      subTitle: '特殊连字',
      items: {
        tag: '从纯文本创建标签，可用于日志显示和任务提醒。',
        conn: '斜体风格中的笔画连接，让你的代码更生动。',
        gts: '为泛型（或模板）和位运算提供智能间距。',
      },
    },
    icon: {
      title: '精美图标，拥抱现代',
      description: '一流的 Nerd-Font 支持，用图标装饰你的现代化终端。',
      ref: {
        artBy: '生成',
        theme: '主题',
        prompt: '提示符',
      },
    },
    custom: {
      title: '你的喜好，你的字体',
      description: '随心配置或强制开关 OpenType 功能，创建你完美的字体。',
      buttonText: '查看指南',
      link: 'https://github.com/subframe7536/maple-font/blob/variable/README_CN.md#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%9E%84%E5%BB%BA',
      normal: {
        title: '😡：“为什么有些字符看起来这么奇怪？？？”',
        description: '🤗：“这我懂，所以我专门制作了 @: 一个重置所有奇怪字符的预设, 让整体风格和 JetBrains Mono 类似（除了 0 的中间保留为斜线）。直接下载，无需构建。”',
        enable: '启用的字体特性',
        preview: '预览',
        testInPlayground: '在 特性测试页面 尝试',
      },
    },
  },
  comparison: {
    title: '对比',
    subTitle: '了解 Maple Mono 与其他流行的编程字体的对比。',
  },
  preview: {
    title: '预览',
    subTitle: '看看字体在真实的代码片段中的效果。',
  },
  testimonial: {
    title: '用户评价',
    subTitle: '加入成千上万喜爱上 Maple Mono 的开发者行列。',
    items: [
      {
        content: '需要一款带点个性的🌟和优秀的斜体的字体。@subframe7536 的 Maple Mono NF 是我的新宠编程字体。正是我在厌倦 JetBrains Mono 后一直在寻找的字体。它从 JBM 和其他优秀的字体中汲取了灵感。',
        author: 'Siddharth Pant',
        platform: 'Twitter',
      },
      {
        content: '使用 Maple Mono 已经一个月了。Nerd Font 支持非常棒，并且能够自定义字体功能正是我所需要的。干得漂亮！',
        author: 'TechEnthusiast',
        platform: 'Discord',
      },
      {
        content: '换了 Maple Mono 字体，部分内容开了斜体连笔，感觉在清晰好用的基础上又多了几分灵动😄不错',
        author: 'Nero',
        platform: 'Twitter',
      },
      {
        content: '对于希望字体圆一些、“可爱”一些的人，Maple Mono 可能是一个很好的选择。它封装了 CJK 字体，且保证 2:1 的宽度。前后大概有两三个同事夸过我编辑器和终端配得很好看。',
        author: '北雁云依',
        platform: '知乎',
      },
      {
        content: '我喜欢 Maple Mono，因为它非常像我的笔迹。我写字时混合了印刷体和手写体，所以感觉就像在看我的笔迹。而且用手写体的风格而不是更单调的印刷体来查看代码也让人非常愉悦。',
        author: 'ez_roma',
        platform: 'Reddit',
      },
    ],
  },
  credits: {
    title: '鸣谢',
    subTitle: 'Maple Mono 站在巨人的肩膀上。',
    items: {
      base: '基础字体',
      icon: '图标集成',
      cn: '中文汉字移植',
      inspiration: '字形灵感',
      font: '字体构建工具',
      web: '网站工具',
    },
  },
}

export default zh
