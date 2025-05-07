const en = {
  donations: {
    title: 'Any donations will be highly appreciated! 😍',
    description: 'It helps me cover the costs for the software and the time I put into it, and it means I can keep working on making the font even better!',
  },
  afdian: 'Afdian (PayPal)',
  channel: {
    minimal: 'Minimal Options',
    github: 'Download From Github',
    custom: 'Custom Build',
  },
  choice: 'Recommend choice',
  buttons: [
    {
      name: 'Maple Mono',
      fileName: 'MapleMono-TTF.zip',
      description: 'For Editor Use',
    },
    {
      name: 'Maple Mono NF',
      fileName: 'MapleMono-NF-unhinted.zip',
      description: 'For Terminal Use, With Icons',
    },
    {
      name: 'Maple Mono NF CN',
      fileName: 'MapleMono-NF-CN-unhinted.zip',
      description: 'With Icons and CN & JP Glyphs',
    },
  ],
}

export default en

export type DownloadTranslation = typeof en
