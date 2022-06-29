<template>
    <el-form :model="form" status-icon :rules="rules" ref="form" lable-width="100px" class="login-container">
        <h3 class="login_title">登录</h3>
        <el-form-item label="jira邮箱" label-width="80px" prop="jiraemail" class="username">
            <el-input type="input" autocomplete="off" v-model="form.jiraemail" placeholder="请输入账号">

            </el-input>
        </el-form-item>
        <el-form-item label="jira key" label-width="80px" prop="password">
            <el-input type="password" autocomplete="off" v-model="form.password" placeholder="请输入jira key">

            </el-input>
        </el-form-item>
        <el-form-item class="login_submit">
            <el-button type="primary" @click="login" class="login_submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import axios from 'axios'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'login',
    data() {
        return {
            form: { jiraemail: '', password: '' },
            rules: {
                jiraemail: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { min: 3, message: "jira uuid", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 3, message: "jira key", trigger: "blur" }
                ]
            },



        }
    },
    methods: {
        login() {
            // const token = 'ok'
            // this.$store.commit('setToken', token)
            // this.$router.push({ name: 'home' }).catch(err => {
            //     console.log(err)
            // })
            // console.log(this.form.jiraemail, this.form.password)
            var that = this
            axios(
                {
                    url: '/jirauser',
                    method: 'post',
                    data: {
                        jiraemail: this.form.jiraemail,
                        jirakey: this.form.password,
                    },

                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(function (response) {
                    // console.log('data', response)
                    // console.log('data', response.data[1])
                    // console.log('data', response.data[0])
                    if (response.data[0] === "ok") {

                        that.$store.commit('setToken', response.data[1])

                        that.$router.push({ name: 'home' })

                    }
                    else if (response.data === "err") {

                        // that.$store.commit('setToken', response.data)
                        // that.$router.push({ name: 'login' })
                        alert("账户密码异常，请重新输入")
                    } else {
                        alert("账户密码异常，请重新输入")
                    }

                })
                .catch((err) => {

                    this.$router.push({ name: 'login' })
                    console.log(err)
                })
        }
    }
}

</script>
<style lang="less"  scoped>
.login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}

.login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}

.login_submit {
    margin: 20px auto 0px auto;
    text-align: center;

}
</style>