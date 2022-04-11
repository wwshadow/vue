<template>
  <div>
    <el-input class="input" v-model.trim="searchInput" placeholder="cse-1589"
      @keyup.enter.native="getCseInfo(),getCseChildInfo()"></el-input>

    <el-button style="margin-left: 10px;" type="primary" icon="el-icon-search" v-on:click="search">
      搜索</el-button>
    <el-row class="home" :gutter="20">
      <el-col :span="9" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="cse">
            <img height="50px" width="50px" border-radius=50%; :src="usrimg" />
            <div class="cseinfo">
              <p class="name">客户名称：</p><span>{{info.customername}}</span>
              <p class="access">项目名称：</p><span>{{info.projectname}}</span>
              <p class="fullname">完整名：</p><span>{{info.fullname}}</span>
            </div>
          </div>
          <div class="csechild-info">
            <p>描述信息：</p>
            <span>{{info.describe}}</span>
          </div>
        </el-card>
        <el-card style="margin-top: 20px; height: 500px;">

          <el-table max-height="400" :data="tableData" :default-sort="{prop: 'createdata', order: 'descending'}">
            <el-table-column fixed prop="createdata" label="创建日期" width="100" sortable>
            </el-table-column>
            <el-table-column prop="issueid" label="ESDESK-id" width="150">
              <template slot-scope="scope">
                <el-link type="primary" :href="'https://easystack.atlassian.net/browse/'+scope.row.issueid"
                  target="_blank">
                  {{scope.row.issueid}}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="esdeskname" label="描述" width="150">
            </el-table-column>
            <el-table-column prop="issuetype" label="类型" width="130">
            </el-table-column>
            <el-table-column prop="issuestatus" label="case状态" width="80">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="15" style="margin-top: 20px">
        <p style="font-size: 22px; margin-bottom: 10px; color: #999999;">当前项目case分类统计:</p>
        <div class="num">
          <el-card v-for="item in caseTypeData" :key="item.type" :body-style="{display: 'flex',padding: 0}">

            <i class="icon" :class="['el-icon-cpu']" :style="{background: '#ffb980'}"></i>
            <div class="detail">
              <p class="num">{{item.value}}</p>
              <p class="txt">{{item.type}}</p>
            </div>
          </el-card>
        </div>
        <p style="font-size: 22px; margin-bottom: 10px; color: #999999;"> 当年每月case量:</p>
        <el-card>
          <e-chart :chartData="echartData.csenum" style="height:200px" />
        </el-card>
        <div>
          <!-- {{tableDataByMouth}} -->
        </div>
      </el-col>
    </el-row>
  </div>

</template>


<script>
import axios from 'axios'
import EChart from '../../src/components/ECharts.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'CseInfo',
  // eslint-disable-next-line vue/no-unused-components
  components: { EChart },
  data() {
    return {
      usrimg: require('../../src/assets/images/OIP-C.jpg'),
      info: {},
      restaurants: [],
      state: '',
      timeout: null,
      searchInput: 'cse-1589',
      tableData: [
        {
          createdata: '',
          esdeskname: '',
          issueid: '',
          issuetype: '',
          issuestatus: '',
        },
      ],
      tableDataByMouth: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
      ],
      caseTypeData: {
        type: 'test',
        value: '100',
      },
      iconData: ['el-icon-cpu'],
      echartData: {
        csenum: {
          xData: [],
          series: [],
        },
      },
    }
  },
  props: {
    msg: String,
  },

  methods: {
    search() {
      this.getCseInfo(),
        this.getCseChildInfo(),
        this.getCseChildType(),
        this.getCseMonth()
    },
    getCseInfo() {
      axios
        .get('/jirainfo/cse/', {
          params: { csekey: this.searchInput },
        })
        .then((response) => (this.info = response.data))
        .catch((err) => {
          console.log(err)
        })
    },
    getCseChildInfo() {
      axios
        .get('/jirainfo/csechild/', {
          params: { csekey: this.searchInput },
        })
        .then((response) => {
          this.tableData = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getCseChildTop3() {
      axios
        .get('/jirainfo/csechildtop3/', {
          params: { csekey: this.searchInput },
        })
        .then((response) => (this.info = response.data))
        .catch((err) => {
          console.log(err)
        })
    },

    getCseChildType() {
      axios
        .get('/jirainfo/csetype/', {
          params: { csekey: this.searchInput },
        })
        .then((response) => (this.caseTypeData = response.data))
        .catch((err) => {
          console.log(err)
        })
    },
  },
  mounted() {
    var that = this
    that.getCseMonth = function () {
      axios
        .get('/jirainfo/csemonth/', {
          params: { csekey: this.searchInput },
        })
        .then((response) => {
          this.echartData.csenum.xData = this.tableDataByMouth
          this.echartData.csenum.series = [
            {
              name: '当年每月cse量',
              data: Object.values(response.data),
              type: 'bar',
            },
          ]
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
}
</script>
<style lang="less" scoped>
.input {
  margin-top: 20px;
  width: 100px;
}
</style>