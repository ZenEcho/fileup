<template>
    <el-table v-loading="loading" element-loading-text="Loading..." :element-loading-spinner="svg"
        element-loading-background="rgba(122, 122, 122, 0.8)" :data="data" row-key="id" :row-class-name="rowClassName"
        :header-row-class-name="headerRowClassName" :default-sort="{ prop: 'id', order: 'ascending' }" fixed
        style="min-width: 700px;">
        <el-table-column v-for="column in dynamicColumns" :key="column.prop" :label="column.label"
            :prop="column.prop">
        </el-table-column>
        <el-table-column label="Actions">
            <template v-slot="{ row }">
                <template v-if="editingRow === data.indexOf(row)">
                    <el-button size="small" type="success" @click="handleSave(editingRow)">Save</el-button>
                    <el-button size="small" type="info" @click="handleCancel">Cancel</el-button>
                </template>
                <template v-else>
                    <el-button size="small" type="primary" @click="handleEdit(row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(row)">Delete</el-button>
                </template>
            </template>
        </el-table-column>

    </el-table>
</template>
  
<script>
import { useToast } from "vue-toastification";
export default {
    setup() {
        const toast = useToast();
        return { toast }
    },
    data() {
        return {
            loading: false,
            dynamicColumns: [], // 动态列配置数组
            data: [
                {
                    "ID": 1,
                    "图床名称": 'John Doe',
                    "图床链接": "baidu.com",
                    "测试图链接": "baidu.com",
                    "图床描述": "",
                    "联系邮箱": "qq@baidu.com",
                    "图床区域": "0",
                    "CDN": 1,
                    "允许注册": 0,
                    "审核状态": 0,
                    "注册IP": "192.168.0.1",
                    "注册时间": "2023",
                },
            ],
            editingRow: null // 用于跟踪正在编辑的行的索引
        };
    },
    methods: {
        handleEdit(row) {
            this.editingRow = this.data.indexOf(row);
        },
        handleSave(index) {
            // 提交编辑后的数据至服务器
            // 然后设置 editingRow 为 null
            this.editingRow = null;
        },
        handleCancel() {
            this.editingRow = null;
        },
        rowClassName({ rowIndex }) {
            return rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
        },
        headerRowClassName() {
            return 'header-row';
        },
        handleDelete(row) {
            const isAuthenticated = localStorage.getItem('token');
            fetch("http://localhost:3199/api/Del_VSorPK", {
                method: 'POST',
                headers: {
                    Authorization: isAuthenticated,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ID: row.ID }),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.status) {
                        this.toast.success(data.message);
                        this.data.splice(this.data.findIndex(item => item.ID === row.ID), 1)
                    } else {
                        this.toast.error(data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        handleSuccess(row) {
            const isAuthenticated = localStorage.getItem('token');
            const obj = {
                ID: row.ID,
                ImageHostingName: row.ImageHostingName,
                ImageHostingLink: row.ImageHostingLink,
                TestImageURL: row.TestImageURL,
                ImageHostingDescription: row.ImageHostingDescription,
                Email: row.Email,
                ImageHostingRegion: row.ImageHostingRegion,
                ImageHostingCDN: row.ImageHostingCDN,
                ImageHostingRegister: row.ImageHostingRegister
            }

            fetch("http://localhost:3199/api/Add_VSorPK", {
                method: 'POST',
                headers: {
                    Authorization: isAuthenticated,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.status) {
                        this.toast.success(data.message);
                        row.ImageHostingApproved = 1
                    } else {
                        this.toast.error(data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        getDATA() {
            const isAuthenticated = localStorage.getItem('token');
            fetch("http://localhost:3199/api/Join-VSorPK", {
                method: 'POST',
                headers: {
                    Authorization: isAuthenticated,
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.data = data.data
                    this.dynamicColumns = this.generateDynamicColumns(this.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        showLoading() {
            this.loading = true
        },
        hideLoading() {
            this.loading = false
        },
        generateDynamicColumns(data) {
            return Object.keys(data[0]).map((field) => {
                return {
                    prop: field,
                    label: field,
                };
            });
        },
    },
    created() {
        this.getDATA()

    },
};
</script>
  
<style scoped>
.even-row {
    background-color: #f5f5f5;
}

.odd-row {
    background-color: #ffffff;
}

.header-row {
    background-color: #e0e0e0;
    font-weight: bold;
}
</style>
  