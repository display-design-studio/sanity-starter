import {StructureBuilder} from 'sanity/structure'

export const home = (S: StructureBuilder) =>
  S.listItem()
    .id('home')
    .schemaType('home')
    .title('Home')
    .child(S.editor().id('home').schemaType('home').documentId('home'))
