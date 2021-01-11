// dotenv: https://qiita.com/xrxoxcxox/items/4e337b96fc9017b3771c
require( "dotenv" ).config()

module.exports = {
  siteMetadata: {
    title: `インターネット老人おぢさん　のむらやごろう`,
    description: `元CEOなのにフロントエンドを触らなさすぎて若手にバカにされないために頑張るおっさんの独学プログラミング奮闘記`,
    author: `@nomuraya`,
    siteUrl: `https://nomuraya-diary.netlify.app`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "gatsby-source-microcms", // FYI: https://qiita.com/akifumiyoshimu/items/ecb07219185c43cecfec
      options: {
        apiKey: process.env.GATSBY_API_KEY, // dotenv
        serviceId: process.env.GATSBY_SERVICE_ID, // dotenv
        apis: [ {
          endpoint: "main",
          query: {
            limit: 100,
          },
        } ],
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`, // FYI: https://qiita.com/atomyah/items/69028992eacf28d92957
      options: {
        siteUrl: `https://nomuraya-diary.netlify.app`,
        stripQueryString: true,
      },
    },
    `gatsby-plugin-sitemap`,  // FYI: https://qiita.com/atomyah/items/69028992eacf28d92957
    {
      resolve: 'gatsby-plugin-robots-txt', // FYI: https://qiita.com/atomyah/items/69028992eacf28d92957
      options: {
        host: 'https://nomuraya-diary.netlify.app',
        sitemap: 'https://nomuraya-diary.netlify.app/sitemap.xml',
        policy: [ { userAgent: '*', allow: '/' } ]
      }
    },
    `gatsby-plugin-offline`,  // https://webcraftlog.net/gatsby-seo-settings/
    {
      resolve: `gatsby-plugin-manifest`, // https://webcraftlog.net/gatsby-seo-settings/
      options: {
        name: "インターネット老人おじさん",
        short_name: "ネット老人おぢ",
        theme_color: "#2196f3",
        background_color: "#2196f3",
        start_url: "/",
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`,
        icons: [
          {
            src: `icons/icon-72x72.png`,
            sizes: `72x72`,
            type: `image/png`
          },
          {
            src: `icons/icon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`
          },
          {
            src: `icons/icon-128x128.png`,
            sizes: `128x128`,
            type: `image/png`
          },
          {
            src: `icons/icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`
          },
          {
            src: `icons/icon-152x152.png`,
            sizes: `152x152`,
            type: `image/png`
          },
          {
            src: `icons/icon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`
          },
          {
            src: `icons/icon-384x384.png`,
            sizes: `384x384`,
            type: `image/png`
          },
          {
            src: `icons/icon-512x512.png`,
            sizes: `512x512`,
            type: `image/png`
          },
        ]
      },
    },
    {
      resolve: 'gatsby-plugin-next-seo',
      options: {
        openGraph: {
          type: 'website',
          locale: 'ja_JP',
          url: 'https://nomuraya-diary.netlify.app',
          site_name: 'SiteName',
        },
        twitter: {
          handle: '@elder_uncle',
          site: '@elder_uncle',
          cardType: 'summary_large_image',
        },
      },
    },
  ],
}
