import { defineCustomElement } from 'vue'
import VueCalendarBox from '../vue/components/CalendarBox.vue'
import VueDatePicker from '../vue/components/DatePicker.vue'

export const CalendarBox = defineCustomElement(VueCalendarBox)
export const DatePicker = defineCustomElement(VueDatePicker)

export function useTedirEditor() {
  customElements.define('calendar-box', CalendarBox)
  customElements.define('date-picker', DatePicker)
}
