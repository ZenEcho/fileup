<template>
    <el-table v-loading="loading" element-loading-text="Loading..." :element-loading-spinner="svg"
        element-loading-background="rgba(122, 122, 122, 0.8)" :data="data" row-key="id" :row-class-name="rowClassName"
        :header-row-class-name="headerRowClassName" :default-sort="{ prop: 'id', order: 'ascending' }" fixed
        style="min-width: 700px;">
        <el-table-column v-for="column in dynamicColumns" :key="column.prop" :label="column.label"
            :prop="column.prop"></el-table-column>
        <el-table-column label="Actions">
            <template v-slot="{ row }">
                <el-button size="small" type="success" @click="handleSuccess(row.id)"><el-icon>
                        <Check />
                    </el-icon></el-button>
                <el-button size="small" type="danger" @click="handleDelete(row.id)"><el-icon>
                        <Close />
                    </el-icon></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
  
<script>
import { ElLoading } from 'element-plus';
export default {
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
        handleDelete(id) {
            console.log(`Deleting ID ${id}`);
        },
        handleSuccess(id) {
            console.log(`Success for ID ${id}`);
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
                    console.log(data);
                    this.data=data.data
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
  