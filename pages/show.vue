<template>
<v-app>
    <v-main>
        <v-container>
            <v-sheet
                color="white"
                elevation="3"
                outlined
                width="900"
            >
                <v-card>
                    <v-container>
                    <h1>{{ title }} - {{ this.$route.query.id}}</h1>
                    <p v-if="$fetchState.pending">Waiting data...</p>
                    <p v-else-if="error.message">{{error.message}}</p>
                    </v-container>
                </v-card>
                <v-card v-if="pdbData.idCode">
                    <v-container>
                        <v-row>
                            <v-col sm="8">
                                <v-simple-table>
                                    <tbody>
                                        <tr>
                                            <td>PDB reference</td> <td>{{ pdbData.idCode }}</td>
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
                                            <td>
                                                <span v-if="pdbData.resolution">{{ pdbData.resolution }}</span>
                                                <span v-else>N.D.</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ascession Date</td>
                                            <td>{{ pdbData.ascessionDate }}</td>
                                        </tr>
                                        <tr>
                                            <td>Experiment type</td>
                                            <td>{{ pdbData.ExpType }}</td>
                                        </tr>
                                        <tr>
                                            <td>Authors</td>
                                            <td>
                                                <span v-for="aut in pdbData.auts">{{ aut }}&nbsp;</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Source</td>
                                            <td>
                                                <span v-for="s in pdbData.sources">{{s}}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-simple-table>
                            </v-col>
                            <v-col sm="4">
                <a :href="`${this.$config.PDBLink}${pdbData.idCode.toUpperCase()}`" target="_blank">
                    <img :src="`${this.$config.ImgLink}${pdbData.idCode.toLowerCase()}.png`" border="0" width="250" ><br>
                        Link to Protein Data Bank</a>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="1"/>
                            <v-col sm="7">
                        <h6>Sequence(s)</h6>
                <p v-for="sq in pdbData.sequencesFASTA">
                    <pre> {{ sq }} </pre></p>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-sheet>
        </v-container>
    </v-main>
</v-app>
</template>

<script>

export default {
    data() {
        return {
            title : "PDB Browser",
            pdbData : {},
            error:{}
        }
    },
    async fetch() {
            const dataResponse = await fetch(
                `${this.$config.APIPrefix}?show=${this.$route.query.id}`
            )
            if (dataResponse.ok) {
                this.pdbData = await dataResponse.json();
                if (!this.pdbData.idCode) {
                    this.error = this.pdbData
                }
            }
        },
    fetchOnServer: false
}

</script>
