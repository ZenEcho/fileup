
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
                    <div class="image-hosting-buttons" style="margin: 1em; display: flex !important;">
                        <el-autocomplete v-model="searchText" :fetch-suggestions="fetchSuggestions" placeholder="搜索图床"
                            @select="handleSelect" class="inline-input w-50"></el-autocomplete>
                    </div>
                    <div class="dataBox dataDiv">
                      
                        <div v-for="(item, index) in filteredData" :key="index"
                            :class="{ 'shadow dataContent': true, 'dataContentActive': NewfilteredData.includes(item) }"
                            @click="selectItem(item)" :index="index">
                            <span>{{ item.ImageHostingName }}</span>
                        </div>
                    </div>
                    <div class="select dataDiv">
                        <div v-for="(item, index) in NewfilteredData" :key="index" @click="removeSelectedItem(index)">
                            <span>{{ item.ImageHostingName }}</span>
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
                <el-form ref="postData" :model="postData" @submit.prevent="handleSubmit" class="image-hosting-form"
                    :rules="rules">
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
                        <el-form-item label="图床名称" prop="ImageHostingName">
                            <el-input v-model="postData.ImageHostingName"></el-input>
                        </el-form-item>
                        <el-form-item label="图床链接" prop="ImageHostingLink">
                            <el-input v-model="postData.ImageHostingLink"></el-input>
                        </el-form-item>
                        <el-form-item label="测试图URL" prop="TestImageURL">
                            <el-input v-model="postData.TestImageURL"></el-input>
                        </el-form-item>
                        <el-form-item label="联系邮箱" prop="Email">
                            <el-input v-model="postData.Email"></el-input>
                        </el-form-item>
                        <el-form-item label="图床描述" prop="ImageHostingDescription">
                            <el-input v-model="postData.ImageHostingDescription"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox v-model="postData.ImageHostingRegion">大陆服务器</el-checkbox>
                            <el-checkbox v-model="postData.ImageHostingCDN">使用CDN</el-checkbox>
                            <el-checkbox v-model="postData.ImageHostingRegister">免注册可用</el-checkbox>
                        </el-form-item>
                        <el-form-item label="验证码" prop="Captcha">
                            <el-input v-model="postData.Captcha"></el-input>
                            <img v-if="captchaImage" :src="captchaImage" class="captcha-image" @click="refreshCaptcha" />
                        </el-form-item>
                    </div>
                    <div class="modal-footer">
                        <el-button type="primary" native-type="submit">申请</el-button>
                        <el-button data-bs-dismiss="modal">算了</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { useToast } from "vue-toastification";
import http from '@/http';
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
            searchText: '',
            NewfilteredData: [], // 用于存储的选择数据
            filterType: "all", // 存储筛选类型
            postData: {
                ImageHostingName: '',
                ImageHostingLink: '',
                TestImageURL: '',
                Email: '',
                ImageHostingDescription: '',
                ImageHostingRegion: false,
                ImageHostingCDN: false,
                ImageHostingRegister: false,
                Captcha: "",
            },
            captchaImage: "", //验证码url
            rules: {
                ImageHostingName: [
                    { required: true, message: '请输入图床名称', trigger: 'blur' },
                    { max: 12, message: '图床名称长度最多为 12 个字符', trigger: 'blur' },
                ],
                ImageHostingLink: [
                    { required: true, message: '请输入图床链接', trigger: 'blur' },
                ],
                TestImageURL: [
                    { required: true, message: '请输入测试图URL', trigger: 'blur' },
                ],
                Email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
                ],
                ImageHostingDescription: [
                    { mxa: 40, message: '图床描述长度最多为 40 个字符', trigger: 'blur' },
                ],
                Captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
            },
        };
    },
    computed: {
        filteredData() {
            if (this.filterType === 'foreign') {
                return this.data.filter(item => item.ImageHostingRegion === 0);
            }
            if (this.filterType === 'all') {
                return this.data;
            }
            if (this.filterType === 'domestic') {
                return this.data.filter(item => item.ImageHostingRegion === 1);
            }
            if (this.filterType === 'CDN') {
                return this.data.filter(item => item.ImageHostingCDN === 1);
            }
            if (this.filterType === 'direct') {
                return this.data.filter(item => item.ImageHostingCDN === 0);
            }

        },
    },
    methods: {
        handleSelect(suggestion) {
            this.searchText = '';
            const selectedObject = this.data.find(item =>
                item.ImageHostingName === suggestion.value
            );
            this.selectItem(selectedObject)
        },
        fetchSuggestions(queryString) {
            if (queryString.trim() === '') {
                return [];
            }
            const suggestions = this.filteredData.filter(item =>
                item.ImageHostingName.toLowerCase().includes(queryString.toLowerCase())
            ).map(item => ({ value: item.ImageHostingName }));

            return suggestions;
        },

        selectItem(item) {
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
            this.$refs.postData.validate(valid => {
                if (!valid) { return }
                http.post('/inclusion/website_inclusion', this.postData, {
                })

                    .then((response) => {
                        const data = response.data;
                        if (data.status) {
                            this.toast.success(data.message);
                            this.refreshCaptcha();
                            this.postData.ImageHostingName = '';
                            this.postData.ImageHostingLink = '';
                            this.postData.TestImageURL = '';
                            this.postData.Email = '';
                            this.postData.ImageHostingDescription = '';
                            this.postData.EmailAddress = '';
                            this.postData.Captcha = '';
                        } else {
                            this.toast.error(data.message);
                        }
                    })
                    .catch((error) => {
                        this.toast.error(error.data.message);
                    });

            })

        },
        refreshCaptcha() {
            http.get('/auth/captcha', {
                credentials: 'include',
                responseType: 'text', // 指定响应的数据类型为文本
            })
                .then(response => {
                    this.captchaImage = 'data:image/svg+xml;base64,' + btoa(response.data);
                    this.postData.Captcha = ''; // 清空用户输入的验证码
                })
                .catch(error => {
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