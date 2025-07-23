import {defineDocuments, defineLocations} from 'sanity/presentation'

export const locations = {
  home: defineLocations({
    locations: [
      {
        title: 'Home',
        href: '/',
      },
    ],
  }),
  page: defineLocations({
    select: {title: 'title', slug: 'slug.current'},
    resolve: (doc) => ({
      locations: [{title: doc?.title, href: `/${doc?.slug}`}],
    }),
  }),
}

export const mainDocuments = defineDocuments([
  {
    route: '/',
    filter: `_type == "home"`,
  },
  {
    route: '/page/:slug',
    filter: `_type == "page" && slug.current == $slug`,
  },
])
