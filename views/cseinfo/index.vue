<template>
  <div>
    <el-input class="input" v-model.trim="searchInput" placeholder="cse-1589"
      @keyup.enter.native="getCseInfo(),getCseChildInfo()"></el-input>
    <!-- 远程后台搜索功能  待定  可以结合raids -->
    <!-- <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect">
    </el-autocomplete> -->
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
            <!-- <p>上次登录地点：<span>bj </span></p> -->
          </div>
        </el-card>
        <el-card style="margin-top: 20px; height: 500px;">

          <el-table max-height="400" :data="tableData" :default-sort="{prop: 'createdata', order: 'descending'}">
            <!-- <el-table-column v-for="(val,key) in tableLable" :key="key" :prop="key" :label="val"></el-table-column> -->
            <el-table-column fixed prop="createdata" label="创建日期" width="100" sortable>
            </el-table-column>
            <el-table-column prop="issueid" label="ESDESK-id" width="150">
              <template slot-scope="scope">
                <!-- <el-link href="https://baidu.com" target="_blank">{{scope.row.issueid}}</el-link> -->
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
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="15" style="margin-top: 20px">
        <p style="font-size: 22px; margin-bottom: 10px; color: #999999;">当前项目case分类统计:</p>
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
      testdata: [
        { value: 'CSE-3737' },
        { value: 'CSE-3735' },
        { value: 'CSE-3733' },
        { value: 'CSE-3731' },
        { value: 'CSE-3729' },
        { value: 'CSE-3727' },
        { value: 'CSE-3725' },
        { value: 'CSE-3723' },
        { value: 'CSE-3721' },
        { value: 'CSE-3719' },
        { value: 'CSE-3717' },
        { value: 'CSE-3715' },
        { value: 'CSE-3713' },
        { value: 'CSE-3711' },
        { value: 'CSE-3709' },
        { value: 'CSE-3707' },
        { value: 'CSE-3705' },
        { value: 'CSE-3703' },
        { value: 'CSE-3701' },
        { value: 'CSE-3699' },
        { value: 'CSE-3697' },
        { value: 'CSE-3695' },
        { value: 'CSE-3693' },
        { value: 'CSE-3691' },
        { value: 'CSE-3689' },
        { value: 'CSE-3687' },
        { value: 'CSE-3685' },
        { value: 'CSE-3683' },
        { value: 'CSE-3681' },
        { value: 'CSE-3679' },
        { value: 'CSE-3677' },
        { value: 'CSE-3675' },
        { value: 'CSE-3673' },
        { value: 'CSE-3671' },
        { value: 'CSE-3669' },
        { value: 'CSE-3667' },
        { value: 'CSE-3663' },
        { value: 'CSE-3661' },
        { value: 'CSE-3659' },
        { value: 'CSE-3657' },
        { value: 'CSE-3655' },
        { value: 'CSE-3653' },
        { value: 'CSE-3651' },
        { value: 'CSE-3649' },
        { value: 'CSE-3647' },
        { value: 'CSE-3645' },
        { value: 'CSE-3643' },
        { value: 'CSE-3641' },
        { value: 'CSE-3639' },
        { value: 'CSE-3637' },
        { value: 'CSE-3635' },
        { value: 'CSE-3633' },
        { value: 'CSE-3631' },
        { value: 'CSE-3629' },
        { value: 'CSE-3627' },
        { value: 'CSE-3625' },
        { value: 'CSE-3623' },
        { value: 'CSE-3621' },
        { value: 'CSE-3619' },
        { value: 'CSE-3617' },
        { value: 'CSE-3615' },
        { value: 'CSE-3613' },
        { value: 'CSE-3611' },
        { value: 'CSE-3609' },
        { value: 'CSE-3607' },
        { value: 'CSE-3605' },
        { value: 'CSE-3603' },
        { value: 'CSE-3601' },
        { value: 'CSE-3599' },
        { value: 'CSE-3597' },
        { value: 'CSE-3595' },
        { value: 'CSE-3593' },
        { value: 'CSE-3589' },
        { value: 'CSE-3587' },
        { value: 'CSE-3583' },
        { value: 'CSE-3579' },
        { value: 'CSE-3577' },
        { value: 'CSE-3575' },
        { value: 'CSE-3573' },
        { value: 'CSE-3571' },
        { value: 'CSE-3567' },
        { value: 'CSE-3561' },
        { value: 'CSE-3559' },
        { value: 'CSE-3554' },
        { value: 'CSE-3550' },
        { value: 'CSE-3548' },
        { value: 'CSE-3546' },
        { value: 'CSE-3540' },
        { value: 'CSE-3534' },
        { value: 'CSE-3530' },
        { value: 'CSE-3528' },
        { value: 'CSE-3526' },
        { value: 'CSE-3524' },
        { value: 'CSE-3522' },
        { value: 'CSE-3518' },
        { value: 'CSE-3514' },
        { value: 'CSE-3512' },
        { value: 'CSE-3508' },
        { value: 'CSE-3506' },
        { value: 'CSE-3500' },
        { value: 'CSE-3498' },
        { value: 'CSE-3496' },
        { value: 'CSE-3494' },
        { value: 'CSE-3492' },
        { value: 'CSE-3482' },
        { value: 'CSE-3480' },
        { value: 'CSE-3478' },
        { value: 'CSE-3476' },
        { value: 'CSE-3474' },
        { value: 'CSE-3472' },
        { value: 'CSE-3468' },
        { value: 'CSE-3464' },
        { value: 'CSE-3462' },
        { value: 'CSE-3460' },
        { value: 'CSE-3458' },
        { value: 'CSE-3452' },
        { value: 'CSE-3450' },
        { value: 'CSE-3446' },
        { value: 'CSE-3444' },
        { value: 'CSE-3442' },
        { value: 'CSE-3440' },
        { value: 'CSE-3438' },
        { value: 'CSE-3436' },
        { value: 'CSE-3434' },
        { value: 'CSE-3432' },
        { value: 'CSE-3430' },
        { value: 'CSE-3424' },
        { value: 'CSE-3422' },
        { value: 'CSE-3418' },
        { value: 'CSE-3416' },
        { value: 'CSE-3414' },
        { value: 'CSE-3408' },
        { value: 'CSE-3406' },
        { value: 'CSE-3398' },
        { value: 'CSE-3396' },
        { value: 'CSE-3394' },
        { value: 'CSE-3390' },
        { value: 'CSE-3380' },
        { value: 'CSE-3378' },
        { value: 'CSE-3374' },
        { value: 'CSE-3370' },
        { value: 'CSE-3366' },
        { value: 'CSE-3364' },
        { value: 'CSE-3362' },
        { value: 'CSE-3360' },
        { value: 'CSE-3356' },
        { value: 'CSE-3354' },
        { value: 'CSE-3352' },
        { value: 'CSE-3350' },
        { value: 'CSE-3346' },
        { value: 'CSE-3342' },
        { value: 'CSE-3338' },
        { value: 'CSE-3336' },
        { value: 'CSE-3328' },
        { value: 'CSE-3326' },
        { value: 'CSE-3318' },
        { value: 'CSE-3314' },
        { value: 'CSE-3312' },
        { value: 'CSE-3308' },
        { value: 'CSE-3306' },
        { value: 'CSE-3296' },
        { value: 'CSE-3294' },
        { value: 'CSE-3290' },
        { value: 'CSE-3274' },
        { value: 'CSE-3268' },
        { value: 'CSE-3266' },
        { value: 'CSE-3264' },
        { value: 'CSE-3251' },
        { value: 'CSE-3247' },
        { value: 'CSE-3245' },
        { value: 'CSE-3243' },
        { value: 'CSE-3241' },
        { value: 'CSE-3239' },
        { value: 'CSE-3231' },
        { value: 'CSE-3220' },
        { value: 'CSE-3218' },
        { value: 'CSE-3215' },
        { value: 'CSE-3213' },
        { value: 'CSE-3209' },
        { value: 'CSE-3208' },
        { value: 'CSE-3206' },
        { value: 'CSE-3197' },
        { value: 'CSE-3193' },
        { value: 'CSE-3191' },
        { value: 'CSE-3187' },
        { value: 'CSE-3181' },
        { value: 'CSE-3180' },
        { value: 'CSE-3179' },
        { value: 'CSE-3175' },
        { value: 'CSE-3173' },
        { value: 'CSE-3169' },
        { value: 'CSE-3167' },
        { value: 'CSE-3157' },
        { value: 'CSE-3129' },
        { value: 'CSE-3121' },
        { value: 'CSE-3119' },
        { value: 'CSE-3115' },
        { value: 'CSE-3109' },
        { value: 'CSE-3107' },
        { value: 'CSE-3103' },
        { value: 'CSE-3099' },
        { value: 'CSE-3093' },
        { value: 'CSE-3091' },
        { value: 'CSE-3089' },
        { value: 'CSE-3086' },
        { value: 'CSE-3084' },
        { value: 'CSE-3076' },
        { value: 'CSE-3074' },
        { value: 'CSE-3072' },
        { value: 'CSE-3070' },
        { value: 'CSE-3068' },
        { value: 'CSE-3066' },
        { value: 'CSE-3064' },
        { value: 'CSE-3062' },
        { value: 'CSE-3056' },
        { value: 'CSE-3046' },
        { value: 'CSE-3044' },
        { value: 'CSE-3042' },
        { value: 'CSE-3038' },
        { value: 'CSE-3032' },
        { value: 'CSE-3030' },
        { value: 'CSE-3026' },
        { value: 'CSE-3020' },
        { value: 'CSE-3012' },
        { value: 'CSE-3008' },
        { value: 'CSE-3006' },
        { value: 'CSE-3002' },
        { value: 'CSE-3000' },
        { value: 'CSE-2998' },
        { value: 'CSE-2994' },
        { value: 'CSE-2992' },
        { value: 'CSE-2979' },
        { value: 'CSE-2975' },
        { value: 'CSE-2973' },
        { value: 'CSE-2969' },
        { value: 'CSE-2963' },
        { value: 'CSE-2953' },
        { value: 'CSE-2949' },
        { value: 'CSE-2929' },
        { value: 'CSE-2917' },
        { value: 'CSE-2915' },
        { value: 'CSE-2913' },
        { value: 'CSE-2909' },
        { value: 'CSE-2907' },
        { value: 'CSE-2901' },
        { value: 'CSE-2897' },
        { value: 'CSE-2895' },
        { value: 'CSE-2893' },
        { value: 'CSE-2891' },
        { value: 'CSE-2889' },
        { value: 'CSE-2887' },
        { value: 'CSE-2885' },
        { value: 'CSE-2883' },
        { value: 'CSE-2881' },
        { value: 'CSE-2879' },
        { value: 'CSE-2861' },
        { value: 'CSE-2855' },
        { value: 'CSE-2847' },
        { value: 'CSE-2843' },
        { value: 'CSE-2841' },
        { value: 'CSE-2835' },
        { value: 'CSE-2823' },
        { value: 'CSE-2813' },
        { value: 'CSE-2811' },
        { value: 'CSE-2801' },
        { value: 'CSE-2799' },
        { value: 'CSE-2797' },
        { value: 'CSE-2793' },
        { value: 'CSE-2787' },
        { value: 'CSE-2767' },
        { value: 'CSE-2753' },
        { value: 'CSE-2743' },
        { value: 'CSE-2729' },
        { value: 'CSE-2723' },
        { value: 'CSE-2707' },
        { value: 'CSE-2697' },
        { value: 'CSE-2695' },
        { value: 'CSE-2687' },
        { value: 'CSE-2667' },
        { value: 'CSE-2665' },
        { value: 'CSE-2653' },
        { value: 'CSE-2651' },
        { value: 'CSE-2643' },
        { value: 'CSE-2639' },
        { value: 'CSE-2633' },
        { value: 'CSE-2628' },
        { value: 'CSE-2624' },
        { value: 'CSE-2620' },
        { value: 'CSE-2616' },
        { value: 'CSE-2608' },
        { value: 'CSE-2606' },
        { value: 'CSE-2598' },
        { value: 'CSE-2592' },
        { value: 'CSE-2590' },
        { value: 'CSE-2588' },
        { value: 'CSE-2584' },
        { value: 'CSE-2580' },
        { value: 'CSE-2578' },
        { value: 'CSE-2574' },
        { value: 'CSE-2570' },
        { value: 'CSE-2568' },
        { value: 'CSE-2560' },
        { value: 'CSE-2554' },
        { value: 'CSE-2550' },
        { value: 'CSE-2548' },
        { value: 'CSE-2540' },
        { value: 'CSE-2534' },
        { value: 'CSE-2532' },
        { value: 'CSE-2522' },
        { value: 'CSE-2506' },
        { value: 'CSE-2504' },
        { value: 'CSE-2502' },
        { value: 'CSE-2500' },
        { value: 'CSE-2496' },
        { value: 'CSE-2492' },
        { value: 'CSE-2490' },
        { value: 'CSE-2488' },
        { value: 'CSE-2486' },
        { value: 'CSE-2476' },
        { value: 'CSE-2470' },
        { value: 'CSE-2454' },
        { value: 'CSE-2452' },
        { value: 'CSE-2438' },
        { value: 'CSE-2436' },
        { value: 'CSE-2432' },
        { value: 'CSE-2428' },
        { value: 'CSE-2426' },
        { value: 'CSE-2420' },
        { value: 'CSE-2413' },
        { value: 'CSE-2407' },
        { value: 'CSE-2401' },
        { value: 'CSE-2399' },
        { value: 'CSE-2395' },
        { value: 'CSE-2381' },
        { value: 'CSE-2377' },
        { value: 'CSE-2373' },
        { value: 'CSE-2367' },
        { value: 'CSE-2365' },
        { value: 'CSE-2357' },
        { value: 'CSE-2355' },
        { value: 'CSE-2353' },
        { value: 'CSE-2349' },
        { value: 'CSE-2347' },
        { value: 'CSE-2325' },
        { value: 'CSE-2323' },
        { value: 'CSE-2319' },
        { value: 'CSE-2313' },
        { value: 'CSE-2311' },
        { value: 'CSE-2303' },
        { value: 'CSE-2276' },
        { value: 'CSE-2258' },
        { value: 'CSE-2250' },
        { value: 'CSE-2244' },
        { value: 'CSE-2234' },
        { value: 'CSE-2226' },
        { value: 'CSE-2224' },
        { value: 'CSE-2222' },
        { value: 'CSE-2218' },
        { value: 'CSE-2214' },
        { value: 'CSE-2208' },
        { value: 'CSE-2201' },
        { value: 'CSE-2191' },
        { value: 'CSE-2167' },
        { value: 'CSE-2161' },
        { value: 'CSE-2159' },
        { value: 'CSE-2149' },
        { value: 'CSE-2135' },
        { value: 'CSE-2129' },
        { value: 'CSE-2117' },
        { value: 'CSE-2113' },
        { value: 'CSE-2108' },
        { value: 'CSE-2106' },
        { value: 'CSE-2104' },
        { value: 'CSE-2099' },
        { value: 'CSE-2087' },
        { value: 'CSE-2081' },
        { value: 'CSE-2074' },
        { value: 'CSE-2066' },
        { value: 'CSE-2062' },
        { value: 'CSE-2060' },
        { value: 'CSE-2050' },
        { value: 'CSE-2036' },
        { value: 'CSE-2034' },
        { value: 'CSE-2026' },
        { value: 'CSE-2022' },
        { value: 'CSE-2020' },
        { value: 'CSE-2012' },
        { value: 'CSE-1998' },
        { value: 'CSE-1992' },
        { value: 'CSE-1990' },
        { value: 'CSE-1988' },
        { value: 'CSE-1986' },
        { value: 'CSE-1984' },
        { value: 'CSE-1982' },
        { value: 'CSE-1944' },
        { value: 'CSE-1896' },
        { value: 'CSE-1893' },
        { value: 'CSE-1865' },
        { value: 'CSE-1849' },
        { value: 'CSE-1847' },
        { value: 'CSE-1841' },
        { value: 'CSE-1824' },
        { value: 'CSE-1821' },
        { value: 'CSE-1818' },
        { value: 'CSE-1816' },
        { value: 'CSE-1814' },
        { value: 'CSE-1802' },
        { value: 'CSE-1778' },
        { value: 'CSE-1770' },
        { value: 'CSE-1766' },
        { value: 'CSE-1759' },
        { value: 'CSE-1747' },
        { value: 'CSE-1729' },
        { value: 'CSE-1715' },
        { value: 'CSE-1713' },
        { value: 'CSE-1631' },
        { value: 'CSE-1629' },
        { value: 'CSE-1607' },
        { value: 'CSE-1603' },
        { value: 'CSE-1599' },
        { value: 'CSE-1597' },
        { value: 'CSE-1595' },
        { value: 'CSE-1593' },
        { value: 'CSE-1589' },
        { value: 'CSE-1587' },
        { value: 'CSE-1581' },
        { value: 'CSE-1527' },
        { value: 'CSE-1525' },
        { value: 'CSE-1523' },
        { value: 'CSE-1516' },
        { value: 'CSE-1515' },
        { value: 'CSE-1513' },
        { value: 'CSE-1502' },
        { value: 'CSE-1500' },
        { value: 'CSE-1499' },
        { value: 'CSE-1494' },
        { value: 'CSE-1474' },
        { value: 'CSE-1472' },
        { value: 'CSE-1454' },
        { value: 'CSE-1452' },
        { value: 'CSE-1448' },
        { value: 'CSE-1432' },
        { value: 'CSE-1416' },
        { value: 'CSE-1400' },
        { value: 'CSE-1353' },
        { value: 'CSE-1325' },
        { value: 'CSE-1319' },
        { value: 'CSE-1303' },
        { value: 'CSE-1288' },
        { value: 'CSE-1284' },
        { value: 'CSE-1265' },
        { value: 'CSE-1253' },
        { value: 'CSE-1243' },
        { value: 'CSE-1196' },
        { value: 'CSE-1192' },
        { value: 'CSE-1190' },
        { value: 'CSE-1186' },
        { value: 'CSE-1178' },
        { value: 'CSE-1176' },
        { value: 'CSE-1170' },
        { value: 'CSE-1168' },
        { value: 'CSE-1151' },
        { value: 'CSE-1141' },
        { value: 'CSE-1104' },
        { value: 'CSE-1086' },
        { value: 'CSE-1062' },
        { value: 'CSE-1060' },
        { value: 'CSE-1045' },
        { value: 'CSE-1043' },
        { value: 'CSE-1042' },
        { value: 'CSE-1030' },
        { value: 'CSE-1028' },
        { value: 'CSE-1026' },
        { value: 'CSE-1024' },
        { value: 'CSE-1022' },
        { value: 'CSE-1018' },
        { value: 'CSE-1016' },
        { value: 'CSE-1012' },
        { value: 'CSE-1010' },
        { value: 'CSE-1008' },
        { value: 'CSE-1006' },
        { value: 'CSE-1004' },
        { value: 'CSE-1002' },
        { value: 'CSE-1000' },
        { value: 'CSE-998' },
        { value: 'CSE-994' },
        { value: 'CSE-992' },
        { value: 'CSE-990' },
        { value: 'CSE-988' },
        { value: 'CSE-986' },
        { value: 'CSE-984' },
        { value: 'CSE-982' },
        { value: 'CSE-980' },
        { value: 'CSE-978' },
        { value: 'CSE-976' },
        { value: 'CSE-974' },
        { value: 'CSE-972' },
        { value: 'CSE-970' },
        { value: 'CSE-968' },
        { value: 'CSE-966' },
        { value: 'CSE-960' },
        { value: 'CSE-956' },
        { value: 'CSE-954' },
        { value: 'CSE-948' },
        { value: 'CSE-946' },
        { value: 'CSE-944' },
        { value: 'CSE-938' },
        { value: 'CSE-928' },
        { value: 'CSE-921' },
        { value: 'CSE-900' },
        { value: 'CSE-889' },
        { value: 'CSE-879' },
        { value: 'CSE-860' },
        { value: 'CSE-858' },
        { value: 'CSE-856' },
        { value: 'CSE-852' },
        { value: 'CSE-846' },
        { value: 'CSE-844' },
        { value: 'CSE-842' },
        { value: 'CSE-840' },
        { value: 'CSE-838' },
        { value: 'CSE-834' },
        { value: 'CSE-826' },
        { value: 'CSE-824' },
        { value: 'CSE-818' },
        { value: 'CSE-816' },
        { value: 'CSE-814' },
        { value: 'CSE-812' },
        { value: 'CSE-810' },
        { value: 'CSE-806' },
        { value: 'CSE-802' },
        { value: 'CSE-788' },
        { value: 'CSE-786' },
        { value: 'CSE-784' },
        { value: 'CSE-782' },
        { value: 'CSE-780' },
        { value: 'CSE-778' },
        { value: 'CSE-776' },
        { value: 'CSE-774' },
        { value: 'CSE-770' },
        { value: 'CSE-766' },
        { value: 'CSE-756' },
        { value: 'CSE-752' },
        { value: 'CSE-744' },
        { value: 'CSE-738' },
        { value: 'CSE-736' },
        { value: 'CSE-730' },
        { value: 'CSE-706' },
        { value: 'CSE-704' },
        { value: 'CSE-696' },
        { value: 'CSE-694' },
        { value: 'CSE-678' },
        { value: 'CSE-676' },
        { value: 'CSE-674' },
        { value: 'CSE-666' },
        { value: 'CSE-664' },
        { value: 'CSE-660' },
        { value: 'CSE-650' },
        { value: 'CSE-648' },
        { value: 'CSE-646' },
        { value: 'CSE-644' },
        { value: 'CSE-628' },
        { value: 'CSE-624' },
        { value: 'CSE-620' },
        { value: 'CSE-618' },
        { value: 'CSE-614' },
        { value: 'CSE-612' },
        { value: 'CSE-610' },
        { value: 'CSE-608' },
        { value: 'CSE-606' },
        { value: 'CSE-604' },
        { value: 'CSE-600' },
        { value: 'CSE-596' },
        { value: 'CSE-353' },
        { value: 'CSE-347' },
        { value: 'CSE-344' },
        { value: 'CSE-330' },
        { value: 'CSE-316' },
        { value: 'CSE-280' },
        { value: 'CSE-278' },
        { value: 'CSE-276' },
        { value: 'CSE-274' },
        { value: 'CSE-270' },
        { value: 'CSE-264' },
        { value: 'CSE-256' },
        { value: 'CSE-254' },
        { value: 'CSE-203' },
        { value: 'CSE-198' },
        { value: 'CSE-182' },
        { value: 'CSE-181' },
        { value: 'CSE-180' },
        { value: 'CSE-147' },
        { value: 'CSE-87' },
        { value: 'CSE-86' },
        { value: 'CSE-75' },
        { value: 'CSE-73' },
        { value: 'CSE-70' },
        { value: 'CSE-69' },
        { value: 'CSE-68' },
      ],
      searchInput: 'cse-1589',
      tableData: [
        {
          createdata: '',
          esdeskname:'',
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
    // querySearchAsync(queryString, cb) {
    //   // var restaurants = this.restaurants
    //   // var results = queryString
    //   //   ? restaurants.filter(this.createStateFilter(queryString))
    //   //   : restaurants
    //   axios
    //     .get('/jirainfo/csetotal')
    //     .then((response) => {
    //       // for (let i of response.data) {
    //       //   i.value = i
    //       // }
    //       // this.results = response.data.map((item) => {
    //       //   return { name: item }
    //       // })
    //       console.log(response)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })

    //   clearTimeout(this.timeout)
    //   this.timeout = setTimeout(() => {
    //     cb(results)
    //   }, 50000 * Math.random())
    // },
    // createStateFilter(queryString) {
    //   return (state) => {
    //     return (
    //       state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    //     )
    //   }
    // },
    // handleSelect(item) {
    //   console.log(item)
    // },
    search() {
      this.getCseInfo(),
        this.getCseChildInfo(),
        this.getCseChildType(),
        this.getCseMonth()
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
        .then((response) => {
          this.tableData = response.data
        })
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
    // getCseMonthdata() {
    //   axios
    //     .get('/jirainfo/csemonth/', {
    //       params: { csekey: this.searchInput },
    //     })
    //     .then((response) => (this.tableDataByMouth = response.data))
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    getCseChildType() {
      axios
        .get('/jirainfo/csetype/', {
          params: { csekey: this.searchInput },
        })
        .then((response) => (this.caseTypeData = response.data))
        .catch((err) => {
          console.log(err)
        })
    },
  },
  mounted() {
    var that = this
    that.getCseMonth = function () {
      axios
        .get('/jirainfo/csemonth/', {
          params: { csekey: this.searchInput },
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
}
</script>
<style lang="less" scoped>
.input {
  margin-top: 20px;
  width: 100px;
}
</style>