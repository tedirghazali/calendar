import { defineCustomElement } from 'vue'
import VueCalendarBox from '../vue/components/CalendarBox.vue'
import VueDatePicker from '../vue/components/DatePicker.vue'
import VueTimePicker from '../vue/components/TimePicker.vue'

export const CalendarBox = defineCustomElement(VueCalendarBox)
export const DatePicker = defineCustomElement(VueDatePicker)
export const TimePicker = defineCustomElement(VueTimePicker)

export function useTedirEditor() {
  customElements.define('calendar-box', CalendarBox)
  customElements.define('date-picker', DatePicker)
  customElements.define('time-picker', TimePicker)
}
