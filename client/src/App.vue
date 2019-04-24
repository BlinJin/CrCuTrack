<template>
  <div>
    <hello-component name="World" />
    <currency-dashboard />
  </div>
</template>

<script>
import HelloComponent from './components/HelloComponent.vue'
import CurrencyDashboard from './components/CurrencyDashboard.vue'
export default {
  components: {
    HelloComponent,
    CurrencyDashboard
  }
}
</script>
