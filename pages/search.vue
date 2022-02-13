<template>
    <div class="container">
        <h1>{{title}}</h1>
        <p>Query:</br>
        <pre> {{ query | pretty }}</pre>
        </p>
        <p v-if="$fetchState.pending">Waiting for search results...</p>
        <div v-else>
            <p>Num hits: {{results.length}}</p>   
            <v-data-table v-if="results.length" 
                :headers = "headers"
                :items = "results"
                :items-per-page="10"
                class = "elevation-1"
                :dense = "true"
                item-key="results.idCode"
                :search= "search"
            >
                <template v-slot:top>
                    <v-text-field
                        v-model="search"
                        label="Search"
                        class="mx-4"
                    ></v-text-field>
                </template>
                <template #item.idCode="{ item }">
                    <nuxt-link :to = "`/show?id=${item.idCode}`">{{ item.idCode }}</nuxt-link>
                </template>

            </v-data-table>
        </div>
    </div>
</template>

<script>
export default  {
    data() {
        return {
            title : "PDB Browser search",
            query : '',
            results : [],
            error : {},
            search: '',
            headers : [
                { text: 'PDB. Id.', value: 'idCode'},
                { text: 'Header', value: 'header'},
                { text: 'Title', value: 'compound'},
                { text: 'Resolution', value: 'resolution'},
                { text: 'Experiment', value: 'expType'},
                { text: 'Source', value: 'source'}
            ]
        }
    },
    async fetch() {
            this.query = this.$route.query.query;
            const url = `${this.$config.APIPrefix}?search=${this.$route.query.query}`;
            const dataResponse = await fetch(url);
            if (dataResponse.ok) { 
                this.results = await dataResponse.json();
                if (this.results.hits) {
                    this.results = this.results.hits;
                } else {
                    this.error = this.results;
                }

            }
    },
    filters: {
        pretty: function(value) {
            return JSON.stringify(JSON.parse(value), null, 2);
        }
    }
}
</script>
