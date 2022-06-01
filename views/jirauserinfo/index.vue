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
      <el-col :span="16" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="user">
            <img height="50px" width="50px" border-radius=50%; :src="usrimg" />
            <div class="userinfo">
              <p class="name">用户名称：</p><span>{{ info.jiraname }}</span>
              <p class="access">所属部门：</p><span>{{ info.projectname }}</span>
              <p class="fullname">邮箱/id：</p><span>{{ info.jiraemail }}</span>
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
            <el-table-column label="填写工时" width="120">
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
            <el-table-column prop="estotp" label="双因子" width="120">
              <template slot-scope="scope">
                <!-- slot-scope="scope" -->
                <!-- <p>姓名: {{ scope.row.issueid }}</p> -->
                <el-button @click="dialogFormVisibletotp = true, getesdeskinfos(scope.row.issueid)" type="primary"
                  icon="el-icon-edit" size="small">
                  双因子申请
                  <!-- <tompe-dialog :dialogVisible="Visible" @childFn="receive" :childid="scope.row.issueid" >
                  </tompe-dialog> -->
                  <!-- <p>{{dialogVisible}}</p> -->
                </el-button>
                <el-dialog title="双因子申请" :visible.sync="dialogFormVisibletotp" :modal=false>

                  <el-dialog width="30%" title="双因子密码" :visible.sync="innerVisible" append-to-body>

                    <el-table :data="totppwstable">
                      <el-table-column property="customer" label="客户" width="120"></el-table-column>
                      <el-table-column property="project" label="项目" width="110"></el-table-column>
                      <el-table-column property="timestamp" label="时间" width="95"></el-table-column>
                      <el-table-column property="totp_type" label="双因子类型" width="60"></el-table-column>
                      <el-table-column property="totp_version" label="平台版本" width="60"></el-table-column>
                      <el-table-column property="totp_pass" label="双因子"></el-table-column>
                    </el-table>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="innerVisible = false">取 消</el-button>
                      <el-button type="primary" @click="innerVisible = false, dialogFormVisibletotp = false">确 定
                      </el-button>
                    </div>
                  </el-dialog>

                  <el-form :model="totpdata">
                    <el-form-item label="选择版本" :label-width="formLabelWidth">
                      <el-radio v-model="totp_version" label="V5">V5</el-radio>
                      <el-radio v-model="totp_version" label="V6">V6</el-radio>
                    </el-form-item>
                    <el-form-item label="totp_type" :label-width="formLabelWidth">
                      <el-radio v-model="totp_type" label="roller">roller</el-radio>
                      <el-radio v-model="totp_type" label="totp">双因子动态密码</el-radio>
                    </el-form-item>
                    <el-form-item label="esdesk id" :label-width="formLabelWidth">
                      <el-input v-model="totpdata.issue" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="cse id" :label-width="formLabelWidth">
                      <el-input v-model="totpdata.cseid" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="客户名称" :label-width="formLabelWidth">
                      <el-input v-model="totpdata.customer" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称" :label-width="formLabelWidth">
                      <el-input v-model="totpdata.project" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="totp_version" :label-width="formLabelWidth">
                      <el-input v-model="totp_version" autocomplete="off"></el-input>
                    </el-form-item> -->

                    <el-form-item label="审核者" :label-width="formLabelWidth">
                      <el-input v-model="totpdata.auditor" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="申请原因" :label-width="formLabelWidth">
                      <el-input v-model="totpdata.reason" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="动态密码" :label-width="formLabelWidth">
                      <el-input v-model="Dynamicpwd" autocomplete="off"></el-input>
                    </el-form-item>

                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibletotp = false">取 消</el-button>
                    <el-button type="primary" @click="posttotp()">确 定</el-button>
                  </div>
                </el-dialog>
              </template>
            </el-table-column>
            <!-- // fixed="right" -->

            <!-- <el-table-column v-model="tableData.totppwd" label="双因子密码" width="90">
            </el-table-column> -->

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
import store from '../../store'
export default {
  name: 'jiraUserInfo',
  // components: {
  //   TompeDialog,
  // },
  data() {
    return {
      usrimg: require('../../src/assets/images/OIP-C.jpg'),
      info: {
        jiraname: '',
        jiraemail: '',
        projectname: '',
        groups: ''
      },
      totppwstable: [{
        customer: '',
        project: '',
        totp_pass: '',
        totp_version: '',
        totp_type: '',
        timestamp: ''
      }

      ],
      esdeskid: "",
      restaurants: [],

      totpdata: {
        issue: '',
        auditor: '',

        cseid: '',
        customer: '',
        project: '',
        reason: '',

      },
      totp_version: 'V5',
      totp_type: 'roller',
      Dynamicpwd: '',
      workerId: store.state.user.token,
      timeout: null,
      dialogFormVisibletotp: false,
      list1: [],
      filldatetime: '',
      childid: '',
      estotp: '',
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
          totppwd: '123131'
        },
      ],
      innerVisible: false,
      Visible: false,
      dialogFormVisible: false,
      form: {},

      formLabelWidth: '120px',
    }
  },
  created() {
    this.search()
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
    async getesdeskinfos(rs) {
      // console.log("sss", rs)
      axios({
        method: 'get',
        url: '/esdesk/',
        params: {
          esdeskid: rs,
          // test: this.workerId
        },
      })

        .then((response) => {
          // console.log(response)
          this.totpdata = response.data
          // this.tableData.totp_type = this.tableData.totp_type,
          // this.tableData.totp_version = this.tableData.totp_version
          return this.totpdata.issue = rs
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // getesdeskinfo(rs) {
    //   return this.esdeskid = rs
    // },
    sss() { },
    showdialog() {
      this.Visible = true
    },
    receive() {
      this.Visible = false
    },
    // async getesdeskid(rows) {
    //   this.childid = rows
    //   console.log("rows", rows)
    // },



    posttempo(esdeskid) {
      // let resdata = []
      // console.log(esdeskid)
      axios({
        url: '/filltompe/',
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
    posttotp() {
      // let resdata = []
      // console.log(esdeskid)
      axios({
        url: '/estotp/',
        method: 'post',
        data: {
          jiraemail: this.info.jiraemail,
          Dynamicpwd: this.Dynamicpwd,
          datas: this.totpdata,
          totp_version: this.totp_version,
          totp_type: this.totp_type,
        },

        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log(response)
          if (response.data === '未认证') {
            console.log("response", response)
            alert(response.data, "重新输入动态密码")
            // this.dialogFormVisible = !this.dialogFormVisible
          }
          else if (response.data === 401) {
            console.log("401", response.data)
            // this.dialogFormVisible = !this.dialogFormVisible
            alert("认证失败")
          }

          else {
            console.log("200", response.data)
            // console.log(response.data.totp_pass)

            // this.dialogFormVisibletotp = !this.dialogFormVisibletotp
            // alert("填写完成")
            this.totppwstable[0] = response.data
            // console.log(this.totppwstable)
            this.innerVisible = true


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
      this.GetJirauserInfo()
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
        .get('/usercase/', {
          params: { userid: this.workerId },
        })
        .then((response) => (this.tableData = response.data))
        .catch((err) => {
          console.log(err)
        })
    },
    GetJirauserInfo() {
      axios
        .get('/jirauser', {
          params: { jiraid: this.workerId },
        })
        .then((response) => {
          // console.log(response.data)

          this.info = response.data
        })
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