<template>

  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img height="50px" width="50px" border-radius=50%; :src="usrimg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">superadmin</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>22-2-2</span></p>
          <p>上次登录地点：<span>bj </span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px;">
        <!-- <el-table :data="tableData">
          <el-table-column v-for="(val,key) in tableLable" :key="key" :prop="key" :label="val"></el-table-column>
        </el-table> -->
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">

        <el-card v-for="item in countData" :key="item.name" :body-style="{display: 'flex',padding: 0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
          <!-- <i class="icon" :class="item.icon" :style="{background: item.color}"></i> -->
          <div class="detail">
            <p class="num">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 200px">
        <!-- <div style="height:200px" ref="echarts"></div> -->
        <e-chart :chartData="echartData.order" style="height:200px"></e-chart>
      </el-card>
      <div class="graph">
        <el-card style="hight:260px">
          <e-chart :chartData="echartData.user" style="height:200px" />
        </el-card>
        <el-card style="hight:260px">
          <e-chart :chartData="echartData.video" :isAxisChart="false" style="height:150px" />
        </el-card>
      </div>

    </el-col>
  </el-row>
</template>
<script>
import { getData } from '../../api/data.js'
// import * as echarts from 'echarts'
import EChart from '../../src/components/ECharts.vue'
export default {
  components: { EChart },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'home',
  data() {
    return {
      usrimg: require('../../src/assets/images/OIP-C.jpg'),
      tableData: [
        {
          name: 'oppo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: 'vivo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: '苹果',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: '小米',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: '三星',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: '魅族',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
      ],
      echartData: {
        ordermonth: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    }
  },
  mounted() {
    // this.$http
    //   .get('/user?ID=1234')
    //   .then(function (response) {
    //     console.log(response)
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
    getData().then((res) => {
      const { code, data } = res.data
      if (code === 20000) {
        this.tableData = data.tableData
        const order = data.orderData
        const xData = order.date
        const keyAarry = Object.keys(order.data[0])
        const series = []
        keyAarry.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: 'line',
          })
        })
        //  拿到数据作为下x,y轴  传值用法
        // const option = {
        //   xAxis: {
        //     data: xData,
        //   },
        //   yAxis: {},
        //   legend: {
        //     data: keyAarry,
        //   },
        //   series,
        // }
        // const E = echarts.init(this.$refs.echarts)
        // E.setOption(option)
        // 组件用法
        this.echartData.order.xData = xData
        this.echartData.order.series = series

        this.echartData.user.xData = data.userData.map((item) => item.date)
        this.echartData.user.series = [
          {
            name: '新增用户',
            data: data.userData.map((item) => item.new),
            type: 'bar',
          },
          {
            name: '活跃用户',
            data: data.userData.map((item) => item.active),
            type: 'bar',
            // bar 表示柱状图
          },
        ]
        this.echartData.video.series = [
          {
            data: data.videoData,
            type: 'pie',
          },
        ]
      }

      console.log(res)
    })
  },
}
</script>
<style lang="less" scoped>
// .user {
//   height: 150px;
//   width: 200px;
//   border-radius: 50%;
// }
</style>