<template>
    <div>
        <el-table stripe :data="visibleData" style="width: 100%" v-loading="loading" element-loading-text="Loading..."
            @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column v-for="column in tableColumns" :key="column.prop" :label="column.label" :prop="column.prop">
                <template #default="scope">
                    <template v-if="!scope.row.editing">{{ scope.row[column.prop] }}</template>
                    <template v-else>
                        <el-input v-model="scope.row[column.prop]" size="small"></el-input>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="140px" fixed="right">
                <template #default="scope">
                    <template v-if="!scope.row.editing">
                        <el-button @click="startEditing(scope.$index)" size="small">编辑</el-button>
                        <el-button @click="startDelete(scope.$index)" link type="danger">删除</el-button>
                    </template>
                    <template v-else>
                        <el-button @click="saveEdit(scope.$index)" size="small">保存</el-button>
                        <el-button @click="cancelEdit(scope.$index)" size="small">取消</el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            loading: false,
            rawData: [], // 原始数据
            visibleData: [], // 当前可见数据
            selectedRows: [], // 选择的行
            tableColumns: [], // 动态生成的表格列
        };
    },
    methods: {
        startEditing(index) {
            this.visibleData[index].editing = true;
        },
        saveEdit(index) {
            const editedRow = this.visibleData[index];
            console.log("保存编辑后的数据", editedRow);

            editedRow.editing = false;
        },
        cancelEdit(index) {
            // 取消编辑
            this.visibleData[index].editing = false;
        },
        handleSelectionChange(selection) {
            this.selectedRows = selection;
        },
        loadData() {
            this.loading = true;
            const isAuthenticated = localStorage.getItem('token');
            fetch("http://localhost:3199/images_hosting/ImagesHosting_list", {
                method: 'POST',
                headers: {
                    Authorization: isAuthenticated,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    this.rawData = data.data;
                    this.loading = false;
                    if (data.data.length === 0) {
                        return;
                    }
                    const id20Row = this.rawData.find(row => row.ID === 20);
                    if (id20Row) {
                        id20Row.warning = true;
                    }
                    this.tableColumns = Object.keys(this.rawData[0]).map(key => ({
                        prop: key,
                        label: key,
                    }));
                    this.visibleData = this.rawData.slice(0, 20);

                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    mounted() {
        this.loadData();
    },
};
</script>
<style scoped>
.warning-row {
    background-color: yellow;
    /* 设置警告行的背景色为黄色 */
}
</style>