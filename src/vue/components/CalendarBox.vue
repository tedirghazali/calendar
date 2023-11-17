<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import useCalendar from '../composables/useCalendar'

interface Props {
  modelValue?: any,
  year?: number,
  month?: number,
  locale?: string,
  type?: string,
  size?: string,
  week?: boolean,
  min?: any,
  max?: any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: new Date(),
  year: new Date().getFullYear(),
  month: Number(new Date().getMonth()) + 1,
  locale: 'en-US',
  type: 'narrow',
  size: 'medium',
  week: false,
  min: null,
  max: null
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void,
  (e: 'handler', value: any[] | any): void
}>()

const year = ref<number>(props?.year || new Date().getFullYear())
const month = ref<number>(props?.month || Number(new Date().getMonth()) + 1)
const date = ref<number>(props.modelValue?.getDate() || new Date().getDate())
const locale = ref<string>(props.locale || 'en-US')
const daytype = ref<any>({ weekday: props.type || 'narrow' })

watch(() => props.modelValue, () => {
  year.value = props?.year || new Date(props?.modelValue || null).getFullYear()
  month.value = props?.month || Number(new Date(props?.modelValue || null).getMonth()) + 1
  date.value = props.modelValue?.getDate() || new Date().getDate()
})

watch(() => props.year, () => {
  year.value = props.year
})

watch(() => props.month, () => {
  month.value = props.month
})

const { days, daysInMonth, daysInPrevMonth, daysInNextMonth } = useCalendar(year, month, date, locale, daytype)

const splitDate = (dateArg: string) => {
  return dateArg.split('-')
}

const weeks = ['1', '2', '3', '4', '5', '6']
const count = ref(0)

const selectDate = (yr: number, mn: number, dy: number) => {
  date.value = dy
  const newDate: any = new Date(yr, Number(mn) - 1, dy)
  emit('update:modelValue', newDate)
  emit('handler', newDate)
}

const activeHandler = (dy: number) => {
  let newActive = false
  const newYear: number = new Date(props?.modelValue || null).getFullYear()
  const newMonth: number = Number(new Date(props?.modelValue || null).getMonth()) + 1
  if(Number(newYear) === Number(year.value) && Number(newMonth) === Number(month.value) && Number(date.value) === Number(dy)) {
    newActive = true
  }
  return newActive
}

const currentHandler = (dy: number) => {
  let newActive = false
  const newYear: number = new Date().getFullYear()
  const newMonth: number = Number(new Date().getMonth()) + 1
  if(Number(newYear) === Number(year.value) && Number(newMonth) === Number(month.value) && Number(new Date().getDate()) === Number(dy)) {
    newActive = true
  }
  return newActive
}

const compareToMin = computed(() => {
  return props.min !== null ? new Date(props.min).valueOf() : new Date(props.modelValue).valueOf()
})

const compareToMax = computed(() => {
  return props.max !== null ? new Date(props.max).valueOf() : new Date(props.modelValue).valueOf()
})

const minMaxHandler = (dy: number) => {
  let newActive = false

  if(props.min !== null && new Date(props.min).valueOf() < Number(compareToMax.value)) {
    const newYear: number = new Date(props.min).getFullYear()
    const newMonth: number = Number(new Date(props.min).getMonth()) + 1
    if(Number(newYear) === Number(year.value) && Number(newMonth) === Number(month.value) && Number(dy) <= Number(new Date(props.min).getDate())) {
      newActive = true
    }
  }
  if(props.max !== null && new Date(props.max).valueOf() > Number(compareToMin.value)) {
    const newYear: number = new Date(props.max).getFullYear()
    const newMonth: number = Number(new Date(props.max).getMonth()) + 1
    if(Number(newYear) === Number(year.value) && Number(newMonth) === Number(month.value) && Number(dy) >= Number(new Date(props.max).getDate())) {
      newActive = true
    }
  }
  return newActive
}
</script>

<template>
  <div class="calendar tedirCalendar" :class="{hasWeek: props?.week, tedirCalendarSmall: props?.size === 'small'}">
    <div class="calendarDay">
      <div class="dayGrid">
        <div v-for="day in days" class="dayItem">
          {{ day }}
        </div>
      </div>
    </div>
    <div class="calendarMonth">
      <div class="monthGrid">
        <div v-for="prevNum in daysInPrevMonth" :key="prevNum" class="monthItem readOnlyItem">
          <div class="monthHeader">{{ prevNum }}</div>
          <div class="monthBody"></div>
        </div>
        <div v-for="dayNum in daysInMonth" :key="dayNum" class="monthItem" :class="{active: activeHandler(dayNum), current: currentHandler(dayNum), readOnlyItem: minMaxHandler(dayNum)}" @click.stop="selectDate(year, month, dayNum)">
          <div class="monthHeader">{{ dayNum }}</div>
          <div class="monthBody"></div>
        </div>
        <div v-for="nextNum in daysInNextMonth" :key="nextNum" class="monthItem readOnlyItem">
          <div class="monthHeader">{{ nextNum }}</div>
          <div class="monthBody"></div>
        </div>
      </div>
    </div>
    <div class="calendarWeek" v-if="props?.week">
      <div class="weekWrap">
        <div class="weekDay readOnlyItem">W</div>
        <div class="weekGrid">
          <div v-for="week in weeks" class="weekItem readOnlyItem">
            <div class="monthHeader">{{ week }}</div>
            <div class="monthBody"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@use tedirLayoutCalendar;
@use tedirCalendar;
</style>
