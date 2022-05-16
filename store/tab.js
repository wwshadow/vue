export default {
    state: {
        dialogVisible: false,
        isCollapse: false
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        dialog(state) {
            state.dialogVisible = !state.dialogVisible
        }
    }
}