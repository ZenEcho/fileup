<template>
    <div>
        <el-autocomplete v-model="searchText" :fetch-suggestions="fetchSuggestions" placeholder="搜索图床"
            @select="handleSelect"></el-autocomplete>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            searchText: '',
            data: [
                {
                    ID: 18,
                    ImageHostingName: "789789",

                },
                {
                    ID: 16,
                    ImageHostingName: "45645",

                },
                {
                    ID: 10,
                    ImageHostingName: "123",

                },
            ]
        };
    },
    methods: {
        fetchSuggestions(query) {
            const matchedSuggestions = this.data.filter(item =>item.ImageHostingName.toLowerCase().includes(query.toLowerCase())
            ).map(item => ({ value: item.ImageHostingName }));

            return matchedSuggestions;
        },

        handleSelect(item) {
            this.searchText = item.ImageHostingName;
        }
    }
};
</script>
  