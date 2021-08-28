export default class SaInvoice extends HTMLElement {
  static get observedAttributes() { return ['quantity', 'price', 'amount', 'currency', 'locale'] }
  
  constructor() {
    super()
    this._columns = [
      {name: 'id', text: 'SN.', bg: 'rgba(0, 0, 0, 0.0125)', fg: 'currentColor', width: '50px', align: 'center'},
      {name: 'description', text: 'Item Description', bg: 'rgba(0, 0, 0, 0.009)', fg: 'currentColor', width: 'auto', align: 'left'},
      {name: 'quantity', text: 'Quantity', bg: 'rgba(0, 0, 0, 0.0125)', fg: 'currentColor', width: '100px', align: 'right'},
      {name: 'price', text: 'Price', bg: 'rgba(0, 0, 0, 0.009)', fg: 'currentColor', width: '150px', align: 'right', format: 'currency'},
      {name: 'amount', text: 'Amount', bg: 'rgba(0, 0, 0, 0.0125)', fg: 'currentColor', width: '150px', align: 'right', format: 'currency'},
    ]
    this._entries = []
    this._rates = []
    this._quantity = 'quantity'
    this._price = 'price'
    this._amount = 'amount'
    this._currency = 'USD'
    this._locale = 'en-US'
    this._styleScoped = ''
    
    this.attachShadow({mode: 'open'})
    this.shadowRoot.append(document.createElement('style'))
  }
  
  get columns() {
    return this._columns
  }
  
  set columns(val) {
    this._columns = val
  }
  
  get entries() {
    return this._entries
  }
  
  set entries(val) {
    this._entries = val
  }
  
  get rates() {
    return this._rates
  }
  
  set rates(val) {
    this._rates = val
  }
  
  set quantity(val) {
    this.setAttribute('quantity', val)
  }
  
  set price(val) {
    this.setAttribute('price', val)
  }
  
  set amount(val) {
    this.setAttribute('amount', val)
  }
  
  set currency(val) {
    this.setAttribute('currency', val)
  }
  
  set locale(val) {
    this.setAttribute('locale', val)
  }
  
  set styleScoped(val) {
    this._styleScoped = val
    this.shadowRoot.querySelector('style').textContent = this._styleScoped
    //console.log(this._styleScoped)
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    //console.log(name +": "+ newValue)
    if(name === 'quantity') {
      this._quantity = newValue
    }
  }
  
  connectedCallback() {
    const template = document.createElement('template')
    template.innerHTML =  `
    <table class="table tableBorder tableInvoice" role="table">
      <colgroup role="colgroup">
        <col role="col">
        <col role="col">
        <col role="col">
        <col role="col">
        <col role="col">
      </colgroup>
      <thead class="tableHead" role="rowgroup">
        <tr class="tableRow" role="row">
          <th class="tableScope" scope="col" role="columnheader" aria-sort="none">SL.</th>
          <th class="tableScope" scope="col" role="columnheader" aria-sort="none">Item Description</th>
          <th class="tableScope" scope="col" role="columnheader" aria-sort="none">Quantity</th>
          <th class="tableScope" scope="col" role="columnheader" aria-sort="none">Price</th>
          <th class="tableScope" scope="col" role="columnheader" aria-sort="none">Amount</th>
        </tr>
      </thead>
      <tbody class="tableBody" role="rowgroup">
        <tr class="tableRow" role="row">
          <td class="tableCell" role="cell"></td>
          <th class="tableScope" role="rowheader"></th>
          <td class="tableCell" role="cell"></td>
          <td class="tableCell" role="cell"></td>
          <td class="tableCell" role="cell"></td>
        </tr>
      </tbody>
      <tfoot class="tableFoot" role="rowgroup">
        <tr class="tableRow" role="row">
          <td class="tableCell" colspan="3" rowspan="2" role="cell"></td>
          <th class="tableScope" scope="row" role="rowheader">Sub Total</th>
          <td class="tableCell" role="cell"></td>
        </tr>
        <tr class="tableRow" role="row">
          <th class="tableScope" scope="row" role="rowheader">Total</th>
          <td class="tableCell" role="cell"></td>
        </tr>
      </tfoot>
    </table>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    
    let vm = this
    /*this.shadowRoot.getElementById('dropzoneFile').addEventListener('change', (e) => vm._onChange(e, vm))
    this.shadowRoot.getElementById('dropzoneWrapper').addEventListener('dragenter', this._onDragEnter)
    this.shadowRoot.getElementById('dropzoneWrapper').addEventListener('dragover', this._onDragOver)
    this.shadowRoot.getElementById('dropzoneWrapper').addEventListener('drop', (e) => this._onDrop(e, vm))*/
  }
  
  /*_onDragEnter(e) {
    e.preventDefault()
  }
  
  _onDragOver(e) {
    e.preventDefault()
  }
  
  _onDrop(e) {
    e.preventDefault()
    const dropzoneValue = e.target.files || e.dataTransfer.files
    for(let i = 0; i < dropzoneValue.length; i++) {
      this._columns.unshift(dropzoneValue[i])
    }
  }
  
  _onChange(e, vm) {
    const dropzoneValue = e.target.files || e.dataTransfer.files
    for(let i = 0; i < dropzoneValue.length; i++) {
      vm._columns.unshift(dropzoneValue[i])
    }
  }*/
}
