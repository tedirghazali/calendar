import SaDropzone from './src/upload/SaDropzone.js'
import SaInvoice from './src/table/SaInvoice.js'

const createElem = (tagName, tagObj) => {
  customElements.define(tagName, tagObj)
}

export const dropzone = () => createElem('sa-dropzone', SaDropzone)
export const invoice = () => createElem('sa-invoice', SaInvoice)
