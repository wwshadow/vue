<template>
  <div>

    <el-autocomplete class="input" popper-class="my-autocomplete" v-model="state" value-key="cseid"
      :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" clearable>
      <template slot-scope="{ item }">
        <div class="cseid">{{ item.cseid }}</div>
        <span class="csename">{{ item.csename }}</span>
      </template>
    </el-autocomplete>
    <!-- <el-button style="margin-left: 10px;" type="primary" icon="el-icon-search" v-on:click="search">
      搜索</el-button> -->
    <el-row class="home" :gutter="20">
      <el-col :span="24" style="margin-top: 20px">
        <el-card shadow="hover">
          <el-table v-loading="loading" element-loading-text="数据拼命加载中" :data="tableData" border style="width: 100%"
            height="700">
            <el-table-column prop="cseid" label="cseID" width="180">
            </el-table-column>
            <el-table-column prop="csename" label="cse名称" width="180">
            </el-table-column>
            <el-table-column prop="csestatus" label="cse状态" width="180">
            </el-table-column>
            <el-table-column prop="fullname" label="客户组织名称" width="180">
            </el-table-column>
            <el-table-column prop="customername" label="客户名称" width="180">
            </el-table-column>
            <el-table-column prop="projectname" label="项目名称" width="180">
            </el-table-column>
            <el-table-column prop="version" label="当前版本" width="180">
            </el-table-column>
            <el-table-column prop="maintenancedate" label="维保到期时间" width="180">
            </el-table-column>
            <el-table-column prop="environmenttype" label="环境类型">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>


<script>
import axios from 'axios'
// import EChart from '../../src/components/ECharts.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'CseTotal',
  // eslint-disable-next-line vue/no-unused-components
  // components: { EChart },
  data() {
    return {
      timeout: null,
      restaurants: [],
      list1: [],
      state: '',
      tableData: [
        {
          cseid: '',
          csename: '',
          csestatus: '',
          customername: '',
          projectname: '',
          fullname: '',
          version: '',
          maintenancedate: '',
          environmenttype: '',
        },
      ],
      loading: true,
      searchInput: 'cse-1589',
    }
  },

  created() {
    this.getCseChildInfo()
  },
  mounted() {
    this.loadAll2()
  },
  //   watch(){
  // getCseChildInfo(),
  // deep:true,
  //   },
  props: {},
  methods: {
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

    search() {
      // this.loadAll()
    },
    getCseChildInfo() {
      axios
        .get('/jirainfo/csetotal')
        .then((response) => {
          this.tableData = response.data
          this.loading = false
        })
        .catch((err) => {
          // this.alert('err')
          this.loading = false
          alert('请求失败，请检查网络及服务状态！')
          console.log(err)
        })
    },
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
      // word-break: break-all;
      // word-wrap: break-word;
      font-size: 12px;
      color: #b4b4b4;
      // max-height: 200px;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>