import { invoice } from '../../lib.js'

document.querySelector('#app').innerHTML = `
  <h1>Invoice Table</h1>
  <sa-invoice id="invoice"></sa-invoice>
`

invoice()

const invoiceElem = document.getElementById('invoice')

invoiceElem.entries = [
  { id: 1, description: 'Barang-1', quantity: 3, price: 15000, amount: 0 },
  { id: 2, description: 'Barang-2', quantity: 5, price: 78000, amount: 0 },
  { id: 3, description: 'Barang-3', quantity: 9, price: 6000, amount: 0 },
  { id: 4, description: 'Barang-4', quantity: 2, price: 1000, amount: 0 }
]
invoiceElem.rates = [
  {name: 'tax', text: 'Sales Tax', amount: 10, type: 'percent', calc: 'addition'}
]
invoiceElem.currency = 'IDR'
invoiceElem.locale = 'id-ID'

//console.log(document.querySelector('sa-dropzone').getAttribute('allow'))
