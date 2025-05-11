const en = {
  hero: {
    slogan: 'Smooth your coding flow',
    description: 'We use code to bring ideas to life as products, but the font we choose is the silent architect that shapes how we experience that journey. Crafted for programmers, Maple Mono boosts your productivity with a subtle elegance, making every line of code a joy and smooth to read and write.',
    learnMoreText: 'Learn More',
    tryItText: 'Try it now',
  },
  why: {
    title: 'Why Another One ?',
  },
  features: {
    title: 'Features',
    variable: {
      title: 'One Font, Infinity Weights',
      description: 'Variable font support, get whatever weight as you want.',
    },
    design: {
      title: 'Distinct Glyphs, Smooth Design',
      description: 'Round corner, brand-new glyph designs with cursive style in italic style.',
      items: {
        cv01: {
          name: 'cv01',
          desc: 'Brand new glyphs with small gaps, disable it if you don\'t like.',
        },
        plain: {
          name: 'plain style',
          desc: 'Cursive style of italic glyphs, allow fine-grain customization.',
        },
        cv04: {
          name: 'cv04',
          desc: 'Distinct shape for characters that are easy to confuse.',
        },
        zero: {
          name: 'zero',
          desc: 'Use slash style zero by default, instead of dot style.',
        },
      },
    },
    ligature: {
      title: 'Smart Ligatures, Large Amount',
      description: 'Plain text tags, connected letters, brings the font ability to next level.',
      items: {
        tag: 'Create tags from plain text, benifit for logs and tasks.',
        conn: 'Connected stroke in italic style, vivid your code.',
        gts: 'Smart spacing for generic(or template) and bitwise operations.',
      },
    },
    icon: {
      title: 'Beautiful Icons, Embrace Modern',
      description: 'First-Class Nerd-Font support, iconic your mordern terminal.',
      ref: {
        artBy: 'Art By',
        theme: 'Theme',
        prompt: 'Prompt',
      },
    },
    custom: {
      title: 'Your favor, Your Font',
      description: 'Configure or freeze OpenType features as you want, create your own perfect font.',
      buttonText: 'See Guide',
      link: 'https://github.com/subframe7536/maple-font#custom-build',
      normal: {
        title: '😡: "Why these glyphs are SOOOOO WEIRD ???"',
        description: '🤗: "Yeah I get that, so this one is for you: @, a preset that reset all strange glyphs, make the glyph style similar to JetBrains Mono (with slashed 0). Direct download, no build required.',
        enable: 'Enabled font features',
        preview: 'Preview',
        testInPlayground: 'Test In Playground Page',
      },
    },
  },
  comparison: {
    title: 'Comparison',
    subTitle: 'See how Maple Mono compares to other popular programming fonts.',
  },
  preview: {
    title: 'Preview',
    subTitle: 'See what the font looks like in real code snippets.',
  },
  testimonial: {
    title: 'What people says',
    subTitle: 'Join thousands of developers who have already fallen in love with Maple Mono.',
    items: [
      {
        content: 'Needed a font with some pazzazz🌟 and good italics. Maple Mono NF by @subframe7536 is my new favorite coding font. Just the font I was looking for after getting bored with JetBrains Mono. It takes inspiration from JBM and other great fonts',
        author: 'Siddharth Pant',
        platform: 'Twitter',
      },
      {
        content: 'Been using Maple Mono for a month now. The Nerd Font support is fantastic, and being able to customize font features is exactly what I needed. Great work!',
        author: 'TechEnthusiast',
        platform: 'Discord',
      },
      {
        content: 'Having switched to the Maple Mono font and enabled italic ligatures for some parts, it feels a bit more lively on top of being clear and easy to use, which is nice.',
        author: 'Nero',
        platform: 'Twitter',
      },
      {
        content: 'For those who prefer a rounder, more "adorable" font, Maple Mono might be a great choice. It includes CJK fonts and ensures a 2:1 width ratio. I\'ve had about two or three colleagues compliment me on how good my editor and terminal look.',
        author: 'Beiyanyunyi',
        platform: 'ZhiHu',
      },
      {
        content: 'I love Maple Mono because it is very similar to my handwriting. I write in a mixture of print and cursive so it feels like im looking at my handwriting. It also is very pleasing to look at the code with cursive flair instead of the more monotonous print.',
        author: 'ez_roma',
        platform: 'Reddit',
      },
    ],
  },
  credits: {
    title: 'Credits',
    subTitle: 'Maple Mono standing on the shoulders of giants.',
    items: {
      base: 'Base Font',
      icon: 'Icon Integration',
      cn: 'Port of CN glyphs',
      inspiration: 'Glyphs Inspiration',
      font: 'Font Builder',
      web: 'Website tool',
    },
  },
}

export default en

export type IndexTranslation = typeof en
