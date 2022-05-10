<template>
  <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" default-active="1-4-1"
    class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <h3>{{isCollapse ? 'info' : 'case info system'}}</h3>
    <el-menu-item @click="clickMemu(item)" background-color="#545c64" active-text-color="#ffd04b"
      v-for="item in noChildren" :index="item.path + ''" :key="item.path">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :index="item.path + ''" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="(subItem, subIndex) in item.children" :key="subItem.path">
        <el-menu-item @click="clickMemu(subItem)" :index="subIndex.toString()">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!-- <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item> -->
  </el-menu>
</template>
<style lang="less" scope>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  text-decoration-color: aliceblue;
}
.el-menu {
  height: 960;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      memu: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home',
        },
        {
          path: '/csetotal',
          name: 'csetotal',
          label: '项目表',
          icon: 'video-play',
          url: 'csetotal/csetotal',
        },
        {
          path: '/cseinfo',
          name: 'cseinfo',
          label: '项目详细',
          icon: 'user',
          url: 'cseinfo/cseinfo',
        },
                {
          path: '/jirauserinfo',
          name: 'jiraUserInfo',
          label: '用户详细',
          icon: 'user',
          url: 'cseinfo/jirauserinfo',
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'pageOne',
              label: 'test1',
              icon: 'setting',
              url: 'page1/page1',
            },
            {
              path: '/page2',
              name: 'pageTow',
              label: 'test2',
              icon: 'setting',
              url: 'page2/page2',
            },
          ],
        },
      ],
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },

    clickMemu(item) {
      this.$router.push({
        name: item.name,
      })
    },
  },
  computed: {
    noChildren() {
      return this.memu.filter((item) => !item.children)
    },
    hasChildren() {
      return this.memu.filter((item) => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
  },
}
</script>