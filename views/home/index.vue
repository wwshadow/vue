<template>
  <div>
    <el-carousel trigger="click" style="margin-top: 20px">
      <el-carousel-item v-for="item in 3" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-card shadow="hover" style="margin-top: 20px">
      <span>
        <div style="width: 50%">当月ecs情况
          <el-button style="margin-left: 10px;" type="primary" v-on:click="getEcsByMonthInfo">
            <i class="el-icon-upload">更新</i>
          </el-button>
        </div>

      </span>

      <el-col :span="22" style="margin-top: 20px">
        <el-table :data="tableData" border style="width: 100%" height="440">
          <el-table-column prop="ecsid" label="ecsID" width="180">
            <template slot-scope="scope">
              <el-link type="primary" :href="'https://easystack.atlassian.net/browse/' + scope.row.ecsid"
                target="_blank">
                {{ scope.row.ecsid }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="describe" label="ecs描述" width="180">
          </el-table-column>
          <el-table-column prop="status" label="ecs状态" width="180">
          </el-table-column>
          <el-table-column prop="createdate" label="创建时间" width="180">
          </el-table-column>
          <el-table-column prop="creator" label="创建者" width="180">
          </el-table-column>
          <el-table-column prop="assignee" label="经办人" width="180">
          </el-table-column>
          <el-table-column prop="priority" label="优先级" width="180">
          </el-table-column>
          <el-table-column prop="version" label="当前版本" width="180">
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" small
          :current-page.sync="currentPage" layout="total, prev, pager, next, jumper" :page-size="pageSize"
          :pager-count="7" :total="total">
        </el-pagination>
      </el-col>
    </el-card>
    <el-dialog title="jirausrinfo" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="jira 邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.jiraemail" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="jira key" :label-width="formLabelWidth">
          <el-input v-model="form.jirakey" autocomplete="on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatejirausr()">确 定</el-button>
      </div>
    </el-dialog>
  </div>







</template>
<script>
// import { getData } from '../../api/data.js'
// import * as echarts from 'echarts'
import axios from 'axios'
// import { Loading } from 'element-ui';
// import EChart from '../../src/components/ECharts.vue'
export default {
  // components: { EChart },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'home',
  data() {
    return {
      ss: "",
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 3,// 每页的数据条数
      totalNum: 1000,//总页数
      isusrfine: false,//判断用户数据
      dialogFormVisible: false,
      jiraemail: '',
      jirakey: '',
      form: {
        name: '',
        region: '',
        jiraemail: '',
        jirakey: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      tableData: [
        {
          ecsid: '',
          createdate: '',
          creator: '',
          version: '',
          status: '',
          describe: '',
          assignee: '',
          priority: '',
        },
      ],
    }
  },
  created() {
    this.getEcsByMonthInfo()
    // this.open()
    // this.getjirausr()
    // this.getlivestockInfo(1)
  },
  mounted() {
    // this.$http
  },
  methods: {



    // loadings() {
    //   let loadinginstance = Loading.service(options)
    // },

    getjirausr() {
      axios
        .get('/jirausr')
        .then((response) => {
          console.log("usr", response.data)
          if (response.data === "ok") {
            // this.$loading({ fullscreen: false })
            // this.open()

          }
          else {
            // this.$loading({ fullscreen: true })
            this.dialogFormVisible = true
          }
        })
        .catch((err) => {
          // this.alert('err')
          this.loading = false
          alert('请求失败，请检查网络及服务状态！')
          console.log(err)
        })
    },
    updatejirausr() {
      axios({
        url: '/jirausr',
        method: 'post',
        data: {
          jiraemail: this.form.jiraemail,
          jirakey: this.form.jirakey,
        },
        headers: {
          'Content-Type': 'application/json',
        },

      })
        .then((response) => {
          // console.log("默认",response)
          if (response.data === "ok") {
            console.log(response)
            this.dialogFormVisible = false
          }
          else {
            console.log(response)
            alert("输入异常")
            console.log("输入异常", response.data)
          }

        })
        .catch((err) => {
          // this.alert('err')
          // this.loading = false
          alert('输入异常！')
          console.log(err)
        })
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange() {
      // console.log(`每页 ${val} 条`);
      // this.currentPage = 1;
      // this.pageSize = 3;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange() {
      // handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // console.log('ye', this.currentPage)
      // this.currentPage = val;
      this.getlivestockInfo(this.currentPage);

    },
    getlivestockInfo(num1) {
      var that = this;
      // console.log("num1", num1)
      // var params = new URLSearchParams();
      // params.append('page', num1)


      axios.get('/ecsbymonthpage', {
        params: {
          currentPage: num1,
          pageSize: this.pageSize,
        }
      })
        .then(response => {
          // console.log("页码", response.data.data)
          // console.log("totle", response.data)
          this.tableData = response.data.data
          that.currentPage = num1;
          that.total = response.data.total;
          // that.total =  response.data.page_sum;
          // console.log('请求成功, 获取' + that.total + "条数据");
        })
        .catch(error => {  // 请求失败
          console.log('请求失败');
          console.log(error);
        })
    },
    getEcsByMonthInfo() {
      // 查询数据库
      axios
        .get('/ecsbymonth')
        .then((response) => {
          console.log("完整", response.data)
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
  }
}
</script>
<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>