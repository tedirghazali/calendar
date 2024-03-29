<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { format, years, months } from 'alga-js/date'
import CalendarBox from './CalendarBox.vue'

interface Props {
  modelValue?: any,
  placeholder?: string,
  locale?: string,
  option?: any,
  min?: any,
  max?: any,
  add?: number,
  up?: boolean,
  blacklist?: any[],
  whitelist?: any[]
}

interface Emits {
  (e: 'update:modelValue', value: string): void,
  (e: 'handler', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: new Date(),
  placeholder: '',
  locale: '',
  option: {},
  min: null,
  max: null,
  add: 0,
  up: false,
  //@ts-ignore
  blacklist: [],
  //@ts-ignore
  whitelist: []
})

const emit = defineEmits<Emits>()

const selected = ref<Date>(new Date(props?.modelValue || null))
const year = ref<number>(new Date(props?.modelValue || null).getFullYear())
const month = ref<number>(Number(new Date(props?.modelValue || null).getMonth()) + 1)
const picker = ref<boolean>(false)
const searchStr = ref<string>('')

const changeDateFunc = () => {
  const newSelectedDate = new Date(props?.modelValue || null)
  
  selected.value = newSelectedDate
  year.value = newSelectedDate.getFullYear()
  month.value = Number(newSelectedDate.getMonth()) + 1
}

watch(() => props.modelValue, changeDateFunc)

const addDateFunc = () => {
  const newSelectedDate = new Date(props?.modelValue || null)
  if(props?.add) {
    newSelectedDate.setDate(Number(newSelectedDate.getDate()) + Number(props.add))

    selected.value = newSelectedDate
    year.value = newSelectedDate.getFullYear()
    month.value = Number(newSelectedDate.getMonth()) + 1

    emit('update:modelValue', format(newSelectedDate, 'date'))
    emit('handler', format(newSelectedDate, 'date'))
  }
  
}

if(props?.add) {
  addDateFunc()
}
watch(() => props?.add, () => {
  addDateFunc()
})

const randomChar = (maxlength: number = 10) => {
  let allChar: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let resChar: string = ''
  for(let i: number = 0; i < maxlength; i++) {
    resChar += allChar.charAt(Math.floor(Math.random() * allChar.length))
  }
  return resChar
}

const hideByClick = () => {
  picker.value = false
}

const pickedHandler = (val: any) => {
  const pickedSelectedDate = new Date(selected.value || null)
  
  emit('update:modelValue', format(pickedSelectedDate, 'date'))
  emit('handler', format(pickedSelectedDate, 'date'))
  picker.value = false
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
  
  return format(newSelectedDate, 'date', props?.locale || '', props?.option || {})
})
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
        <CalendarBox v-model="selected" class="tedirDateCalendar" size="small" :year="year" :month="month" :min="min" :max="max" :blacklist="blacklist" :whitelist="whitelist" @handler="pickedHandler" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@use picker;
@use form {
  field: input;
}
@use tedirDatePicker;
</style>
