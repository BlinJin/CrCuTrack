<template>
  <div>
    <hello-component name="World" />
  </div>
</template>

<script>
import HelloComponent from './components/HelloComponent.vue'
export default {
  components: {
    HelloComponent
  }
}
</script>
