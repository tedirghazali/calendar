import SaDropzone from './src/upload/SaDropzone.js'

const createElem = (tagName, tagObj) => {
  customElements.define(tagName, tagObj)
}

export const dropzone = () => createElem('sa-dropzone', SaDropzone)
