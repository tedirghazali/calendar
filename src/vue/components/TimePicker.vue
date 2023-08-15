<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import CalendarBox from './CalendarBox.vue'

interface Props {
  modelValue?: string,
  placeholder?: string,
  timeType?: string,
  locale?: string,
  option?: any,
  up?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void,
  (e: 'handler', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: new Date().toLocaleTimeString('en-GB'),
  placeholder: '',
  timeType: '',
  locale: 'en-GB',
  option: {},
  up: false
})

const emit = defineEmits<Emits>()

const year = ref<number>(new Date().getFullYear())
const monthIndex = ref<number>(new Date().getMonth())
const day = ref<number>(new Date().getDay())
const hour = ref<number>(Number(props?.modelValue.split(':')?.[0] || new Date().getHours()))
const minute = ref<number>(Number(props?.modelValue.split(':')?.[1] || new Date().getMinutes()))
const second = ref<number>(0)
if(props.timeType !== '12h' && props.timeType !== '24h') {
  second.value = Number(props?.modelValue.split(':')?.[2] || new Date().getSeconds())
}
const selected = ref<Date>(new Date(year.value, monthIndex.value, day.value, Number(hour.value), Number(minute.value), Number(second.value)))
const picker = ref<boolean>(false)

const changeTime = () => {
  selected.value = new Date(year.value, monthIndex.value, day.value, Number(hour.value), Number(minute.value), Number(second.value))
}

watch(() => props.modelValue, () => {
  hour.value = Number(props.modelValue.split(':')?.[0] || new Date().getHours())
  minute.value = Number(props.modelValue.split(':')?.[1] || new Date().getMinutes())
  if(props.timeType !== '12h' && props.timeType !== '24h') {
    second.value = Number(props?.modelValue.split(':')?.[2] || new Date().getSeconds())
  }
  selected.value = new Date(year.value, monthIndex.value, day.value, Number(hour.value), Number(minute.value), Number(second.value))
})
watch(hour, changeTime)
watch(minute, changeTime)
watch(second, changeTime)

const addTimeHandler = (fromUnit: string) => {
  let newVal = 1000
  if(fromUnit === 'h') {
    newVal = 1000 * 3600
  } else if(fromUnit === 'm') {
    newVal = 1000 * 60
  }
  
  const newDate = new Date(year.value, monthIndex.value, day.value, Number(hour.value), Number(minute.value), Number(second.value))
  newDate.setMilliseconds(Number(newVal))
  hour.value = newDate.getHours()
  minute.value = newDate.getMinutes()
  if(props.timeType !== '12h' && props.timeType !== '24h') {
    second.value = newDate.getSeconds()
  }
  selected.value = newDate
  emit('update:modelValue', timeInputValue.value)
  emit('handler', timeInputValue.value)
}

const subTimeHandler = (fromUnit: string) => {
  let newVal = 1000
  if(fromUnit === 'h') {
    newVal = 1000 * 3600
  } else if(fromUnit === 'm') {
    newVal = 1000 * 60
  }
  
  const newDate = new Date(year.value, monthIndex.value, day.value, Number(hour.value), Number(minute.value), Number(second.value))
  newDate.setMilliseconds(Number('-'+newVal))
  hour.value = newDate.getHours()
  minute.value = newDate.getMinutes()
  if(props.timeType !== '12h' && props.timeType !== '24h') {
    second.value = newDate.getSeconds()
  }
  selected.value = newDate
  emit('update:modelValue', timeInputValue.value)
  emit('handler', timeInputValue.value)
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

const pickedHandler = (val: boolean) => {
  emit('update:modelValue', timeInputValue.value)
  emit('handler', timeInputValue.value)
  picker.value = val
}

const timePlusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg>`
const timeMinusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
</svg>`
</script>

<template>
  <div dir="ltr" class="picker tedirDatePicker tedirTimePicker" :class="{active : picker, pickerUp: up}">
    <div class="pickerBackdrop" @click="pickedHandler(false)"></div>
    <div class="pickerWrap">
      <input type="text" :value="timeInputValue" @click="pickedHandler(!picker)" class="input tedirDateInput" :placeholder="placeholder" readonly />
      <div class="pickerContent" :style="(timeType === '12h' || timeType === '24h') ? 'min-width: 0px;' : ''">
        <div class="tedirTimeGroup">
          <div class="group groupList">
            <button type="button" class="button groupItem" v-html="timePlusIcon" @click="addTimeHandler('h')"></button>
            <input type="text" v-model="hour" class="input groupItem tedirTimeInput" maxlength="2" />
            <button type="button" class="button groupItem" v-html="timeMinusIcon" @click="subTimeHandler('h')"></button>
          </div>
          <div class="group groupList">
            <button type="button" class="button groupItem" v-html="timePlusIcon" @click="addTimeHandler('m')"></button>
            <input type="text" v-model="minute" class="input groupItem tedirTimeInput" maxlength="2" />
            <button type="button" class="button groupItem" v-html="timeMinusIcon" @click="subTimeHandler('m')"></button>
          </div>
          <div v-if="timeType === '12h'" class="group groupList">
            <button type="button" class="button groupItem">AM</button>
            <button type="button" class="button groupItem">PM</button>
          </div>
          <div v-else-if="timeType !== '24h'" class="group groupList">
            <button type="button" class="button groupItem" v-html="timePlusIcon" @click="addTimeHandler('s')"></button>
            <input type="text" v-model="second" class="input groupItem tedirTimeInput" maxlength="2" />
            <button type="button" class="button groupItem" v-html="timeMinusIcon" @click="subTimeHandler('s')"></button>
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
