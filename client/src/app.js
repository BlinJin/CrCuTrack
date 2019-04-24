import Vue from 'vue'
import App from './App.vue'
import '../assets/app.css'
import Axios from 'axios';

Axios.defaults.baseURL = process.env.API_ENDPOINT;

new Vue({
  el: '#app',
  render: h => h(App)
})
