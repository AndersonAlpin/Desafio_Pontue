<template>
  <b-button class="button" :type="type" :icon-right="icon" :name="name" @click="action">
    <slot />
  </b-button>
</template>

<script>
export default {
  props: ["action", "type", "icon", "name"],
};
</script>