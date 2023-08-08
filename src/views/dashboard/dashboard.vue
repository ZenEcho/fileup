<template>
    <div class="common-layout">
        <el-container>
            <el-header>

                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
                    @select="handleSelect">
                    <el-menu-item index="0" style="background-color: blueviolet; font-size: 1.5em; color: white;"
                        @click="this.$router.push('/imgtest');">UP</el-menu-item>
                    <div class="flex-grow" />
                    <el-menu-item index="1">图床对比</el-menu-item>
                    <el-sub-menu index="2">
                        <template #title>管理员</template>
                        <el-menu-item index="2-1" @click="Exitlogin">退出</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                        <el-sub-menu index="1">
                            <template #title>
                                <el-icon><User /></el-icon>
                                <span>用户</span>
                            </template>
                            <el-menu-item-group title="个人信息">
                                <el-menu-item index="1-1">资料修改</el-menu-item>
                                <el-menu-item index="1-2">密码修改</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon><User /></el-icon>
                                <span>后台管理</span>
                            </template>
                            <el-menu-item-group title="系统管理">
                                <el-menu-item index="1-1">用户管理</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="运营">
                                <el-menu-item index="2-1">收录审核</el-menu-item>
                                <el-menu-item index="2-2">收录修改</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>


                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main><button type="button" @click="verifyToken">验证Token</button></el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
  
<script>
import { useToast } from "vue-toastification";

export default {
    setup() {
        const toast = useToast();
        return { toast }
    },
    created() {
        // 在Vue组件加载时进行Token验证
        this.verifyToken();
    },
    data() {
        return {
            fullscreenLoading: false
        }
    },
    methods: {
        verifyToken() {
            const token = localStorage.getItem('token');
            fetch(this.$apiConfig.ServerUrl + "/verify-token", {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        localStorage.token = ""
                        this.$router.push('/login');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log();
                    if (data.status) {
                        this.toast.success(data.message);
                    } else {
                        this.toast.error(data.message);
                    }

                })
                .catch((error) => {
                    this.toast.error(error.message);
                    this.$router.push('/login')
                    localStorage.token = ""
                    console.error(error);
                });
        },
        Exitlogin(){
            localStorage.removeItem('token');
            this.$router.push('/login') 
        }

    },
};
</script>
<style scoped>
.flex-grow {
    flex-grow: 1;
}
</style>