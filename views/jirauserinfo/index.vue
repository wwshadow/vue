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
              <p class="name">用户名称：</p><span>{{info.customername}}</span>
              <p class="access">所属部门：</p><span>{{info.projectname}}</span>
              <p class="fullname">邮箱/id：</p><span>{{info.fullname}}</span>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-top: 20px;">
          <div>
            <p>
              最近一个月case情况
            </p>
          </div>
          <el-table max-height="400" :data="tableData" :default-sort="{prop: 'createdata', order: 'descending'}"
            @row-click="sss">
            <el-table-column fixed prop="createdata" label="创建日期" width="100" sortable>
            </el-table-column>
            <el-table-column prop="issueid" label="ESDESK-id" width="150">
              <template slot-scope="scope">
                <el-link type="primary" :href="'https://easystack.atlassian.net/browse/'+scope.row.issueid"
                  target="_blank">
                  {{scope.row.issueid}}</el-link>
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
              // eslint-disable-next-line vue/no-unused-vars
              <template slot-scope="scope">
                <!-- slot-scope="scope" -->
                <!-- <p>姓名: {{ scope.row.name }}</p> -->
                <el-button @click="dialogFormVisible=true" type="primary" icon="el-icon-edit" size="small">
                  填写工时
                </el-button>
                <el-dialog title="工时填写" :visible.sync="dialogFormVisible" :modal=false>

                  <el-form :model="form">
                    <el-form-item label="自动" :label-width="formLabelWidth">
                      <el-switch style="display: block" v-model="is_autofill" active-color="#ff494"
                        inactive-color="#13ce66" active-text="自动填写当周工时(还没做)" inactive-text="手动填写当前esdesk工时">
                      </el-switch>
                    </el-form-item>
                    <el-form-item label="用户id" :label-width="formLabelWidth">
                      <el-input v-model="workerId" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="caseid" :label-width="formLabelWidth">
                      <el-input :value="scope.row.issueid" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="工时" :label-width="formLabelWidth">
                      <el-input v-model="tompetime" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Authorization认证">
                      <el-input type="textarea" v-model="Authorization" autocomplete="on"
                        :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入tompe Authorization"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="posttempo(scope.row.issueid)">确 定</el-button>
                  </div>
                </el-dialog>
                <!-- @click="handleClick(scope.row)" -->
                <!-- <el-button type="text" size="small">编辑</el-button> -->
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
export default {
  name: 'jiraUserInfo',
  data() {
    return {
      usrimg: require('../../src/assets/images/OIP-C.jpg'),
      info: {},
      restaurants: [],
      workerId: '5f812189287870006a5c85b4',
      timeout: null,
      list1: [],
      // esdeskid: '',
      is_autofill: false,
      Authorization: '',
      tompetime: '70',
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
  // props: { esdeskid: '' },
  methods: {
    sss() {},
    posttempo(esdeskid) {
      // let resdata = []
      axios({
        url: '/jirainfo/filltompe/',
        method: 'post',
        data: {
          is_autofill: this.is_autofill,
          tompetime: this.tompetime,
          esdeskid: esdeskid,
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