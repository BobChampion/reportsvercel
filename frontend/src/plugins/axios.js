import axios from "axios";

const instance = axios.create({
    baseURL: 'https://reportsvercel-api.vercel.app/'
});

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, '$axios', { value: instance });
  }
}