export const home = (S) =>
  S.listItem()
    .id('home')
    .schemaType('home')
    .title('Home')
    .child(S.editor().id('home').schemaType('home').documentId('siteSettings'))
