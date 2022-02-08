<template>
    <div class="container">
        <h1>{{title}}</h1>
        {{ blastResults }}
    </div>
</template>

<script>
export default  {
    data() {
        return {
            title : "PDBBrowser",
            blastResults: [],
        }
    },
    async fetch() {
           const prefix = 'http://mmb.irbbarcelona.org/formacio/~dbw00/PDBBrowser/api/?';
           const dataResponse = await fetch(prefix + "blast=" + this.$route.query.query);
           this.blastResults = dataResponse.json();
    }
}
</script>
