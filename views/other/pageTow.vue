<template>
  <div style="margin-top: 20px">

    <div class="demo-input-suffix">
      <el-switch style="display: block" v-model="is_autofill" active-color="#ff494" inactive-color="#13ce66"
        active-text="自动填写当周工时(还没做)" inactive-text="手动填写当前esdesk工时">
      </el-switch>
      用户名：
      <!-- <el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input1">
      </el-input> -->
      <el-input style="margin-top: 20px" placeholder="请输入用户邮件" prefix-icon="el-icon-search" v-model="user_emeil">
        <template slot="append">.com</template>
        <!-- 根据邮箱带出用户id 还没有做 -->
      </el-input>
      <el-input placeholder="请输入用户id" v-model="workerId">

      </el-input>
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入tompe Authorization"
        v-model="Authorization">
      </el-input>
      <el-input placeholder="工时" v-model="tompetime">
        <!-- <template slot="append">.com</template> -->
      </el-input>
      <el-input placeholder="esdeskid" v-model="esdeskid">
        <!-- <template slot="append">.com</template> -->
      </el-input>
      <!-- <el-input placeholder="工时填写时间" v-model="input2"> -->
      <!-- <template slot="append">.com</template> -->
      <!-- </el-input> -->
      <!-- <el-input placeholder="创建前后时间选择填写时间" v-model="input2">
        <template slot="append">.com</template>
      </el-input> -->
      <el-button type="primary" icon="el-icon-success" v-on:click="posttempo">确认</el-button>
      <el-button type="primary" icon="el-icon-delete">取消</el-button>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  name: 'pageTow',
  data() {
    return {
      user_emeil: '',
      is_autofill: false,
      tompetime: '70',
      esdeskid: 'ECSDESK-19162',
      Authorization: '',
      workerId: '5f812189287870006a5c85b4',
    }
  },
  methods: {
    posttempo() {
      // let resdata = []
      axios({
        url: '/jirainfo/filltompe/',
        method: 'post',
        data: {
          is_autofill: this.is_autofill,
          tompetime: this.tompetime,
          esdeskid: this.esdeskid,
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
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>