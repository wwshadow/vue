<template>
  <el-carousel indicator-position="outside" style="margin-top: 20px" >
    <el-carousel-item v-for="item in 4" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
// import { getData } from '../../api/data.js'
// import * as echarts from 'echarts'
// import EChart from '../../src/components/ECharts.vue'
export default {
  // components: { EChart },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'home',
  data() {
    return {
      ss: ""
    }
  },
  mounted() {
    // this.$http
  },
}
</script>
<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>