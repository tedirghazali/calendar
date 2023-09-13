import { defineCustomElement } from 'vue'
import VueCalendarBox from '../vue/components/CalendarBox.vue'
import VueDatePicker from '../vue/components/DatePicker.vue'
import VueTimePicker from '../vue/components/TimePicker.vue'
import VueDateTimePicker from '../vue/components/DateTimePicker.vue'

//@ts-ignore
export const CalendarBox = defineCustomElement(VueCalendarBox)
//@ts-ignore
export const DatePicker = defineCustomElement(VueDatePicker)
//@ts-ignore
export const TimePicker = defineCustomElement(VueTimePicker)
//@ts-ignore
export const DateTimePicker = defineCustomElement(VueDateTimePicker)

export function useTedirCalendar() {
  customElements.define('calendar-box', CalendarBox)
  customElements.define('date-picker', DatePicker)
  customElements.define('time-picker', TimePicker)
  customElements.define('date-time-picker', DateTimePicker)
}
