import SaDropzone from './src/upload/SaDropzone.js'
import SaInvoice from './src/table/SaInvoice.js'

const createElem = (tagName, tagObj) => {
  customElements.define(tagName, tagObj)
}

export const inject = (el, style) => import(style).then(value => el.styleScoped = value['default'])
export const dropzone = () => createElem('sa-dropzone', SaDropzone)
export const invoice = () => createElem('sa-invoice', SaInvoice)
