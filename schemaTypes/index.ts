//Documents
import {home} from './documents/home'
import {page} from './documents/page'

//Types
import {localeString} from './custom-types/localeString'
import {localeText} from './custom-types/localeText'
import {localeBlock} from './custom-types/localeBlock'
import {localeSlug} from './custom-types/localeSlug'

const documents = [home, page]
const types = [localeString, localeText, localeBlock, localeSlug]

export const schemaTypes = [...documents, ...types]
