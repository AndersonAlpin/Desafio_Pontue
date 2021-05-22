<template>
  <div v-if="link">
    <hr>
    <b-image :src="link"></b-image>
  </div>
</template>

<script>
export default {
  props: ["link"]
}
</script>

<style>

</style>