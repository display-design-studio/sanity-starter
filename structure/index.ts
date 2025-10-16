import {StructureBuilder} from 'sanity/structure'
import {home} from './home'
import {pages} from './pages'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([home(S), pages(S)])
