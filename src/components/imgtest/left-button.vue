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
                        <button @click="setFilterType('all')" data-type="all">全部</button>
                        <button @click="setFilterType('foreign')" data-type="foreign">国外图床</button>
                        <button @click="setFilterType('domestic')" data-type="domestic">国内图床</button>
                        <button @click="setFilterType('CDN')" data-type="CDN">CDN</button>
                        <button @click="setFilterType('direct')" data-type="direct">直连</button>
                    </div>
                    <div class="dataBox dataDiv">
                        <div v-for="(item, index) in filteredData" :key="index"
                            :class="{ 'shadow dataContent': true, 'Boxactiv': initialData.includes(item) }"
                            @click="selectItem(index, item)" :index="index">
                            <span>{{ item.name }}</span>
                        </div>
                    </div>
                    <div class="select dataDiv">
                        <div v-for="(item, index) in initialData" :key="index" @click="removeSelectedItem(index)">
                            <span>{{ filteredData[item].name }}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" @click="sendSelectedIndexes">对比</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="SLModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">收录说明</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="col-12 text-center">
                        <h1>加入收录</h1>
                        <h5>满足以下条件：</h5>
                        <p>1.没有禁止国内/国外访问</p>
                        <p>2.将测试图：https://images5.alphacoders.com/129/1298529.jpg 上传到图床</p>
                        <p>3.到<a href="https://github.com/ZenEcho/fileup.dev/issues" target="_blank">GitHub提交信息</a></p>
                        <p>4.信息格式：图床名称,图床链接,测试图url,图床描述</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="https://github.com/ZenEcho/fileup.dev/issues" style="color: white;text-decoration: none;"
                        type="button" class="btn btn-primary" target="_blank">去申请</a>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">知道了</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    emits: ['selected-indexes'], // 声明自定义事件
    data() {
        return {
            selectedIndexes: [], // 存储选中的index
            initialData: [], // 用于存储子组件发送的筛选后的数据
            filterType: "all", // 存储筛选类型
            NewfilteredData: [],
        };
    },
    computed: {
        filteredData() {
            if (this.filterType === 'foreign') {
                return this.NewfilteredData = this.data.filter(item => item.region === 0);
            }
            if (this.filterType === 'all') {
                return this.NewfilteredData = this.data;
            }
            if (this.filterType === 'domestic') {
                return this.NewfilteredData = this.data.filter(item => item.region === "CN");
            }
            if (this.filterType === 'CDN') {
                return this.NewfilteredData = this.data.filter(item => item.CDN === 1);
            }
            if (this.filterType === 'direct') {
                return this.NewfilteredData = this.data.filter(item => item.CDN === 0);
            }

        },
        selectedData() {
            return this.selectedIndexes.map(index => this.NewfilteredData[index]);
        },
    },
    methods: {
        selectItem(index, item) {
            if (!this.selectedIndexes.includes(index)) {
                this.selectedIndexes.push(index);
                this.initialData.push(item);
            } else {
                this.selectedIndexes = this.selectedIndexes.filter(i => i !== index);
                this.initialData = this.initialData.filter(selectedItem => selectedItem !== item);
            }
            console.log(this.initialData[0]);

        },
        sendSelectedIndexes() {
            this.$emit('selected-indexes', this.selectedData);
        },
        removeSelectedItem(index) {
            // 在点击事件中删除选中的index
            this.selectedIndexes.splice(index, 1);
        },
        setFilterType(type) {
            this.filterType = type;
        },
    },

};
</script>
<style scoped>
.Boxactiv {
    background-color: #FF9800;
    color: white;
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
}

.select {
    margin-top: 1em;
    user-select: none;
}

.select div {
    border: 1px solid;
    margin: 10px;
    padding: 5px;
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
        column-gap: 4px;
        column-count: 2;
        margin-top: 10px;
    }

    .dataContent {
        text-align: center;
        padding: 10px !important;
        margin: 0px;

    }

    .select div {
        text-align: center;
        padding: 10px;
        margin: 0px;
    }
}
</style>