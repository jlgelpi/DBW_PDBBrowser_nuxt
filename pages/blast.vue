<template>
    <div class="container">
        <h1>{{title}}</h1>
        <p>Query: {{ query }}</p>
        <div v-if="pending">
            <p>Waiting for results...</p>
        </div>
        <div v-else>    
            <p>Num hits: {{blastResults.length}}</p>   
            <table v-if="blastResults.length" border="0" cellspacing="2" cellpadding="4" id="blastTable">
                <thead>
                <tr>
                    <th>idCode</th>
                    <th>Type</th>
                    <th>Header</th>
                    <th>Compound</th>
                    <th>E. value</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="hit in blastResults">
                    <td><nuxt-link :to="{path:'show', query:{'id':hit.idCode}}">{{ hit.idCode}}_{{ hit.sub }}</nuxt-link></td>
                    <td>{{ hit.tip}}</td>	
                    <td>{{ hit.desc }}</td>
                    <td>{{ hit.compound }}</td>
                    <td>{{ hit.ev }}</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>

<script>
export default  {
    data() {
        return {
            title : "PDBBrowser Blast search",
            query : '',
            blastResults : [],
            error : {},
            pending: 1
        }
    },
    async fetch() {
            this.query = this.$route.query.query;
            const dataResponse = await fetch(this.$config.APIPrefix + "?blast=" + this.$route.query.query);
            if (dataResponse.ok) { 
                this.blastResults = await dataResponse.json();
                this.pending = 0;
                if (this.blastResults.hits) {
                    this.blastResults = this.blastResults.hits;
                } else {
                    this.error = this.blastResults;
                }
            }
    }
}
</script>
