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
    <el-row class="jirauser" :gutter="25">
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
            <el-table-column prop="issuestatus" label="case状态" width="90">
            </el-table-column>
            <el-table-column fixed="right" label="操作">

              <template slot-scope="scope">
                <!-- slot-scope="scope" -->
                <!-- <p>姓名: {{ scope.row.issueid }}</p> -->
                <el-button @click="dialogFormVisible = true, getdeskinfo(scope.row.issueid)" type="primary"
                  icon="el-icon-edit" size="small">
                  填写工时
                  <!-- <tompe-dialog :dialogVisible="Visible" @childFn="receive" :childid="scope.row.issueid" >
                  </tompe-dialog> -->
                  <!-- <p>{{dialogVisible}}</p> -->
                </el-button>
                <el-dialog title="工时填写" :visible.sync="dialogFormVisible" :modal=false>

                  <el-form :model="form">
                    <el-form-item label="选择填写方式" :label-width="formLabelWidth">
                      <el-tooltip class="item" effect="dark" content="自动：填写当周工时；手动：仅填写当前esdesk" placement="top-start">
                        <i class="el-icon-info"></i>
                      </el-tooltip>
                      <el-switch style="display: block" v-model="is_autofill" active-color="#ff494"
                        inactive-color="#13ce66" active-text="自动" inactive-text="手动">
                      </el-switch>
                    </el-form-item>
                    <el-form-item label="用户id" :label-width="formLabelWidth">
                      <el-input v-model="workerId" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="caseid" :label-width="formLabelWidth">
                      <el-input v-model="esdeskid" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="工时" :label-width="formLabelWidth">
                      <el-input v-model="tompetime" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="日期选择" :label-width="formLabelWidth">
                      <el-date-picker v-model="filldatetime" align="right" type="date" placeholder="选择日期"
                        :picker-options="pickerOptions"> </el-date-picker>
                    </el-form-item>

                    <el-form-item label="Authorization认证">
                      <el-tooltip class="item" effect="dark"
                        content="Authorization获取方式tempo页面，F12后在approval-statuses中找到对应key " placement="top-start">
                        <i class="el-icon-info" aria-setsize=""></i>
                      </el-tooltip>
                      <el-input type="textarea" v-model="Authorization" autocomplete="on"
                        :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入tompe Authorization"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="posttempo(esdeskid)">确 定</el-button>
                  </div>
                </el-dialog>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="9" style="margin-top: 20px">
        <!-- <el-card shadow="hover">
          <div>
            <p>
              最近一个月case情况
            </p>
          </div>
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
            <el-table-column prop="timespent" label="工时(h)">
            </el-table-column>
          </el-table>
        </el-card> -->
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
// import TompeDialog from './TompeDialog.vue'
export default {
  name: 'jiraUserInfo',
  // components: {
  //   TompeDialog,
  // },
  data() {
    return {
      usrimg: require('../../src/assets/images/OIP-C.jpg'),
      info: {},
      restaurants: [],
      esdeskid: '',
      workerId: '5f812189287870006a5c85b4',
      timeout: null,
      list1: [],
      filldatetime: '',
      childid: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
      is_autofill: false,
      Authorization: '',
      tompetime: '',
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
      Visible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      formLabelWidth: '120px',
    }
  },
  watch: {
    // eslint-disable-next-line vue/no-arrow-functions-in-watch
    Visible: (newvalue, oldvalue) => {
      console.log(newvalue, oldvalue)
    }
  },
  methods: {
    async getdeskinfo(rs) {
      return this.esdeskid = rs
    },
    sss() { },
    showdialog() {
      this.Visible = true
    },
    receive() {
      this.Visible = false
    },
    async getesdeskid(rows) {
      this.childid = rows
      console.log("rows", rows)
    },



    posttempo(esdeskid) {
      // let resdata = []
      console.log(esdeskid)
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

        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // console.log(response.data.data)
          if (response.data === 'ok') {
            console.log("sss")
            alert("完成")
            this.dialogFormVisible = !this.dialogFormVisible
          }
          else if (response.data === 401) {
            console.log("401", response.data)
            // this.dialogFormVisible = !this.dialogFormVisible
            alert("认证失败")
          }
          else if (response.data === 200) {
            console.log("200", response.data)
            this.dialogFormVisible = !this.dialogFormVisible
            alert("填写完成")

          }
        })
        .catch((err) => {
          // console.log(err)
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