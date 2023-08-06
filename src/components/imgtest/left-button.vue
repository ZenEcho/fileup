
<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn text-white vsButton" data-bs-toggle="modal" data-bs-target="#VSModal">VS</button>
    <button type="button" class="btn text-white vsButton" data-bs-toggle="modal" data-bs-target="#SLModal"
        style="bottom: 4.5em;">收录</button>
    <!-- Modal -->
    <div class="modal fade" id="VSModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">自选PK</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="image-hosting-buttons">
                        <button :class="{ 'ButtonActive': filterType === 'all' }" @click="setFilterType('all')">全部</button>
                        <button :class="{ 'ButtonActive': filterType === 'foreign' }"
                            @click="setFilterType('foreign')">国外图床</button>
                        <button :class="{ 'ButtonActive': filterType === 'domestic' }"
                            @click="setFilterType('domestic')">国内图床</button>
                        <button :class="{ 'ButtonActive': filterType === 'CDN' }" @click="setFilterType('CDN')">CDN</button>
                        <button :class="{ 'ButtonActive': filterType === 'direct' }"
                            @click="setFilterType('direct')">直连</button>
                    </div>
                    <div class="dataBox dataDiv">
                        <div v-for="(item, index) in filteredData" :key="index"
                            :class="{ 'shadow dataContent': true, 'dataContentActive': NewfilteredData.includes(item) }"
                            @click="selectItem(index, item)" :index="index">
                            <span>{{ item.name }}</span>
                        </div>
                    </div>
                    <div class="select dataDiv">
                        <div v-for="(item, index) in NewfilteredData" :key="index" @click="removeSelectedItem(index)">
                            <span>{{ item.name }}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" @click="sendSelected">对比</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="SLModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <form @submit.prevent="handleSubmit">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">收录说明</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="col-12 text-center">
                            <h1>加入收录</h1>
                            <h5>满足以下条件：</h5>
                            <p>1.必须允许注册</p>
                            <p>2.上传测试图：https://images5.alphacoders.com/129/1298529.jpg</p>
                        </div>
                    </div>
                    <!-- Your form content will go here -->
                    <div class="mx-auto mb-3" style="width: 28em;">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="ImageHostingName">图床名称</span>
                            <input v-model="postData.ImageHostingName" type="text" class="form-control"
                                aria-describedby="ImageHostingName" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="ImageHostingLink">图床链接</span>
                            <input v-model="postData.ImageHostingLink" type="text" class="form-control"
                                aria-describedby="ImageHostingLink" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="TestImageURL">测试图URL</span>
                            <input v-model="postData.TestImageURL" type="text" class="form-control"
                                aria-describedby="TestImageURL" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="EmailAddress">联系邮箱</span>
                            <input v-model="postData.EmailAddress" type="text" class="form-control"
                                aria-describedby="EmailAddress" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="ImageHostingDescription">图床描述(40字)</span>
                            <input v-model="postData.ImageHostingDescription" type="text" class="form-control"
                                aria-describedby="ImageHostingDescription" maxlength="40">
                        </div>
                        <div class="input-group mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="ImageHostingRegion"
                                    v-model="postData.ImageHostingRegion">
                                <label class="form-check-label" for="ImageHostingRegion">
                                    大陆服务器
                                </label>
                            </div>
                            <div class="form-check" style="margin-left: 10px;">
                                <input class="form-check-input" type="checkbox" id="ImageHostingCDN"
                                    v-model="postData.ImageHostingCDN">
                                <label class="form-check-label" for="ImageHostingCDN">
                                    使用CDN
                                </label>
                            </div>
                            <div class="form-check" style="margin-left: 10px;">
                                <input class="form-check-input" type="checkbox" id="ImageHostingRegister"
                                    v-model="postData.ImageHostingRegister">
                                <label class="form-check-label" for="ImageHostingRegister">
                                    免注册可用
                                </label>
                            </div>
                        </div>

                        <div class="input-group mb-3" :class="{ VerificationError: isVerificationError }">
                            <span class="input-group-text" id="Verification">验证码</span>
                            <input v-model="Verification" type="text" class="form-control" aria-describedby="Verification">
                            <img :src="captchaImage" @click="refreshCaptcha" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">申请</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">算了</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import SIdentify from "@/components/SIdentify.vue";
import { useToast } from "vue-toastification";
export default {
    setup() {
        const toast = useToast();
        return { toast }
    },
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    emits: ['selected-indexes'], // 声明自定义事件
    data() {
        return {
            NewfilteredData: [], // 用于存储的选择数据
            filterType: "all", // 存储筛选类型
            postData: {
                ImageHostingName: '',
                ImageHostingLink: '',
                TestImageURL: '',
                ImageHostingDescription: '',
                EmailAddress: '',
                ImageHostingRegion: false,
                ImageHostingCDN: true,
                ImageHostingRegister: true,
            },
            captchaImage: "", //验证码url
            Verification: "", // 输入的验证码
            isVerificationError: false,
        };
    },
    // created() { this.refreshCode() },
    computed: {
        filteredData() {
            if (this.filterType === 'foreign') {
                return this.data.filter(item => item.region === 0);
            }
            if (this.filterType === 'all') {
                return this.data;
            }
            if (this.filterType === 'domestic') {
                return this.data.filter(item => item.region === "CN");
            }
            if (this.filterType === 'CDN') {
                return this.data.filter(item => item.CDN === 1);
            }
            if (this.filterType === 'direct') {
                return this.data.filter(item => item.CDN === 0);
            }

        },
    },
    methods: {
        selectItem(index, item) {
            if (!this.NewfilteredData.includes(item)) {
                this.NewfilteredData.push(item);
            } else {
                this.NewfilteredData = this.NewfilteredData.filter(idata => idata !== item);
            }
        },
        sendSelected() {
            const NewfilteredDataCopy = [...this.NewfilteredData]; // 复制数组
            this.$emit('selected-indexes', NewfilteredDataCopy);
        },
        removeSelectedItem(index) {
            const selectedItem = this.NewfilteredData[index];
            const filteredIndex = this.filteredData.findIndex(item => item === selectedItem);
            if (filteredIndex !== -1) {
                this.NewfilteredData.splice(index, 1);
            }
        },
        setFilterType(type) {
            this.filterType = type;
        },
        handleSubmit() {
            fetch('http://localhost:3199/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Verification: this.Verification }),
                credentials: 'include',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status) {
                        this.sendVSorPK()
                    } else {
                        //验证码错误
                        this.isVerificationError = true;
                        setTimeout(() => {
                            this.isVerificationError = false;
                        }, 800)
                        this.toast.error(data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    return

                });


        },
        sendVSorPK() {
            const url = 'http://localhost:3199/Join-VSorPK';
            const formData = JSON.stringify(this.postData);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        this.refreshCaptcha();
                        this.toast.success(data.message);
                        this.postData.ImageHostingName = '';
                        this.postData.ImageHostingLink = '';
                        this.postData.TestImageURL = '';
                        this.postData.ImageHostingDescription = '';
                        this.postData.EmailAddress = '';
                        this.Verification = '';
                    } else {
                        this.toast.error(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    this.toast.error("发送错误!");
                });
        },
        refreshCaptcha() {
            // Fetch a new captcha image from the backend
            fetch('http://localhost:3199/captcha', { credentials: 'include' })
                .then((response) => response.text())
                .then((data) => {
                    this.captchaImage = 'data:image/svg+xml;base64,' + btoa(data);
                    this.Verification = ''; // Clear the user's previous input
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    mounted() {
        this.refreshCaptcha();
    },
};
</script>
<style scoped>
.VerificationError {
    animation: shake 1s;
}

@keyframes shake {

    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }


}

.ButtonActive {
    background-color: #03a9f4 !important;
    color: #fff;
}

.dataContentActive {
    background-color: #FF9800;
    color: white !important;
}

.vsButton {
    background: rgb(0 0 0 / 20%);
    width: 4em;
    height: 4em;
    border-radius: 50%;
    position: fixed;
    bottom: 0.1em;
    left: 0.1em;
}

.vsButton:hover {
    background: rgb(0 0 0 / 50%);
}

.image-hosting-buttons {
    display: flex;
    justify-content: center;
}

.image-hosting-buttons button {
    border-left: none;
    border-top: none;
    border-bottom: none;
    border-right: 1px #eee solid;
    background: #dee2e6;
    margin: 0;
    width: 7em;
    height: 2em;
}

.image-hosting-buttons button:last-child {
    border: none;
}

.image-hosting-buttons button:hover {
    background: #eee;
}

.dataDiv {
    display: flex;
    flex-wrap: wrap;
}

.dataContent {
    margin: 10px;
    padding: 10px;
    user-select: none;
    border: solid 1px #eee;
    color: #2196f3;
}

.dataContent:hover {
    transform: scale3d(1.05, 1.05, 1.05);
}

.select {
    margin-top: 1em;
    user-select: none;
}

.select div {
    border: 2px #9E9E9E;
    margin: 10px;
    padding: 5px;
    border-style: dashed;
    color: #FF9800;
}

@media (max-width: 550px) {
    .image-hosting-buttons {
        display: block !important;
    }

    .image-hosting-buttons button {
        border: none !important;
        margin: 1px 0 !important;
        width: 100% !important;
    }
}

@media (max-width: 600px) {
    .dataDiv {
        display: block !important;
        column-gap: 0px;
        column-count: 2;
        margin-top: 10px;
    }

    .dataContent {
        text-align: center;
        margin: 5px;
    }

    .dataContent:nth-child(1) {
        margin-top: 0px;
    }

    .select div {
        text-align: center;
        padding: 10px;
        margin: 5px;
    }

    .select div:nth-child(1) {
        margin-top: 0px;
    }
}
</style>