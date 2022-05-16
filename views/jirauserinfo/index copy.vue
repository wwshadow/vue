/* eslint-disable vue/no-unused-vars */
<template>
  <div>
    <el-autocomplete style="margin-top: 20px" popper-class="my-autocomplete" v-model.trim="workerId"
      @keyup.enter.native="search()" value-key="cseid" :fetch-suggestions="querySearch" placeholder="请输入内容"
      @select="handleSelect" clearable>
      <template slot-scope="{ item }">
        <div class="cseid">{{ item.cseid }}</div>
        <span class="csename">{{ item.csename }}</span>
      </template>
    </el-autocomplete>
    <el-button style="margin-left: 10px;" type="primary" icon="el-icon-search" v-on:click="search">
      搜索</el-button>
    <el-row class="jirauser" :gutter="20">
      <el-col :span="12" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="user">
            <img height="50px" width="50px" border-radius=50%; :src="usrimg" />
            <div class="userinfo">
              <p class="name">用户名称：</p><span>{{ info.customername }}</span>
              <p class="access">所属部门：</p><span>{{ info.projectname }}</span>
              <p class="fullname">邮箱/id：</p><span>{{ info.fullname }}</span>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-top: 20px;">
          <div>
            <p>
              最近一个月case情况
            </p>
          </div>
          <el-table max-height="400" :data="tableData" :default-sort="{ prop: 'createdata', order: 'descending' }"
            @row-click="sss">
            <el-table-column fixed prop="createdata" label="创建日期" width="100" sortable>
            </el-table-column>
            <el-table-column prop="issueid" label="ESDESK-id" width="150">
              <template slot-scope="scope">
                <el-link type="primary" :href="'https://easystack.atlassian.net/browse/' + scope.row.issueid"
                  target="_blank">
                  {{ scope.row.issueid }}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="timespent" label="工时" width="60">
            </el-table-column>
            <el-table-column prop="esdeskname" label="描述" width="150">
            </el-table-column>
            <el-table-column prop="issuetype" label="类型" width="130">
            </el-table-column>
            <el-table-column prop="issuestatus" label="case状态" width="80">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">

              <template slot-scope="scope">
                <!-- slot-scope="scope" -->
                <!-- <p>姓名: {{ scope.row.issueid }}</p> -->
                <el-button @click="ShowDialog" type="primary" icon="el-icon-edit" size="small">
                  填写工时<p>{{ dialogVisible }}</p>
                  <tompe-dialog :dialogVisible="dialogVisible" :accuseitem="accuseitem" :childid="scope.row.issueid"
                    @close-dialogStatus="CloseDialog">
                  </tompe-dialog>

                </el-button>

              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="9" style="margin-top: 20px">

      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
import TompeDialog from './TompeDialog.vue'
export default {
  name: 'jiraUserInfo',
  components: {
    TompeDialog,
  },

  data() {
    return {
      info: {},
      usrimg: require('../../src/assets/images/OIP-C.jpg'),
      // dialog
      accuseitem: {},
      dialogVisible: false,


      workerId: '5f812189287870006a5c85b4',
      timeout: null,
      list1: [],
      filldatetime: '',
      childid: '',

      is_autofill: false,
      tableData: [
        {
          createdata: '',
          esdeskname: '',
          issueid: '',
          issuetype: '',
          issuestatus: '',
          timespent: '',
        },
      ],
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    dialogVisible(newvalue, oldvalue) {
      console.log("dialogVisible", this.dialogVisible, newvalue)
      // this.vis = newvalues
      console.log("dialogVisible", this.dialogVisible)
    }
  },
  // watch:{
  //   // eslint-disable-next-line vue/no-arrow-functions-in-watch
  //   Visible:(newvalue,oldvalue)=>{
  //     console.log(newvalue,oldvalue)
  //   }
  // },
  methods: {
    sss() { },
    // dialog
    async getesdeskid(rows) {
      this.childid = rows
      console.log("rows", rows)
    },
    // eslint-disable-next-line no-unused-vars

    // eslint-disable-next-line no-unused-vars
    ShowDialog() {
      // this.accuseitem = item
      this.dialogVisible = true
    },
    CloseDialog() {
      this.dialogVisible = false
    },

    posttempo(esdeskid) {
      // let resdata = []
      axios({
        url: '/jirainfo/filltompe/',
        method: 'post',
        data: {
          is_autofill: this.is_autofill,
          tompetime: this.tompetime,
          esdeskid: esdeskid,
          filldatetime: this.filldatetime,
          Authorization: this.Authorization,
          workerId: this.workerId,
        },
        // transformRequest: [
        //   function (data) {
        //     var oMyForm = new FormData()
        //     oMyForm.append('offset', 0)
        //     oMyForm.append('limit', 9999)
        //     oMyForm.append('roomCode', '')
        //     oMyForm.append('roomtypeId', 0)
        //     oMyForm.append('floorId', 0)
        //     console.info(oMyForm)
        //     return oMyForm
        //   },
        // ],
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          console.log(response)
          // if response.
        })
        .catch((err) => {
          console.log(err)
          alert(err)
        })
    },
    search() {
      // this.getCseInfo()
      this.GetUserCaseInfo()
    },
    handleClick(row) {
      console.log('update不行  可以采用另一个方案')
      console.log(row)
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
      return (workerId) => {
        return (
          workerId.cseid.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0 ||
          workerId.csename.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    //暂时无用
    loadAll() {
      let resdata = []
      axios({
        // url: 'http://192.168.10.130:8080/csetotal.json',
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

    GetUserCaseInfo() {
      axios
        .get('/jirainfo/usercase/', {
          params: { userid: this.workerId },
        })
        .then((response) => (this.tableData = response.data))
        .catch((err) => {
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
</style>