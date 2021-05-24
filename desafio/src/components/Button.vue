<template>
  <b-button
    class="button"
    :type="type"
    :icon-right="icon"
    :name="name"
  >
    {{ value }}
  </b-button>
</template>

<script>
export default {
  props: ["action", "type", "icon", "name", "value"],
};
</script>

<style>
</style>