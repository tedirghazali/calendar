import { ref, computed, Ref } from 'vue'

const arg: Ref<T> = (val: T) => {
  return { value: val }
}

export default function useCalendar(
  getYearRef: Ref<number> = arg<number>(new Date().getFullYear()), 
  getMonthRef: Ref<number> = arg<number>(new Date().getMonth()), 
  getDayRef: Ref<number> = arg<number>(new Date().getDate()), 
  getLocaleRef: Ref<string> = arg<string>('en-US'), 
  getOptionRef: Ref<any> = arg<any>({ weekday: 'long' })
) {
  
  const days = computed<string[]>(() => {
    const weekDays = []
    for(let i = 1; i <= 7; i++) {
      const utcDate = new Date(Date.UTC(2021, 7, i));
      weekDays.push(new Intl.DateTimeFormat(getLocaleRef.value, { weekday: getOptionRef.value.weekday }).format(utcDate))
    }
    return weekDays
  })
  
  const daysInMonth = computed<number>(() => {
    const commonDays = [28, 29, 30, 31]
    const numOfDays = new Date(Date.UTC(getYearRef.value, getMonthRef.value, 0)).getUTCDate()
    return commonDays.includes(numOfDays) ? numOfDays : 31
  })
  
  const daysInPrevMonth = computed<number>(() => {
    const prevDays = []
    const getDay = new Date(Date.UTC(getYearRef.value, Number(getMonthRef.value) - 1, 1)).getUTCDay()
    for(let i = Number(getDay) - 1; i >= 0; i--) {
      prevDays.push(new Date(Date.UTC(getYearRef.value, Number(getMonthRef.value) - 1, Number('-'+i))).getUTCDate())
    }
    return prevDays
  })
  
  const daysInNextMonth = computed<number>(() => {
    const getDay = new Date(Date.UTC(getYearRef.value, Number(getMonthRef.value) - 1, daysInMonth.value)).getUTCDay()
    return (6 - Number(getDay)) + 7
  })
  
  return {
    days,
    daysInMonth,
    daysInPrevMonth,
    daysInNextMonth
  }
}
