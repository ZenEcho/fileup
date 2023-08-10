<template>
    <el-table stripe v-loading="loading" element-loading-text="Loading..." :element-loading-spinner="svg"
        element-loading-background="rgba(122, 122, 122, 0.8)" :data="data" row-key="id" :row-class-name="rowClassName"
        :header-row-class-name="headerRowClassName" :default-sort="{ prop: 'id', order: 'ascending' }" fixed
        style="min-width: 700px;">
        <el-table-column v-for="column in dynamicColumns" :key="column.prop" :label="column.label"
            :prop="column.prop"></el-table-column>
        <el-table-column label="操作" width="140px" fixed="right">
            <template v-slot="{ row }">
                <el-button size="small" type="success" @click="handleSuccess(row)">
                    通过
                </el-button>
                <el-button size="small" type="danger" @click="handleDelete(row)">
                    删除
                </el-button>
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
        };
    },
    methods: {
        rowClassName({ rowIndex }) {
            return rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
        },
        headerRowClassName() {
            return 'header-row';
        },
        handleDelete(row) {
            const isAuthenticated = localStorage.getItem('token');
            fetch("http://localhost:3199/inclusion/remove_inclusion", {
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

            fetch("http://localhost:3199/inclusion/through_inclusion", {
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
            fetch("http://localhost:3199/inclusion/website_inclusion_search", {
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
                    if (data.data.length === 0) {
                        return;
                    }
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
  