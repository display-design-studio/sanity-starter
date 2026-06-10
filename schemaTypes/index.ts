//Documents
import {home} from './documents/home'
import {page} from './documents/page'
import {header} from './documents/header'
import {footer} from './documents/footer'

//Types
import {cta} from './custom-types/cta'
import {localeString} from './custom-types/localeString'
import {localeText} from './custom-types/localeText'
import {localeBlock} from './custom-types/localeBlock'
import {localeSlug} from './custom-types/localeSlug'
import {media} from './custom-types/media'
import {picture} from './custom-types/picture'
import {video} from './custom-types/video'

const documents = [home, page, header, footer]
const types = [localeString, localeText, localeBlock, localeSlug, cta, picture, video, media]

export const schemaTypes = [...documents, ...types]
