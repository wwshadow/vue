<template>
  <div>
    <p>{{ msg }}</p>
    <p>{{ info }}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'CseInfo',
  data() {
    return {
      info: null,
    }
  },
  props: {
    msg: String,
  },
  mounted() {
    this.getCseInfo()
  },
  methods: {
    getCseInfo() {
      axios
        .get('/jirainfo/cse/', {
          params: { csekey: 'cse-1589' },
        })
        .then((response) => (this.info = response.data))
        .catch((err) => {
          console.log(err)
        })
    },
    getCseChildInfo() {
      axios
        .get('http://192.168.10.130:8080/jirainfo/csechild/', {
          params: { csekey: 'cse-1589' },
        })
        .then((response) => (this.info = response.data))
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>