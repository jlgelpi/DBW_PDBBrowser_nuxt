<template>
    <v-app>
        <v-main>
            <v-container>
                <h1>{{title}}</h1>
                <p>Query:<br/>
                    <pre>{{ query }}</pre>
                </p>
                <p v-if="$fetchState.pending">Waiting for Blast results...</p>
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
                            <nuxt-link :to = "`/show?id=${item.idCode}`">{{ item.idCode }}_{{ item.sub }}</nuxt-link>
                        </template>
                    </v-data-table>
                </div>
                <v-btn @click="newSearch()">New Search</v-btn>
            </v-container>
        </v-main>
    </v-app>        
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
                `${this.$config.APIPrefix}?blast=${this.$route.query.query}`
            );
            if (dataResponse.ok) { 
                this.blastResults = await dataResponse.json();
                if (this.blastResults.hits) {
                    this.blastResults = this.blastResults.hits;
                } else {
                    this.error = this.blastResults;
                }
            }
    },
    methods: {
        newSearch() {
            this.$router.push("/");
        }
    },
    fetchOnServer: false
}
</script>
