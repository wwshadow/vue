<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <Cseinfo msg="Welcome to Your Vue.js App" /> -->
    <router-view></router-view>
  </div>
</template>

<script >
// import HelloWorld from './components/HelloWorld.vue'
// import Cseinfo from './components/cse.vue'
export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    // HelloWorld,
    // eslint-disable-next-line vue/no-unused-components
    // Cseinfo,
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      var currentPath = window.location.hash.slice(1); // 获取输入的路由
      if (this.$router.path !== currentPath) {
        this.$router.push(currentPath); // 动态跳转
      }
    }, false);
  }
}
</script>

<style >
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  height: 100;
}
</style>
