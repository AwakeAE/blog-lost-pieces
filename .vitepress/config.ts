import { defineConfigWithTheme } from 'vitepress'
import mk from './theme/markdown-it-katex'
import { getPosts, generatePaginationPages } from './theme/server_utils'

export default async () => {
  const pageSize = 6
  await generatePaginationPages(pageSize)

  return defineConfigWithTheme<LoiaThemeConfig>({
    title: "Lost Pieces - Awake_AE's Blog",
    description: 'Just playing around.',
    markdown: {
      theme: { light: 'light-plus', dark: 'dark-plus' },
      config: (md) => {
        md.use(mk, {
          strict: (errorCode: string) => {
            if (errorCode == 'newLineInDisplayMode') {
              return 'ignore'
            } else {
              return 'warn'
            }
          }
        })
      }
    },
    lastUpdated: true,
    base: '/',
    head: [
      ['meta', { charset: 'utf-8' }],
      ['meta', { name: 'keywords', content: "Awake_AE's Blog" }],
      ['meta', { name: 'description', content: "Lost Pieces - Awake_AE's Blog" }],
      ['meta', { name: 'author', content: 'Awake_AE' }],
      ['meta', { name: 'robots', content: 'all' }],
      ['link', { rel: 'icon', href: '/L_32x32.ico' }]
    ],
    themeConfig: {
      posts: await getPosts(),
      pageSize: pageSize,
      website: 'https://github.com/AwakeAE/blog-lost-pieces-ae',
      logo: '/favicon.ico',

      nav: [
        { text: 'Home', link: '/' },
        { text: 'Archives', link: '/pages/archives' },
        { text: 'Tags', link: '/pages/tags' },
        { text: 'About', link: '/pages/about' },
        {
          text: 'External',
          items: [
            { text: 'Github', link: 'https://github.com/AwakeAE' },
            { text: 'Zhihu', link: 'https://www.zhihu.com/people/cheng-xia-yan-yu' }
          ]
        }
      ],

      socialLinks: [{ icon: 'github', link: 'https://github.com/AwakeAE/blog-lost-pieces-ae' }]
    },
    srcExclude: ['README.md']
  })
}
