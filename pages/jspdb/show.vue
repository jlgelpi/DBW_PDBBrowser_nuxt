<template>
<div class="container">
    <h1>{{ title }} - {{ pdbData.idCode}}</h1>
    <p v-if="$fetchState.pending">Waiting data...</p>
    <p v-else-if="error.message">{{error.message}}</p>
    <table v-else class="table table-hover">
    <tbody>
        <tr>
            <td>PDB reference</td>
            <td>{{ pdbData.idCode }}</td>
            <td rowspan="5">
                <a :href="PDBLink" target="_blank">
                    <img :src="ImgLink" border="0" width="250" ><br>
                        Link to Protein Data Bank</a>
            </td>
        </tr>
        <tr>
            <td>Header</td>
            <td>{{ pdbData.header }}</td>
        </tr>
        <tr>
            <td>Title</td>
            <td>{{ pdbData.compound }}</td>
        </tr>
        <tr>
            <td>Resolution</td>
            <td v-if="pdbData.resolution">{{ pdbData.resolution }}</td>
            <td v-else>N.D.</td>
        </tr>
        <tr>
            <td>Ascession Date</td>
            <td>{{ pdbData.ascessionDate }}</td>
        </tr>
        <tr>
            <!--$expTypeArray is generated in globals.inc.php-->
            <td>Experiment type</td> 
            <td colspan="2">{{ expTypes[pdbData.idExpType].ExpType }}</td>
        </tr>
        <tr>
            <td>Authors</td>
            <td colspan="2">
                <span v-for="aut in pdbData.auts">{{ aut }}&nbsp;</span>
            </td>
        </tr>
        <tr>
            <td>Source</td>
            <td colspan="2">
                <span v-for="s in pdbData.sources">{{s}}</span>
                
                </td>
        </tr>
        <tr>
            <td>Sequence(s)</td>
            <td colspan="2">
                <p v-for="sq in pdbData.sequencesFASTA">
                    <pre> {{ sq }} </pre></p>
           </td>
        </tr>
    </tbody>
</table>
</div>
</template>

<script>

export default {
    data() {
        return {
            title : "PDBBrowser",
            PDBLink : "http://www.pdb.org/pdb/explore.do?structureId=",
            ImgLink : "http://mmb.pcb.ub.es/api/pdb/",
            pdbData : {},
            expTypes : {},
            error:{}
        }
    },
    async fetch() {
            const prefix = 'http://mmb.irbbarcelona.org/formacio/~dbw00/PDBBrowser/api/?';
            const response = await fetch(prefix + 'glob')
            if (response.ok) {
                const pdbInfo = await response.json();
                this.expTypes = pdbInfo.expType;
            }           

            const dataResponse = await fetch(
                prefix + "show=" + this.$route.query.id
            )
            if (dataResponse.ok) {
                this.pdbData = await dataResponse.json();
                if (this.pdbData.idCode) {
                    this.PDBLink += this.pdbData.idCode;
                    this.ImgLink += this.pdbData.idCode.toLowerCase() + ".png";
                } else {
                    this.error = this.pdbData
                }
            }
        },
    fetchOnServer: false
}

</script>
