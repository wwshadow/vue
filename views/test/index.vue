<template>
  <div>
    <el-input class="input" v-model.trim="searchInput" placeholder="cse-1589"
      @keyup.enter.native="getCseInfo(),getCseChildInfo()"></el-input>
    <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect">
    </el-autocomplete>
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
            <p>上次登录地点：<span>bj </span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px; height: 500px;">

          <el-table max-height="400" :data="tableData" :default-sort="{prop: 'createdata', order: 'descending'}">
            <!-- <el-table-column v-for="(val,key) in tableLable" :key="key" :prop="key" :label="val"></el-table-column> -->
            <el-table-column fixed prop="createdata" label="创建日期" width="150" sortable>
            </el-table-column>
            <el-table-column prop="issueid" label="ESDESK-id" width="150">
            </el-table-column>
            <el-table-column prop="issuetype" label="类型" width="150">
            </el-table-column>
            <el-table-column prop="issuestatus" label="case状态" width="120">
            </el-table-column>
            <!-- <el-table-column prop="address" label="地址" width="300">
            </el-table-column>
            <el-table-column prop="zip" label="邮编" width="120">
            </el-table-column> -->
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="15" style="margin-top: 20px">
        <div class="num">
          <el-card v-for="item in caseTypeData" :key="item.type" :body-style="{display: 'flex',padding: 0}">
            <i class="icon" :class="['el-icon-cpu']" :style="{background: '#ffb980'}"></i>
            <!-- <i class="icon" :class="item.icon" :style="{background: item.color}"></i> -->
            <div class="detail">
              <p class="num">{{item.value}}</p>
              <p class="txt">{{item.type}}</p>
            </div>
          </el-card>
        </div>
        <el-card>
          <!-- 展示每月case量 还没做接口 -->
          <!-- <e-chart :chartData="echartData.mouth" style="height:200px" /> -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'CseInfo',
  data() {
    return {
      usrimg: require('../../src/assets/images/OIP-C.jpg'),
      info: {},
      restaurants: [],
      state: '',
      timeout: null,
      testdata: [
        'CSE-3733',
        'CSE-3731',
        'CSE-3729',
        'CSE-3727',
        'CSE-3725',
        'CSE-3723',
        'CSE-3721',
        'CSE-3719',
        'CSE-3717',
        'CSE-3715',
        'CSE-3713',
        'CSE-3711',
        'CSE-3709',
        'CSE-3707',
        'CSE-3705',
        'CSE-3703',
        'CSE-3701',
        'CSE-3699',
        'CSE-3697',
        'CSE-3695',
        'CSE-3693',
        'CSE-3691',
        'CSE-3689',
        'CSE-3687',
        'CSE-3685',
        'CSE-3683',
        'CSE-3681',
        'CSE-3679',
        'CSE-3677',
        'CSE-3675',
        'CSE-3673',
        'CSE-3671',
        'CSE-3669',
        'CSE-3667',
        'CSE-3663',
        'CSE-3661',
        'CSE-3659',
        'CSE-3657',
        'CSE-3655',
        'CSE-3653',
        'CSE-3651',
        'CSE-3649',
        'CSE-3647',
        'CSE-3645',
        'CSE-3643',
        'CSE-3641',
        'CSE-3639',
        'CSE-3637',
        'CSE-3635',
        'CSE-3633',
        'CSE-3631',
        'CSE-3629',
        'CSE-3627',
        'CSE-3625',
        'CSE-3623',
        'CSE-3621',
        'CSE-3619',
        'CSE-3617',
        'CSE-3615',
        'CSE-3613',
        'CSE-3611',
        'CSE-3609',
        'CSE-3607',
        'CSE-3605',
        'CSE-3603',
        'CSE-3601',
        'CSE-3599',
        'CSE-3597',
        'CSE-3595',
        'CSE-3593',
        'CSE-3589',
        'CSE-3587',
        'CSE-3583',
        'CSE-3579',
        'CSE-3577',
        'CSE-3575',
        'CSE-3573',
        'CSE-3571',
        'CSE-3567',
        'CSE-3561',
        'CSE-3559',
        'CSE-3554',
        'CSE-3550',
        'CSE-3548',
        'CSE-3546',
        'CSE-3540',
        'CSE-3534',
        'CSE-3530',
        'CSE-3528',
        'CSE-3526',
        'CSE-3524',
        'CSE-3522',
        'CSE-3518',
        'CSE-3516',
        'CSE-3514',
        'CSE-3512',
        'CSE-3508',
        'CSE-3506',
        'CSE-3500',
        'CSE-3498',
        'CSE-3496',
        'CSE-3494',
        'CSE-3492',
        'CSE-3482',
        'CSE-3480',
        'CSE-3478',
        'CSE-3476',
        'CSE-3474',
        'CSE-3472',
        'CSE-3468',
        'CSE-3464',
        'CSE-3462',
        'CSE-3460',
        'CSE-3458',
        'CSE-3452',
        'CSE-3450',
        'CSE-3446',
        'CSE-3444',
        'CSE-3442',
        'CSE-3440',
        'CSE-3438',
        'CSE-3436',
        'CSE-3434',
        'CSE-3432',
        'CSE-3430',
        'CSE-3424',
        'CSE-3422',
        'CSE-3418',
        'CSE-3416',
        'CSE-3414',
        'CSE-3408',
        'CSE-3406',
        'CSE-3398',
        'CSE-3396',
        'CSE-3394',
        'CSE-3390',
        'CSE-3380',
        'CSE-3378',
        'CSE-3374',
        'CSE-3370',
        'CSE-3366',
        'CSE-3364',
        'CSE-3362',
        'CSE-3360',
        'CSE-3356',
        'CSE-3354',
        'CSE-3352',
        'CSE-3350',
        'CSE-3346',
        'CSE-3342',
        'CSE-3338',
        'CSE-3336',
        'CSE-3328',
        'CSE-3326',
        'CSE-3318',
        'CSE-3314',
        'CSE-3312',
        'CSE-3308',
        'CSE-3306',
        'CSE-3296',
        'CSE-3294',
        'CSE-3290',
        'CSE-3274',
        'CSE-3268',
        'CSE-3266',
        'CSE-3264',
        'CSE-3251',
        'CSE-3247',
        'CSE-3245',
        'CSE-3243',
        'CSE-3241',
        'CSE-3239',
        'CSE-3231',
        'CSE-3220',
        'CSE-3218',
        'CSE-3215',
        'CSE-3213',
        'CSE-3209',
        'CSE-3208',
        'CSE-3206',
        'CSE-3197',
        'CSE-3193',
        'CSE-3191',
        'CSE-3187',
        'CSE-3181',
        'CSE-3180',
        'CSE-3179',
        'CSE-3175',
        'CSE-3173',
        'CSE-3169',
        'CSE-3167',
        'CSE-3157',
        'CSE-3129',
        'CSE-3121',
        'CSE-3119',
        'CSE-3115',
        'CSE-3109',
        'CSE-3107',
        'CSE-3103',
        'CSE-3099',
        'CSE-3093',
        'CSE-3091',
        'CSE-3089',
        'CSE-3086',
        'CSE-3084',
        'CSE-3076',
        'CSE-3074',
        'CSE-3072',
        'CSE-3070',
        'CSE-3068',
        'CSE-3066',
        'CSE-3064',
        'CSE-3062',
        'CSE-3056',
        'CSE-3046',
        'CSE-3044',
        'CSE-3042',
        'CSE-3038',
        'CSE-3032',
        'CSE-3030',
        'CSE-3026',
        'CSE-3020',
        'CSE-3012',
        'CSE-3008',
        'CSE-3006',
        'CSE-3002',
        'CSE-3000',
        'CSE-2998',
        'CSE-2994',
        'CSE-2992',
        'CSE-2979',
        'CSE-2975',
        'CSE-2973',
        'CSE-2969',
        'CSE-2963',
        'CSE-2953',
        'CSE-2949',
        'CSE-2929',
        'CSE-2917',
        'CSE-2915',
        'CSE-2913',
        'CSE-2909',
        'CSE-2907',
        'CSE-2901',
        'CSE-2897',
        'CSE-2895',
        'CSE-2893',
        'CSE-2891',
        'CSE-2889',
        'CSE-2887',
        'CSE-2885',
        'CSE-2883',
        'CSE-2881',
        'CSE-2879',
        'CSE-2861',
        'CSE-2855',
        'CSE-2847',
        'CSE-2843',
        'CSE-2841',
        'CSE-2835',
        'CSE-2823',
        'CSE-2813',
        'CSE-2811',
        'CSE-2801',
        'CSE-2799',
        'CSE-2797',
        'CSE-2793',
        'CSE-2787',
        'CSE-2785',
        'CSE-2767',
        'CSE-2753',
        'CSE-2743',
        'CSE-2729',
        'CSE-2723',
        'CSE-2707',
        'CSE-2697',
        'CSE-2695',
        'CSE-2687',
        'CSE-2667',
        'CSE-2665',
        'CSE-2653',
        'CSE-2651',
        'CSE-2643',
        'CSE-2639',
        'CSE-2633',
        'CSE-2628',
        'CSE-2624',
        'CSE-2620',
        'CSE-2616',
        'CSE-2608',
        'CSE-2606',
        'CSE-2598',
        'CSE-2592',
        'CSE-2590',
        'CSE-2588',
        'CSE-2584',
        'CSE-2580',
        'CSE-2578',
        'CSE-2574',
        'CSE-2570',
        'CSE-2568',
        'CSE-2560',
        'CSE-2554',
        'CSE-2550',
        'CSE-2548',
        'CSE-2540',
        'CSE-2534',
        'CSE-2532',
        'CSE-2522',
        'CSE-2506',
        'CSE-2504',
        'CSE-2502',
        'CSE-2500',
        'CSE-2496',
        'CSE-2492',
        'CSE-2490',
        'CSE-2488',
        'CSE-2486',
        'CSE-2476',
        'CSE-2470',
        'CSE-2454',
        'CSE-2452',
        'CSE-2438',
        'CSE-2436',
        'CSE-2432',
        'CSE-2428',
        'CSE-2426',
        'CSE-2420',
        'CSE-2413',
        'CSE-2407',
        'CSE-2401',
        'CSE-2399',
        'CSE-2395',
        'CSE-2381',
        'CSE-2377',
        'CSE-2373',
        'CSE-2367',
        'CSE-2365',
        'CSE-2357',
        'CSE-2355',
        'CSE-2353',
        'CSE-2349',
        'CSE-2347',
        'CSE-2325',
        'CSE-2323',
        'CSE-2319',
        'CSE-2313',
        'CSE-2311',
        'CSE-2303',
        'CSE-2276',
        'CSE-2258',
        'CSE-2250',
        'CSE-2244',
        'CSE-2234',
        'CSE-2226',
        'CSE-2224',
        'CSE-2222',
        'CSE-2218',
        'CSE-2214',
        'CSE-2208',
        'CSE-2201',
        'CSE-2191',
        'CSE-2167',
        'CSE-2161',
        'CSE-2159',
        'CSE-2149',
        'CSE-2135',
        'CSE-2129',
        'CSE-2117',
        'CSE-2113',
        'CSE-2108',
        'CSE-2106',
        'CSE-2104',
        'CSE-2099',
        'CSE-2087',
        'CSE-2081',
        'CSE-2074',
        'CSE-2066',
        'CSE-2062',
        'CSE-2060',
        'CSE-2050',
        'CSE-2036',
        'CSE-2034',
        'CSE-2026',
        'CSE-2022',
        'CSE-2020',
        'CSE-2012',
        'CSE-1998',
        'CSE-1992',
        'CSE-1990',
        'CSE-1988',
        'CSE-1986',
        'CSE-1984',
        'CSE-1982',
        'CSE-1944',
        'CSE-1896',
        'CSE-1893',
        'CSE-1865',
        'CSE-1849',
        'CSE-1847',
        'CSE-1841',
        'CSE-1824',
        'CSE-1821',
        'CSE-1818',
        'CSE-1816',
        'CSE-1814',
        'CSE-1778',
        'CSE-1770',
        'CSE-1766',
        'CSE-1759',
        'CSE-1747',
        'CSE-1729',
        'CSE-1715',
        'CSE-1713',
        'CSE-1631',
        'CSE-1629',
        'CSE-1607',
        'CSE-1603',
        'CSE-1599',
        'CSE-1597',
        'CSE-1595',
        'CSE-1593',
        'CSE-1589',
        'CSE-1587',
        'CSE-1581',
        'CSE-1527',
        'CSE-1525',
        'CSE-1523',
        'CSE-1516',
        'CSE-1515',
        'CSE-1513',
        'CSE-1502',
        'CSE-1500',
        'CSE-1499',
        'CSE-1494',
        'CSE-1474',
        'CSE-1472',
        'CSE-1454',
        'CSE-1452',
        'CSE-1448',
        'CSE-1432',
        'CSE-1416',
        'CSE-1400',
        'CSE-1353',
        'CSE-1325',
        'CSE-1319',
        'CSE-1303',
        'CSE-1288',
        'CSE-1284',
        'CSE-1265',
        'CSE-1253',
        'CSE-1243',
        'CSE-1196',
        'CSE-1192',
        'CSE-1190',
        'CSE-1186',
        'CSE-1178',
        'CSE-1176',
        'CSE-1170',
        'CSE-1168',
        'CSE-1151',
        'CSE-1141',
        'CSE-1104',
        'CSE-1086',
        'CSE-1080',
        'CSE-1062',
        'CSE-1060',
        'CSE-1045',
        'CSE-1043',
        'CSE-1042',
        'CSE-1030',
        'CSE-1028',
        'CSE-1026',
        'CSE-1024',
        'CSE-1022',
        'CSE-1018',
        'CSE-1016',
        'CSE-1012',
        'CSE-1010',
        'CSE-1008',
        'CSE-1006',
        'CSE-1004',
        'CSE-1002',
        'CSE-1000',
        'CSE-998',
        'CSE-994',
        'CSE-992',
        'CSE-990',
        'CSE-988',
        'CSE-986',
        'CSE-984',
        'CSE-982',
        'CSE-980',
        'CSE-978',
        'CSE-976',
        'CSE-974',
        'CSE-972',
        'CSE-970',
        'CSE-968',
        'CSE-966',
        'CSE-960',
        'CSE-956',
        'CSE-954',
        'CSE-948',
        'CSE-946',
        'CSE-944',
        'CSE-938',
        'CSE-928',
        'CSE-921',
        'CSE-900',
        'CSE-889',
        'CSE-879',
        'CSE-860',
        'CSE-858',
        'CSE-856',
        'CSE-852',
        'CSE-846',
        'CSE-844',
        'CSE-842',
        'CSE-840',
        'CSE-838',
        'CSE-834',
        'CSE-826',
        'CSE-824',
        'CSE-818',
        'CSE-816',
        'CSE-814',
        'CSE-812',
        'CSE-810',
        'CSE-806',
        'CSE-802',
        'CSE-788',
        'CSE-786',
        'CSE-784',
        'CSE-782',
        'CSE-780',
        'CSE-778',
        'CSE-776',
        'CSE-774',
        'CSE-770',
        'CSE-766',
        'CSE-756',
        'CSE-752',
        'CSE-744',
        'CSE-738',
        'CSE-736',
        'CSE-730',
        'CSE-706',
        'CSE-704',
        'CSE-696',
        'CSE-694',
        'CSE-678',
        'CSE-676',
        'CSE-674',
        'CSE-666',
        'CSE-664',
        'CSE-660',
        'CSE-650',
        'CSE-648',
        'CSE-646',
        'CSE-644',
        'CSE-628',
        'CSE-624',
        'CSE-620',
        'CSE-618',
        'CSE-614',
        'CSE-612',
        'CSE-610',
        'CSE-608',
        'CSE-606',
        'CSE-604',
        'CSE-600',
        'CSE-596',
        'CSE-353',
        'CSE-347',
        'CSE-344',
        'CSE-330',
        'CSE-316',
        'CSE-280',
        'CSE-278',
        'CSE-276',
        'CSE-274',
        'CSE-270',
        'CSE-264',
        'CSE-256',
        'CSE-254',
        'CSE-203',
        'CSE-198',
        'CSE-182',
        'CSE-181',
        'CSE-180',
        'CSE-147',
        'CSE-87',
        'CSE-86',
        'CSE-75',
        'CSE-73',
        'CSE-70',
        'CSE-69',
        'CSE-68',
      ],
      searchInput: 'cse-1589',
      tableData: [
        {
          createdata: '',
          issueid: '',
          issuetype: '',
          issuestatus: '',
        },
      ],
      caseTypeData: {
        type: 'test',
        value: '100',
      },
      iconData: ['el-icon-cpu'],
    }
  },
  props: {
    msg: String,
  },
  // mounted() {
  //   this.restaurants = this.loadAll()
  // },
  methods: {
    // loadAll(callback) {
    //   var list = [{}]

    //   axios
    //     .get('/jirainfo/csetotal')
    //     .then((response) => {
    //       for (let i of response.data) {
    //         i.value = i
    //       }
    //       list = response.data
    //       callback(list)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants
      axios
        .get('/jirainfo/csetotal')
        .then((response) => {
          for (let i of response.data) {
            i.value = i
          }
          this.results = response.data.map((item) => {
            return { name: item }
          })
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 50000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      console.log(item)
    },
    search() {
      this.getCseInfo(), this.getCseChildInfo(), this.getCseChildType()
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
        .then(
          (response) => (
            (this.tableData = response.data), console.log(response)
          )
        )
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
        .then(
          (response) => (
            (this.caseTypeData = response.data), console.log(response)
          )
        )
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
<style lang="less" scoped>
// .user {
//   height: 150px;
//   width: 200px;
//   border-radius: 50%;
// }
.input {
  margin-top: 20px;
  width: 100px;
}
</style>