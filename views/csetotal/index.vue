<template>
  <div>

    <el-input placeholder="请输入内容" v-model="selectinfo" style="width: 15%;margin-top: 20px;" class="input-with-select">
      <el-select v-model="selectcse" slot="prepend" placeholder="请选择" style="width: 50%">
        <el-option label="cse Id" value="1"></el-option>
        <el-option label="cse名称" value="2"></el-option>
        <el-option label="客户名称" value="3"></el-option>
      </el-select>

    </el-input>

    <el-button style="margin-left: 10px;" icon="el-icon-search" type="primary" v-on:click="selectcseinfo"></el-button>


    <el-button style="margin-left: 10px;" type="primary" v-on:click="updatejirasql">
      <i class="el-icon-upload"></i>
      更新数据库
    </el-button>

    <el-row class="home" :gutter="20">
      <el-col :span="24" style="margin-top: 20px">
        <el-card shadow="hover">
          <el-table v-loading="loading" element-loading-text="数据拼命加载中" :data="tableData" border style="width: 100%"
            height="700">
            <el-table-column prop="fields.cseid" label="cseID" width="180">
              <template slot-scope="scope">
                <el-link type="primary" :href="'/#/cseinfo/' " target="_blank">
                  {{ scope.row.fields.cseid }}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="fields.csename" label="cse名称" width="180">
            </el-table-column>
            <el-table-column prop="fields.csestatus" label="cse状态" width="180">
            </el-table-column>
            <el-table-column prop="fields.fullname" label="客户组织名称" width="180">
            </el-table-column>
            <el-table-column prop="fields.customername" label="客户名称" width="180">
            </el-table-column>
            <el-table-column prop="fields.projectname" label="项目名称" width="180">
            </el-table-column>
            <el-table-column prop="fields.version" label="当前版本" width="180">
            </el-table-column>
            <el-table-column prop="fields.maintenancedate" label="维保到期时间" width="180">
            </el-table-column>
            <el-table-column prop="fields.environmenttype" label="环境类型">
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
      state: '',
      selectinfo: '',
      selectcse: '',
      tableData: [
        {
          fields: {
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
        },
      ],
      loading: true,
    }
  },

  created() {
    this.getCseChildInfo()
  },
  // mounted() {
  //   this.loadAll2()
  // },
  //   watch(){
  // getCseChildInfo(),
  // deep:true,
  //   },
  props: {},
  methods: {
    selectcseinfo() {
      if (this.selectcse === "1") {
        axios({
          url: '/selectcse/',
          method: 'post',
          data: {
            cseid: this.selectinfo,
          },
          headers: {
            'Content-Type': 'application/json',
          },

        })
          .then((response) => {
            // console.log("默认",response)
            if (response.data.length !== 0) {
              this.tableData = response.data
            }
            else {
              alert("查询异常，没有数据")
              console.log("没有数据", response.data)
            }

          })
          .catch((err) => {
            // this.alert('err')
            // this.loading = false
            alert('查询不存在！')
            console.log(err)
          })
      }

      else if (this.selectcse === "2") {
        axios({
          url: '/selectcse/',
          method: 'post',
          data: {
            csename: this.selectinfo,
          },
          headers: {
            'Content-Type': 'application/json',
          },

        })
          .then((response) => {
            // console.log("默认",response)
            if (response.data.length !== 0) {
              this.tableData = response.data
            }
            else {
              alert("查询异常，没有数据")
              console.log("没有数据", response.data)
            }

          })
          .catch((err) => {
            // this.alert('err')
            // this.loading = false
            alert('查询不存在！')
            console.log(err)
          })
      }
      else if (this.selectcse === "3") {
        axios({
          url: '/selectcse/',
          method: 'post',
          data: {
            customername: this.selectinfo,
          },
          headers: {
            'Content-Type': 'application/json',
          },

        })
          .then((response) => {
            // console.log("默认",response)
            if (response.data.length !== 0) {
              this.tableData = response.data
            }
            else {
              alert("查询异常，没有数据")
              console.log("没有数据", response.data)
            }

          })
          .catch((err) => {
            // this.alert('err')
            // this.loading = false
            alert('查询不存在！')
            console.log(err)
          })
      }
    },
    updatejirasql() {
      // 更新数据库
      axios
        .get('/csetotal')
        .then((response) => {
          console.log(response)
          if (response.data === 'ok') {
            alert('更新完成！')
            this.loading = false
          }
        })
        .catch((err) => {
          // this.alert('err')
          this.loading = false
          alert('更新失败，请检查网络及服务状态！')
          console.log(err)
        })
    },
    getCseChildInfo() {
      // 查询数据库
      axios
        .get('/getcsetotal')
        .then((response) => {
          // console.log(response)
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

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.bbb /deep/ #input1 {
  min-height: 30px;
  margin: 0px;
  width: 250px;
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