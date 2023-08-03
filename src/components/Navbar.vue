<template>
    <div>
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <img v-if="isHomeRoute" src="@/assets/logo.ico" style="height: 36px;">
                <img v-else-if="isImgTestRoute" src="@/assets/images/up.ico" style="height: 36px;">
                <span>2023年免费图床</span>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div class="navbar-nav" style="text-align: right;">
                        <a class="nav-link" aria-current="page" href="/">盘络上传</a>
                        <a class="nav-link nav-link-activ" href="/imgtest">图床比拼</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    computed: {
        isHomeRoute() {
            // Check if the current route is "/"
            return this.$route.path === "/";
        },
        isImgTestRoute() {
            // Check if the current route is "/imgtest"
            return this.$route.path === "/imgtest";
        },
        // Add more computed properties for other routes if needed
    },
};
</script>
<style scoped>
.navbar span {
    color: white;
}

.navbar {
    background-color: transparent;
    color: #dddddd;
}

.nav-link {
    color: white;
}

#navbarNavAltMarkup a:hover {
    color: #fff;
    font-weight: bold;
}
</style>