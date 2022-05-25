<template>
  <div>
    <el-autocomplete class="input" popper-class="my-autocomplete" v-model.trim="state" @keyup.enter.native="search()"
      value-key="cseid" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" clearable>
      <template slot-scope="{ item }">
        <div class="cseid">{{ item.cseid }}</div>
        <span class="csename">{{ item.csename }}</span>
      </template>
    </el-autocomplete>
    <el-button style="margin-left: 10px;" type="primary" icon="el-icon-search" v-on:click="search(state)">
      搜索</el-button>
    <el-row class="jiracse" :gutter="20">
      <el-col :span="9" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="cse">
            <img height="50px" width="50px" border-radius=50%; :src="usrimg" />
            <div class="cseinfo">
              <p class="name">客户名称：</p><span>{{ info.customername }}</span>
              <p class="access">项目名称：</p><span>{{ info.projectname }}</span>
              <p class="fullname">完整名：</p><span>{{ info.fullname }}</span>
            </div>
          </div>
          <div class="csechild-info">
            <p>
              <el-descriptions class="margin-top" title="描述信息" :column="1" direction="vertical">
                <el-descriptions-item label="描述信息">{{ info.describe }}</el-descriptions-item>
              </el-descriptions>
            </p>
          </div>

        </el-card>
        <el-card style="margin-top: 20px; height: 500px;">

          <el-table max-height="500" :data="tableData" :default-sort="{ prop: 'createdata', order: 'descending' }">
            <el-table-column fixed prop="createdata" label="创建日期" width="100" sortable>
            </el-table-column>
            <el-table-column prop="issueid" label="ESDESK-id" width="150">
              <template slot-scope="scope">
                <el-link type="primary" :href="'https://easystack.atlassian.net/browse/' + scope.row.issueid"
                  target="_blank">
                  {{ scope.row.issueid }}</el-link>
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
          <el-card v-for="item in caseTypeData" :key="item.type" :body-style="{ display: 'flex', padding: 0 }">

            <i class="icon" :class="['el-icon-cpu']" :style="{ background: '#ffb980' }"></i>
            <div class="detail">
              <p class="num">{{ item.value }}</p>
              <p class="txt">{{ item.type }}</p>
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
      searchInput: '',
      list1: [],
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
        // 默认占个位置
        value2: '100',
        value3: '100',
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
  watch: {

    $route: {
      immediate: true,
      handler() {
        // console.log(this.$route)
        // console.log(this.$route.query)
        let newvalue = this.$route.query

        if (newvalue['csekey']) {
          console.log(newvalue)
          this.search(newvalue['csekey'])
        }
        else {
          console.log("buweikong", newvalue)

        }
      }

    }
  },
  methods: {
    search(val) {
      this.getCseInfo(val),
        this.getCseChildInfo(val),
        this.getCseChildType(val),
        this.getCseMonth(val)
    },
    getCseInfo(val) {

      axios
        .get('/cse/', {
          params: { csekey: val },

        })
        .then((response) => (this.info = response.data))
        .catch((err) => {
          console.log(err)
        })
    },
    getCseChildInfo(val) {
      axios
        .get('/csechild/', {
          params: { csekey: val },

        })
        .then((response) => {
          this.tableData = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getCseChildType(val) {
      axios
        .get('/csetype/', {
          params: { csekey: val },
          // params: val
        })
        .then((response) => (this.caseTypeData = response.data))
        .catch((err) => {
          console.log(err)
        })
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.cseid.toLowerCase().indexOf(queryString.toLowerCase()) === 0 ||
          state.csename.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    //暂时无用
    loadAll() {
      let resdata = []
      axios({
        url: 'http://192.168.10.130:8080/csetotal.json',
        modules: 'GET',
      })
        .then((res) => {
          resdata = res
        })
        .catch((err) => {
          console.log(err)
        })
      return resdata.data
    },
    loadAll2() {
      // let resdata = {}
      this.$http.get('http://192.168.10.130:8080/csetotal.json').then((res) => {
        this.list1 = [res.data]
        this.restaurants = this.list1[0].data
      })
    },
    handleSelect(item) {
      console.log('item', item)
    },
    getCseMonth(val) {
      axios
        .get('/csemonth/', {
          params: { csekey: val },
          // params: val
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
  mounted() {
    this.loadAll2()
    // var that = this
    // that.getCseMonth = function (val) {
    //   axios
    //     .get('/csemonth/', {
    //       params: { csekey: val },
    //       // params: val
    //     })
    //     .then((response) => {
    //       this.echartData.csenum.xData = this.tableDataByMouth
    //       this.echartData.csenum.series = [
    //         {
    //           name: '当年每月cse量',
    //           data: Object.values(response.data),
    //           type: 'bar',
    //         },
    //       ]
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // }
  },
}
</script>
<style lang="less" scoped>
.input {
  margin-top: 20px;
  // width: 100px;
}

.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .cseid {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .csename {
      text-overflow: ellipsis;
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>