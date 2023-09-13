<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { format, years, months } from 'alga-js/date'
import CalendarBox from './CalendarBox.vue'

interface Props {
  modelValue?: any,
  placeholder?: string,
  timeType?: string,
  locale?: string,
  option?: any,
  min?: any,
  max?: any,
  add?: number,
  up?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void,
  (e: 'handler', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: new Date(),
  placeholder: '',
  timeType: '',
  locale: '',
  option: {},
  min: null,
  max: null,
  add: 0,
  up: false
})

const emit = defineEmits<Emits>()

//const selected = ref<Date>(new Date(props?.modelValue || null))
const year = ref<number>(new Date(props?.modelValue || null).getFullYear())
const month = ref<number>(Number(new Date(props?.modelValue || null).getMonth()) + 1)
const day = ref<number>(new Date(props?.modelValue || null).getDate())
const hour = ref<number>(new Date(props?.modelValue || null).getHours())
const minute = ref<number>(new Date(props?.modelValue || null).getMinutes())
const second = ref<number>(0)
if(props.timeType !== '12h' && props.timeType !== '24h') {
  second.value = Number(new Date(props?.modelValue || null).getSeconds())
}
const selected = ref<Date>(new Date(year.value, (Number(month.value) - 1), day.value, Number(hour.value), Number(minute.value), Number(second.value)))
const picker = ref<boolean>(false)
const searchStr = ref<string>('')

const changeTime = () => {
  selected.value = new Date(year.value, (Number(month.value) - 1), day.value, Number(hour.value), Number(minute.value), Number(second.value))
}

const changeDateFunc = () => {
  const newSelectedDate = new Date(props?.modelValue || null)
  if(props?.add) {
    newSelectedDate.setDate(Number(newSelectedDate.getDate()) + Number(props.add))
  }
  hour.value = Number(newSelectedDate.getHours())
  minute.value = Number(newSelectedDate.getMinutes())
  if(props.timeType !== '12h' && props.timeType !== '24h') {
    second.value = Number(newSelectedDate.getSeconds())
  }
  
  year.value = newSelectedDate.getFullYear()
  month.value = Number(newSelectedDate.getMonth()) + 1
  day.value = newSelectedDate.getDate()
  selected.value = new Date(year.value, (Number(month.value) - 1), day.value, Number(hour.value), Number(minute.value), Number(second.value))
}

watch(() => props.modelValue, changeDateFunc)
watch(hour, changeTime)
watch(minute, changeTime)
watch(second, changeTime)

if(props?.add) {
  changeDateFunc()
}
watch(() => props?.add, changeDateFunc)

const randomChar = (maxlength: number = 10) => {
  let allChar: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let resChar: string = ''
  for(let i: number = 0; i < maxlength; i++) {
    resChar += allChar.charAt(Math.floor(Math.random() * allChar.length))
  }
  return resChar
}

const addTimeHandler = (fromUnit: string) => {
  let newVal = 1000
  if(fromUnit === 'h') {
    newVal = 1000 * 3600
  } else if(fromUnit === 'm') {
    newVal = 1000 * 60
  }
  
  const newDate = new Date(year.value, (Number(month.value) - 1), day.value, Number(hour.value), Number(minute.value), Number(second.value))
  newDate.setMilliseconds(Number(newVal))
  hour.value = newDate.getHours()
  minute.value = newDate.getMinutes()
  if(props.timeType !== '12h' && props.timeType !== '24h') {
    second.value = newDate.getSeconds()
  }
  selected.value = newDate
  pickedHandler(null)
}

const subTimeHandler = (fromUnit: string) => {
  let newVal = 1000
  if(fromUnit === 'h') {
    newVal = 1000 * 3600
  } else if(fromUnit === 'm') {
    newVal = 1000 * 60
  }
  
  const newDate = new Date(year.value, (Number(month.value) - 1), day.value, Number(hour.value), Number(minute.value), Number(second.value))
  newDate.setMilliseconds(Number('-'+newVal))
  hour.value = newDate.getHours()
  minute.value = newDate.getMinutes()
  if(props.timeType !== '12h' && props.timeType !== '24h') {
    second.value = newDate.getSeconds()
  }
  selected.value = newDate
  pickedHandler(null)
}

const timeInputValue = computed<any>(() => {
  let newOption = props?.option || {}
  if(props.timeType === '24h') {
    newOption = Object.assign({}, newOption, {
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit'
    })
  } else if(props.timeType === '12h') {
    newOption = Object.assign({}, newOption, {
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit'
    })
  } else {
    newOption = Object.assign({}, newOption, {
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit'
    })
  }
  return new Date(selected.value).toLocaleTimeString(props?.locale || 'en-GB', newOption)
})

const hideByClick = () => {
  picker.value = false
}

const pickedHandler = (val: any) => {
  if(val) {
    hour.value = Number(new Date(props?.modelValue || null).getHours())
    minute.value = Number(new Date(props?.modelValue || null).getMinutes())
    if(props.timeType !== '12h' && props.timeType !== '24h') {
      second.value = Number(new Date(props?.modelValue || null).getSeconds())
    }
    year.value = new Date(selected.value || null).getFullYear()
    month.value = Number(new Date(selected.value || null).getMonth()) + 1
    day.value = new Date(selected.value || null).getDate()
    selected.value = new Date(year.value, (Number(month.value) - 1), day.value, Number(hour.value), Number(minute.value), Number(second.value))
  }

  const pickedSelectedDate = new Date(selected.value || null)
  
  emit('update:modelValue', format(pickedSelectedDate, ''))
  emit('handler', format(pickedSelectedDate, ''))
}

const allYears = computed(() => {
  let arrYears = Array.from(years(year.value, 4)).map((item: any, index: number, self: any[]) => {
    let newItem = {
      text: item,
      value: item
    }
    if(Number(index) === 0) {
      newItem.text = 'Prev'
      newItem.value = item
    } else if(Number(index) === Number(self.length) - 1) {
      newItem.text = 'Next'
      newItem.value = item
    }
    return newItem
  })
  return arrYears
})

const allMonths = computed(() => {
  return months()
})

const monthControlHandler = (btnControl: string) => {
  let monthNum = 1
  if(btnControl === 'prev') {
    if(month.value > 1 && month.value <= 12) {
      monthNum = month.value - 1
    } else if(month.value === 1) {
      monthNum = 12
      year.value = year.value - 1
    }
  } else if(btnControl === 'next') {
    if(month.value >= 1 && month.value < 12) {
      monthNum = month.value + 1
    } else if(month.value === 12) {
      monthNum = 1
      year.value = year.value + 1
    }
  }
  month.value = monthNum
}

const dateInputValue = computed<any>(() => {
  const newSelectedDate = new Date(selected.value || null)
  
  return format(newSelectedDate, '', props?.locale || '', props?.option || {})
})

const timePlusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg>`
const timeMinusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
</svg>`
</script>

<template>
  <div class="picker tedirDatePicker" :class="{active : picker, pickerUp: up}">
    <div class="pickerBackdrop" @click="hideByClick"></div>
    <div class="pickerWrap">
      <input type="text" :value="dateInputValue" @click="picker = !picker" class="input tedirDateInput" :placeholder="placeholder" readonly />
      <div class="pickerContent">
        <div class="tedirDateControl">
          <div class="tedirDateStart" @click="monthControlHandler('prev')">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
          </div>
          <div class="tedirDateCenter">
            <select v-model="month" class="select tedirDateMonth">
              <option v-for="mnt in allMonths" :key="mnt.value" :value="Number(mnt.value)">{{ mnt.text }}</option>
            </select>
            <select v-model="year" class="select tedirDateYear">
              <option v-for="yr in allYears" :key="yr.value" :value="yr.value">{{ yr.text }}</option>
            </select>
          </div>
          <div class="tedirDateEnd" @click="monthControlHandler('next')">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>
        </div>
        <CalendarBox v-model="selected" class="tedirDateCalendar" size="small" :year="year" :month="month" :min="min" :max="max" @handler="pickedHandler" />
        <div dir="ltr" class="tedirDateTimePicker tedirTimeGroup">
          <div class="group">
            <button type="button" class="button groupItem" v-html="timeMinusIcon" @click="subTimeHandler('h')"></button>
            <input type="text" v-model="hour" class="input groupItem tedirTimeInput" maxlength="2" />
            <button type="button" class="button groupItem" v-html="timePlusIcon" @click="addTimeHandler('h')"></button>
          </div>
          <div class="group">
            <button type="button" class="button groupItem" v-html="timeMinusIcon" @click="subTimeHandler('m')"></button>
            <input type="text" v-model="minute" class="input groupItem tedirTimeInput" maxlength="2" />
            <button type="button" class="button groupItem" v-html="timePlusIcon" @click="addTimeHandler('m')"></button>
          </div>
          <div v-if="timeType === '12h'" class="group groupList">
            <button type="button" class="button groupItem">AM</button>
            <button type="button" class="button groupItem">PM</button>
          </div>
          <div v-else-if="timeType !== '24h'" class="group">
            <button type="button" class="button groupItem" v-html="timeMinusIcon" @click="subTimeHandler('s')"></button>
            <input type="text" v-model="second" class="input groupItem tedirTimeInput" maxlength="2" />
            <button type="button" class="button groupItem" v-html="timePlusIcon" @click="addTimeHandler('s')"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@use picker;
@use form;
@use tedirDatePicker;
@use tedirTimePicker;
@use tedirDateTimePicker;
</style>
