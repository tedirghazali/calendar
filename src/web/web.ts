import { defineCustomElement } from 'vue'
import VueCalendarBox from '../vue/components/CalendarBox.vue'
import VueDatePicker from '../vue/components/DatePicker.vue'
import VueTimePicker from '../vue/components/TimePicker.vue'

//@ts-ignore
export const CalendarBox = defineCustomElement(VueCalendarBox)
//@ts-ignore
export const DatePicker = defineCustomElement(VueDatePicker)
//@ts-ignore
export const TimePicker = defineCustomElement(VueTimePicker)

export function useTedirEditor() {
  customElements.define('calendar-box', CalendarBox)
  customElements.define('date-picker', DatePicker)
  customElements.define('time-picker', TimePicker)
}
