<script setup lang="ts">
import { ref } from 'vue'
import DatePicker from './components/DatePicker.vue'
import TimePicker from './components/TimePicker.vue'
import CalendarBox from './components/CalendarBox.vue'
import EventCalendar from './components/EventCalendar.vue'

const startdate = ref<string>('')
const handler = (val: any) => {
  console.log(startdate.value)
  console.log(val)
}
</script>

<template>
  <div class="container my-10rem">
    <h2>Date Picker</h2>
    <div class="d-flex gap-1.5rem">
      <DatePicker :add="2" :up="true" @handler="handler" />
      <DatePicker v-model="startdate" min="2022-12-16" @handler="handler" />
      <DatePicker max="2022-12-24" @handler="handler" />
    </div>
    <p><br/></p>
    <h2>Time Picker</h2>
    <TimePicker timeType="24h" :up="true" @handler="handler" />
    <p><br/></p>
    <h2>Basic Calendar</h2>
    <CalendarBox />
    <p><br/></p>
    <h2>Event Calendar</h2>
    <EventCalendar />
  </div>
</template>
