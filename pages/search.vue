<template>
    <div class="container">
        <h1>{{title}}</h1>
        <p>Query:</br>
        <pre> {{ query }}</pre>
        </p>
        <p v-if="$fetchState.pending">Waiting for results...</p>
        <div v-else>
            <p>Num hits: {{results.length}}</p>   
            <v-data-table v-if="results.length" 
                :headers = "headers"
                :items = "results"
                :items-per-page="10"
                :class="elevation-1"
            ></v-data-table>
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
            headers : [
                { text: 'PDB. Id.', value: 'idcode'},
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
            const dataResponse = await fetch(this.config.APIPrefix + "?search=" + this.$route.query.query);
            if (dataResponse.ok) { 
                this.results = await dataResponse.json();
                if (this.results.hits) {
                    this.results = this.results.hits;
                } else {
                    this.error = this.results;
                }

            }
    }
}
</script>
