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
                                            <td class="text-capitalize">{{ pdbData.header.toLowerCase() }}</td>
                                        </tr>
                                        <tr>
                                            <td>Title</td>
                                            <td class="text-capitalize">{{ pdbData.compound.toLowerCase() }}</td>
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
                                            <td class="text-capitalize">
                                                {{ pdbData.auts.join(', ').toLowerCase()}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Source</td>
                                            <td class="text-capitalize">
                                                {{ pdbData.sources.join(', ').toLowerCase() }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-simple-table>
                            </v-col>
                            <v-col sm="4">
                                <v-card width="250" elevation="0">
                                    <v-img :src="`${this.$config.ImgLink}${pdbData.idCode.toLowerCase()}.png`"/>
                                    <v-card-text>
                                        <a :href="`${this.$config.PDBLink}${pdbData.idCode.toUpperCase()}`" target="_blank">Browse data in Protein Data Bank</a>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="8">
                                <h6>Sequence(s)</h6>
                                <p v-for="sq in pdbData.sequencesFASTA">
                                <pre> {{ sq }} </pre></p>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-sheet>
            <v-btn @click="newSearch()">New Search</v-btn>
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
    methods: {
        newSearch() {
            this.$router.push("/");
        }
    },
    fetchOnServer: false
}

</script>
