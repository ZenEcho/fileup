<template>
    <div>
        <data>
            <el-autocomplete v-model="searchText" :fetch-suggestions="fetchSuggestions" placeholder="搜索图床"
                @select="handleSelect"></el-autocomplete>
        </data>
    </div>
</template>
  
<script>


export default {
    data() {
        return {
            searchText: '',
            suggestionsData: [
                { value: 'vue', link: 'https://github.com/vuejs/vue' },
                { value: 'element', link: 'https://github.com/ElemeFE/element' },
                { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
                { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
                { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
                { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
                { value: 'babel', link: 'https://github.com/babel/babel' },
            ],
        };
    },
    methods: {
        fetchSuggestions(queryString) {
            if (queryString.trim() === '') {
                return [];
            }

            const suggestions = this.suggestionsData.filter(item => {
                return item.value.toLowerCase().includes(queryString.toLowerCase());
            });
            console.log(suggestions);
            return suggestions;
        },
        handleSelect(suggestion) {
            console.log('选中的建议:', suggestion);
        },
    },
};
</script>
  