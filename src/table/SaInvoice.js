import { number as num } from 'alga-js'

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
    this._subtotal = 0
    this._total = 0
    this._quantity = 'quantity'
    this._price = 'price'
    this._amount = 'amount'
    this._currency = 'USD'
    this._locale = 'en-US'
    this._styleScoped = `
      .table {
        width: 100%;
        margin-bottom: 1rem;
        caption-side: bottom;
        border-spacing: 0px;
        border-collapse: collapse;
        color: #212529;
        border-color: #dee2e6;
        font-family: Calibri, Arial, sans-serif;
      }
      .tableCaption {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        text-align: left;
        color: #6c757d;
      }
      .tableScope {
        text-align: inherit;
        text-align: -webkit-match-parent;
      }
      .tableHead,
      .tableBody,
      .tableFoot,
      .tableRow,
      .tableCell, 
      .tableScope {
        border-color: inherit;
        border-style: solid;
        border-width: 0px;
      }
      .table > :not(.tableCaption) > * > * {
        padding: 0.5rem;
        border-bottom-width: 1px;
        background-color: transparent;
      }
      .tableSmall > :not(.tableCaption) > * > * {
        padding: 0.25rem;
        border-bottom-width: 1px;
        background-color: transparent;
      }
      .table.tableLarge > :not(.tableCaption) > * > * {
        padding: 0.75rem;
        border-bottom-width: 1px;
        background-color: transparent;
      }
      .table > .tableBody {
        vertical-align: inherit;
      }
      .table > .tableHead {
        vertical-align: bottom;
      }
      .table > :not(:last-child) > :last-child > * {
        border-bottom-color: inherit;
      }
      .tableCaptionTop {
        caption-side: top;
      }
      .tableBorder > :not(.tableCaption) > * {
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-right-width: 0px;
        border-left-width: 0px;
      }
      .tableBorder > :not(.tableCaption) > * > * {
        border-top-width: 0px;
        border-bottom-width: 0px;
        border-right-width: 1px;
        border-left-width: 1px;
      }
      .tableBorderless > :not(.tableCaption) > * > * {
        border-bottom-width: 0px;
      }
      .tableStripe > .tableBody > .tableRow:nth-of-type(odd) {
        background-color: rgba(0, 0, 0, 0.05);
      }
      .tableActive {
        background-color: rgba(0, 0, 0, 0.1);
      }
      .tableHover > .tableBody > .tableRow:hover {
        background-color: rgba(0, 0, 0, 0.075);
      }
      .tableResponsive {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
    `
    
    this.attachShadow({mode: 'open'})
    this.shadowRoot.append(document.createElement('style'))
    
    const template = document.createElement('template')
    template.innerHTML =  `
    <table class="table tableBorder tableInvoice" role="table">
      <thead class="tableHead" role="rowgroup">
        <tr class="tableRow" role="row"></tr>
      </thead>
      <tbody class="tableBody" role="rowgroup"></tbody>
      <tfoot class="tableFoot" role="rowgroup">
        <tr class="tableRow tableSubTotal" role="row"></tr>
        <tr class="tableRow tableRate" role="row"></tr>
        <tr class="tableRow tableTotal" role="row"></tr>
      </tfoot>
    </table>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  
  get columns() {
    return this._columns
  }
  
  set columns(val) {
    this._columns = val
    this._insertColumns()
    this._insertSubTotal()
  }
  
  get entries() {
    return this._entries
  }
  
  set entries(val) {
    this._entries = val
    this._insertEntries()
  }
  
  get rates() {
    return this._rates
  }
  
  set rates(val) {
    this._rates = val
    this._insertSubTotal()
    this._insertRates()
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
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if(name === 'quantity') {
      this._quantity = newValue
      this._insertEntries()
    } else if(name === 'price') {
      this._price = newValue
      this._insertEntries()
    } else if(name === 'amount') {
      this._amount = newValue
      this._insertEntries()
    } else if(name === 'currency') {
      this._currency = newValue
      this._insertEntries()
    } else if(name === 'locale') {
      this._locale = newValue
      this._insertEntries()
    }
  }
  
  connectedCallback() {
    this._insertColumns()
    this._insertEntries()
    this.shadowRoot.querySelector('style').textContent = this._styleScoped
  }
  
  _insertColumns() {
    this.shadowRoot.querySelector('table thead tr').innerHTML = this._columns.map(col => {
      return `<th class="tableScope" scope="col" role="columnheader" aria-sort="none" style="background-color: ${col.bg}; color: ${col.fg}; width: ${col.width}; text-align: ${col.align};">${col.text}</th>`
    }).join('')
  }
  
  _insertEntries() {
    let vm = this
    this.shadowRoot.querySelector('table tbody').innerHTML = this._entries.map((entry, index) => {
      let row = '<tr class="tableRow" role="row">'
      row += vm._columns.map(col => {
        let column = ''
        if(col.name === vm._price) {
          column = `<td class="tableCell" role="cell" style="background-color: ${col.bg}; color: ${col.fg}; width: ${col.width}; text-align: ${col.align};">${num.currency(entry[col.name], vm._currency, vm._locale)}</td>`
        } else if(col.name === vm._amount) {
          const calcAmount = Number(entry[vm._quantity]) * Number(entry[vm._price])
          vm._entries[index][vm._amount] = calcAmount
          column = `<td class="tableCell" role="cell" style="background-color: ${col.bg}; color: ${col.fg}; width: ${col.width}; text-align: ${col.align};">${num.currency(calcAmount, vm._currency, vm._locale)}</td>`
        } else {
          column = `<td class="tableCell" role="cell" style="background-color: ${col.bg}; color: ${col.fg}; width: ${col.width}; text-align: ${col.align};">${entry[col.name]}</td>`
        }
        return column
      }).join('')
      row += '</tr>'
      return row
    }).join('')
    this._insertSubTotal()
  }
  
  _insertSubTotal() {
    let vm = this
    this._subtotal = (this._entries.length >= 1) ? this._entries.map(i => i[this._amount]).reduce((acc, val) => acc + val) : 0
    this.shadowRoot.querySelector('table tfoot tr.tableSubTotal').innerHTML = `
      <td class="tableCell" colspan="${Number(vm._columns.length) - 2}" rowspan="${Number(vm._rates.length) + 2}" role="cell"></td>
      <th class="tableScope" scope="row" role="rowheader">Sub Total</th>
      <td class="tableCell" role="cell" style="text-align: ${vm._columns[Number(vm._columns.length) - 1].align};">${num.currency(vm._subtotal, vm._currency, vm._locale)}</td>
    `
    this._insertRates()
  }
  
  _insertRates() {
    let vm = this
    const tableRates = [].slice.call(this.shadowRoot.querySelectorAll('table tfoot tr.tableRate'))
    for(let tbRate of tableRates) {
      tbRate.remove()
    }
    let rateNodes = ''
    this._rates.forEach((rate, index) => {
      if(rate.type === 'percent') {
        this._rates[index]['result'] = (Number(rate[this._amount]) / 100) * Number(this._subtotal)
      } else {
        this._rates[index]['result'] = rate[this._amount]
      }
      rateNodes += `
        <tr class="tableRow tableRate" role="row">
          <th class="tableScope" scope="row" role="rowheader">${rate.text}</th>
          <td class="tableCell" role="cell" style="text-align: ${vm._columns[Number(vm._columns.length) - 1].align};">${num.currency(this._rates[index]['result'], vm._currency, vm._locale)}</td>
        </tr>
      `
    })
    this.shadowRoot.querySelector('table tfoot tr.tableSubTotal').insertAdjacentHTML('afterend', rateNodes)
    this._insertTotal()
  }
  
  _insertTotal() {
    let vm = this
    this._total = this._subtotal
    for(let rate of this._rates) {
      this._total = (rate.calc === 'subtraction') ? Number(this._total) - Number(rate.result) : Number(this._total) + Number(rate.result)
    }
    this.shadowRoot.querySelector('table tfoot tr.tableTotal').innerHTML = `
      <th class="tableScope" scope="row" role="rowheader">Total</th>
      <td class="tableCell" role="cell" style="text-align: ${vm._columns[Number(vm._columns.length) - 1].align};">${num.currency(this._total, vm._currency, vm._locale)}</td>
    `
  }
}
