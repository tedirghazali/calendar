<script setup lang="ts">
import DatePicker from './components/DatePicker.vue'
import CalendarBox from './components/CalendarBox.vue'
import EventCalendar from './components/EventCalendar.vue'
</script>

<template>
  <div class="container my-5rem">
    <h2>Date Picker</h2>
    <DatePicker />
    <p><br/></p>
    <h2>Basic Calendar</h2>
    <CalendarBox />
    <p><br/></p>
    <h2>Event Calendar</h2>
    <EventCalendar />
  </div>
</template>
