<template>
    <div class="container">
        <h1>{{title}}</h1>
        <p>Query:<br/>
        <pre>{{ query }}</pre>
        </p>
        <p v-if="$fetchState.pending">Waiting for results...</p>
        <div v-else>    
            <p>Num hits: {{blastResults.length}}</p>   
            <v-data-table v-if="blastResults.length"
                :headers = "headers" 
                :items = "blastResults"
                :items-per-page="10"
                class = "elevation-1"
                :item-key = "blastResults.idCode"
                :dense = "true"
                :search = "search"
            >
                <template v-slot:top>
                    <v-text-field
                        v-model="search"
                        label="Search"
                        class="mx-4"
                    ></v-text-field>
                </template>
                <template #item.idCode="{ item }">
                    <a :href = "`/show?id=${item.idCode}`">{{ item.idCode }}</a>
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script>
export default  {
    data() {
        return {
            title : "PDB Browser Blast search",
            query : '',
            blastResults : [],
            error : {},
            search : '',
            headers: [
                { text: 'PDB Id.', value: 'idCode'},
                { text: 'Type', value:'tip'},
                { text: 'Header', value:'desc'},
                { test: 'Title', value:'compound'},
                { text: 'E. Value', value: 'ev'}
            ]
        }
    },
    async fetch() {
            const formatSeq = (s) => {
                return s.replace(/[\n\r]/g,'').replace(/(.{80})/g, '$1\n'); 
            };
            this.query = formatSeq(this.$route.query.query);
            const dataResponse = await fetch(
                this.$config.APIPrefix + "?blast=" + this.$route.query.query
            );
            if (dataResponse.ok) { 
                this.blastResults = await dataResponse.json();
                if (this.blastResults.hits) {
                    this.blastResults = this.blastResults.hits;
                } else {
                    this.error = this.blastResults;
                }
            }
    }
}
</script>
