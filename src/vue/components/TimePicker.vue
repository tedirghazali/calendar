<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { years, months } from 'alga-js/date'
import CalendarBox from './CalendarBox.vue'

interface Props {
  modelValue?: any,
  placeholder?: string,
  timeType?: string,
  locale?: string,
  option?: any,
}

interface Emits {
  (e: 'update:modelValue', value: any[] | any): void,
  (e: 'handler', value: any[] | any): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: new Date(),
  placeholder: '',
  timeType: '24h',
  locale: 'en-GB',
  option: {}
})

const emit = defineEmits<Emits>()

const selected = ref<Date>(new Date(props?.modelValue || null))
const year = ref<number>(new Date(props?.modelValue || null).getFullYear())
const month = ref<number>(Number(new Date(props?.modelValue || null).getMonth()) + 1)
const picker = ref<boolean>(false)
const searchStr = ref<string>('')

watch(() => props.modelValue, () => {
  selected.value = new Date(props?.modelValue || null)
  year.value = new Date(props?.modelValue || null).getFullYear()
  month.value = Number(new Date(props?.modelValue || null).getMonth()) + 1
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
  emit('update:modelValue', selected.value)
  emit('handler', val)
  picker.value = false
}

const allYears = computed(() => {
  return years(year.value, 4)
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

const timeInputValue = computed<any>(() => {
  let newOption = props?.option || {}
  if(props.timeType === '24h') {
    newOption = Object.assign({}, newOption, {
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit'
    })
  } else if(props.timeType === '12h') {
    newOption = Object.assign({}, newOption, {
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit'
    })
  }
  return new Date(selected.value).toLocaleTimeString(props?.locale || 'en-GB', props?.option || {})
})

const timePlusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg>`
const timeMinusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
</svg>`
</script>

<template>
  <div class="picker tedirDatePicker tedirTimePicker" :class="picker ? 'active' : ''">
    <div class="pickerBackdrop" @click="hideByClick"></div>
    <div class="pickerWrap">
      <input type="text" :value="timeInputValue" @click="picker = !picker" class="input tedirDateInput" :placeholder="placeholder" />
      <div class="pickerContent">
        <div class="tedirTimeGroup">
          <div class="group groupList">
            <button type="button" class="button groupItem" v-html="timePlusIcon"></button>
            <input type="text" class="input groupItem tedirTimeInput" maxlength="2" />
            <button type="button" class="button groupItem" v-html="timeMinusIcon"></button>
          </div>
          <div class="group groupList">
            <button type="button" class="button groupItem" v-html="timePlusIcon"></button>
            <input type="text" class="input groupItem tedirTimeInput" maxlength="2" />
            <button type="button" class="button groupItem" v-html="timeMinusIcon"></button>
          </div>
          <div v-if="props.timeType === '12h'" class="group groupList">
            <button type="button" class="button groupItem">AM</button>
            <button type="button" class="button groupItem">PM</button>
          </div>
          <div v-else class="group groupList">
            <button type="button" class="button groupItem" v-html="timePlusIcon"></button>
            <input type="text" class="input groupItem tedirTimeInput" maxlength="2" />
            <button type="button" class="button groupItem" v-html="timeMinusIcon"></button>
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
</style>
