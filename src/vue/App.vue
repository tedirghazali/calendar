<script setup lang="ts">
import DatePicker from './components/DatePicker.vue'
import CalendarBox from './components/CalendarBox.vue'
import EventCalendar from './components/EventCalendar.vue'
</script>

<template>
  <div class="container my-5rem">
    <DatePicker />
    <p><br/></p>
    <CalendarBox />
    <p><br/></p>
    <EventCalendar />
  </div>
</template>
