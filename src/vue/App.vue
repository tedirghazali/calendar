<script setup lang="ts">
import { ref } from 'vue'
import DatePicker from './components/DatePicker.vue'
import TimePicker from './components/TimePicker.vue'
import DateTimePicker from './components/DateTimePicker.vue'
import CalendarBox from './components/CalendarBox.vue'
import EventCalendar from './components/EventCalendar.vue'

const startdate = ref<string>('2023-12-13')
const addDate = ref<string>('2023-12-20')
const handler = (val: any) => {
  console.log(startdate.value)
  console.log(val)
  console.log(addDate.value)
}
</script>

<template>
  <div class="container my-10rem">
    <h2>Date Picker</h2>
    <div class="d-flex gap-1.5rem">
      <DatePicker v-model="addDate" :add="7" :up="true" @handler="handler" />
      <DatePicker v-model="startdate" :max="addDate" @handler="handler" />
      <DatePicker v-model="addDate" :min="startdate" @handler="handler" locale="en-US" />
    </div>
    <p><br/></p>
    <h2>Time Picker</h2>
    <TimePicker timeType="24h" :up="true" @handler="handler" />
    <p><br/></p>
    <h2>Date Time Picker</h2>
    <DateTimePicker timeType="24h" :up="true" @handler="handler" />
    <p><br/></p>
    <h2>Basic Calendar</h2>
    <CalendarBox />
    <p><br/></p>
    <h2>Event Calendar</h2>
    <EventCalendar />
  </div>
</template>
