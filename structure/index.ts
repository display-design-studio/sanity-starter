import {home} from './home'
import {pages} from './pages'

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([home(S), pages(S)])
