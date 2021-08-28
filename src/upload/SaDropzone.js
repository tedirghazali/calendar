export default class SaDropzone extends HTMLElement {
  static get observedAttributes() { return ['allow'] }
  
  constructor() {
    super()
    this._dropzoneFiles = []
    this._allowFiles = '*'
  }
  
  get files() {
    return this._dropzoneFiles
  }
  
  set files(val) {
    this._dropzoneFiles = val
  }
  
  set allow(val) {
    this.setAttribute('allow', val)
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    this._allowFiles = newValue
  }
  
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    const template = document.createElement('template');
    template.innerHTML =  `
    <div class="dropzone">
      <input type="file" id="dropzoneFile" class="dropzoneFile" ref="dropzoneFile" multiple accept="${this._allowFiles}">
      <div id="dropzoneWrapper" class="dropzoneWrapper">
        <label for="dropzoneFile" class="dropzoneLabel">
          <div class="dropzoneIcon"><slot></slot></div>
          <div class="dropzoneBody">
            <h3 class="dropzoneTitle">Drag and drop files to upload</h3>
            <p class="dropzoneSubtitle">Your files will be added automatically</p>
            <button type="button" class="dropzoneButton">or select files</button>
          </div>
        </label>
      </div>
    </div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    
    let vm = this
    this.shadowRoot.getElementById('dropzoneFile').addEventListener('change', (e) => vm._onChange(e, vm))
    this.shadowRoot.getElementById('dropzoneWrapper').addEventListener('dragenter', this._onDragEnter)
    this.shadowRoot.getElementById('dropzoneWrapper').addEventListener('dragover', this._onDragOver)
    this.shadowRoot.getElementById('dropzoneWrapper').addEventListener('drop', (e) => this._onDrop(e, vm))
  }
  
  disconnectedCallback() {
    this.shadowRoot = null
  }
  
  _onDragEnter(e) {
    e.preventDefault()
  }
  
  _onDragOver(e) {
    e.preventDefault()
  }
  
  _onDrop(e) {
    e.preventDefault()
    const dropzoneValue = e.target.files || e.dataTransfer.files
    for(let i = 0; i < dropzoneValue.length; i++) {
      this._dropzoneFiles.unshift(dropzoneValue[i])
    }
  }
  
  _onChange(e, vm) {
    const dropzoneValue = e.target.files || e.dataTransfer.files
    for(let i = 0; i < dropzoneValue.length; i++) {
      vm._dropzoneFiles.unshift(dropzoneValue[i])
    }
  }
}
