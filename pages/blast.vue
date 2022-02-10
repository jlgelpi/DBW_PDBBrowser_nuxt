<template>
    <div class="container">
        <h1>{{title}}</h1>
        <p>Query: {{ query }}</p>
        <p>Num hits: {{blastResults.length}}</p>   
        <table border="0" cellspacing="2" cellpadding="4" id="blastTable">
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
                    <td>{{ hit.idCode}}_{{ hit.sub }}</td>
                    <td>{{ hit.tip}}</td>	
                    <td>{{ hit.desc }}</td>
                    <td>{{ hit.compound }}</td>
                    <td>{{ hit.ev }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default  {
    data() {
        return {
            title : "PDBBrowser Blast search",
            query : '',
            blastResults: [],
            error:{}
        }
    },
    async fetch() {
            this.query = this.$route.query.query;
            const prefix = 'http://mmb.irbbarcelona.org/formacio/~dbw00/PDBBrowser/api/?';
            const dataResponse = await fetch(prefix + "blast=" + this.$route.query.query);
            if (dataResponse.ok) { 
                this.blastResults = await dataResponse.json();
                if (this.blastResults.hits) {
                    this.blastResults = this.blastResults.hits;
                } else {
                    this.error = this.blastResults;
                }

                console.log(this.blastResults)
            }
    }
}
</script>
