<template>
    <el-scrollbar v-if="tableData.length > 0">
        <div style="width: 100%; height: 500px">
            <el-auto-resizer>
                <template #default="{ height, width }">
                    <el-table-v2 :columns="columns" :data="tableData" :width="width" :height="height"
                        :row-class="tableRowClassName" fixed />
                </template>
            </el-auto-resizer>
        </div>
        <div style="margin-top: 10px" v-if="tableData.length > 0">
            共
            <el-link type="primary" style="font-size: 20px">{{
                tableData.length
            }}</el-link>
            条数据
        </div>
    </el-scrollbar>
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
            console.log(this.editingRow)
        },
        handleSave(index) {
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
