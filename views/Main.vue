<template>
  <el-container style="height: 100%">
    <el-aside width="auto"></el-aside>
    <common-aside></common-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '../src/components/CommonAside.vue'
import CommonHeader from '../src/components/commonHeader.vue'
// import CseInfo from '../src/components/cse.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    CommonAside,
    CommonHeader,
    // CseInfo,
  },
  data() {
    return {}
  },
}
</script>
<style lang="less" scoped>
.el-header {
  background-color: #545c64;
}
.el-main {
  padding-top: 0;
}
</style>