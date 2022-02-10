<template>
    <div class="container">
        <h1>{{title}}</h1>
        <p>Query: {{ query }}</p>
        <p>Num hits: {{results.length}}</p>   
        <table border="0" cellspacing="2" cellpadding="4" id="searchTable">
            <thead>
                <tr>
            <th>idCode</th>
            <th>Header</th>
            <th>Compound</th>
            <th>Resolution</th>
            <th>Exp. Type</th>
            <th>Source</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="hit in results">
            <td>{{ hit.idCode }}</a></td>
            <td>{{ hit.header }}</td>
            <td>{{ hit.compound }}</td>
            <td>{{ hit.resolution }}</td>
            <td>{{ hit.expType }}</td>
            <td>{{ hit.source }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default  {
    data() {
        return {
            title : "PDBBrowser search",
            query : '',
            results: [],
            error:{}
        }
    },
    async fetch() {
            this.query = this.$route.query.query;
            const prefix = 'http://mmb.irbbarcelona.org/formacio/~dbw00/PDBBrowser/api/?';
            const dataResponse = await fetch(prefix + "search=" + this.$route.query.query);
            if (dataResponse.ok) { 
                this.results = await dataResponse.json();
                if (this.results.hits) {
                    this.results = this.results.hits;
                } else {
                    this.error = this.results;
                }

                console.log(this.results)
            }
    }
}
</script>
