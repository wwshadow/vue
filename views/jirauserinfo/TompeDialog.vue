<template>
    <!-- <div> -->
    <!-- <p>{{ dialogVisible }}</p> -->
    <el-dialog title="工时填写" :visible.sync="dialogVisible" :modal=false>
        <el-form :model="form">
            <!-- <p>{{ childid }}</p> -->

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="updatedialog">取 消</el-button>
            <el-button type="primary" @click="posttempo(scope.row.issueid)">确 定</el-button>
        </div>
        <!-- <el-form :model="form">
            <el-form-item label="选择填写方式" :label-width="formLabelWidth">
                <el-tooltip class="item" effect="dark" content="自动：填写当周工时；手动：仅填写当前esdesk" placement="top-start">
                    <i class="el-icon-info"></i>
                </el-tooltip>
                <el-switch style="display: block" v-model="is_autofill" active-color="#ff494" inactive-color="#13ce66"
                    active-text="自动" inactive-text="手动">
                </el-switch>
            </el-form-item>
            <el-form-item label="用户id" :label-width="formLabelWidth">
                <el-input v-model="workerId" autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item label="deskid" :label-width="formLabelWidth">
                <el-input value="childid" autocomplete="on"></el-input>
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
            <el-button @click=" dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="posttempo(scope.row.issueid)">确 定</el-button>
        </div> -->
    </el-dialog>
    <!-- </div> -->

</template>
<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'TompeDialog',
    props: [
        {
            "dialogVisible": {
                type: Boolean,
                default: false
            }
        },
        "childid"],
    // {
    //     dialogVisible: {
    //         type: Boolean,
    //         default: false
    //     }
    // },
    data() {
        return {
            workerId: '5f812189287870006a5c85b4',
            dialogFormVisible: false,
            is_autofill: false,
            Authorization: '',
            tompetime: '70',
            filldatetime: '',
            form: {
                name: '',
                region: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            },
            formLabelWidth: '120px',
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
        }
    },
    methods: {
        updatedialog() {
            // let Visible= false;
            // console.log(this.dialogVisible)
            // this.$emit("update:dialogVisible", !this.dialogVisible)
            // console.log(this.dialogVisible)
            this.$emit("childFn")
        }
    }
}
</script>