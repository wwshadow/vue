<template>
  <header>
    <div class="l-content">
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <h3 style="color :#fff">首页 </h3>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="user" :src="usrimg">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="logout"> 退出</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </header>
</template>

<style lang="less" scoped>
// .el-dropdown-link {
//   cursor: pointer;
//   color: #409eff;
// }
// .el-icon-arrow-down {
//   font-size: 12px;
// }
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.l-content {
  display: flex;
  align-content: center;
  align-items: center;

  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
<script>
export default {
  name: 'CommonHeader',
  data() {
    return {
      usrimg: require('../assets/images/OIP-C.jpg'),
    }
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    },
    logout() {
      console.log("tuichu")
      this.$store.commit('clearToken')
      this.$router.push({ name: 'login' })
    }
  },
}
</script>


