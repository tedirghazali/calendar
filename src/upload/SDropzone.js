export default class SDropzone extends HTMLElement {
  static get observedAttributes() { return ['s-model'] }
  
  constructor() {
    super()
    this._dropzoneFiles = []
  }
  
  get modelValue() {
    return JSON.stringify(this._dropzoneFiles)
  }
  
  set modelValue(val) {
    this.setAttribute('s-model', val)
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    const newVal = JSON.parse(newValue)
    if(Array.isArray(newVal)) {
      this._dropzoneFiles = newVal
    } else {
      this._dropzoneFiles.push(newVal)
    }
  }
  
  connectedCallback() {
    this.classList.add('dropzone')
    this.attachShadow({mode: 'open'});
    const template = document.createElement('template');
    template.innerHTML =  `
      <input type="file" id="dropzoneFile" class="dropzoneFile" ref="dropzoneFile" multiple accept="image/*">
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
