import { CogIcon } from '@sanity/icons/Cog'
import type { StructureBuilder } from 'sanity/structure'

export const siteNavigation = (S: StructureBuilder) =>
  S.listItem()
    .title('Site Navigation')
    .icon(CogIcon)
    .child(
      S.list()
        .title('Site Navigation')
        .items([
          S.listItem()
            .id('header')
            .schemaType('header')
            .title('Header')
            .child(S.editor().id('header').schemaType('header').documentId('header')),
          S.listItem()
            .id('footer')
            .schemaType('footer')
            .title('Footer')
            .child(S.editor().id('footer').schemaType('footer').documentId('footer')),
        ]),
    )
