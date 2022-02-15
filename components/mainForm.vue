<template>
<v-app>
    <v-main>
        <v-container>
            <v-form ref="mainForm">
                <v-card>
                    <v-container>
                    <v-text-field 
                        @change="submit()" 
                        name="idCode" 
                        maxlength="4" 
                        v-model="idCode" 
                        placeholder="PDB Code"
                        label = "PDB Id"
                    />
                    </v-container>
                </v-card>
                <v-card>
                    <v-container>
                    <h4>Search fields</h4>
                    <v-row>
                        <v-col sm="3">
                            <v-text-field
                                label = "Min. resolution"
                                name="minRes" 
                                v-model="minRes"
                            />
                        </v-col>
                        <v-col sm="3">
                            <v-text-field
                                label = "Max. resolution"
                                name="maxRes" 
                                v-model="maxRes" 
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col><h5>Type of compound</h5></v-col>
                        <v-col sm="2" v-for='(comp, index) in compTypes' :key="index">
                            <v-checkbox :id="index" :value="index" v-model="checkedComps" :label="comp"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col><h5>Type of experiment</h5></v-col>
                        <v-col sm="2" v-for='(exp, index) in expClasses' :key="index">
                            <v-checkbox :id="index" :value="index" v-model="checkedExp" :label="exp"/>
                        </v-col>
                    </v-row>
                    <v-text-field 
                        @change="submit()" 
                        name="query"  
                        v-model="query" 
                        label = "Free text search"
                    />
                    </v-container>
                </v-card>
                <v-card>
                    <v-container>
                        <h4>Sequence search</h4>
                        <v-textarea name="seqQuery" cols="60" v-model="seqQuery" placeholder="Raw Sequence only"></v-textarea>
                        
                        <v-file-input 
                            name="seqFile" id="seqFile" @change="getFile" 
                            style="width:50%"
                            label="Upload sequence file"
                        />
                    </v-container>
                </v-card>
                <v-btn @click="submit()">Submit</v-btn>
                <v-btn @click="reset()">Reset</v-btn>
            </v-form>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
    export default {
        data() {
            return {
                idCode: '',
                minRes: '0.0',
                maxRes: 'Inf',
                query:'',
                seqQuery:'',
                compTypes:[],
                expClasses:[],
                checkedComps:[],
                checkedExp:[]
            }
        },

        methods: {
            submit() {
                if (this.idCode) {
                    this.$router.push({path:`/show?id=${this.idCode}`});
                } else if (this.seqQuery) {
                    this.$router.push({path: `/blast?query=${this.cleanHeader(this.seqQuery)}`});
                } else {
                    const query = {}
                    if (this.minRes != '0.0') {query.minRes = this.minRes;}
                    if (this.maxRes != 'Inf') {query.maxRes = this.maxRes;}
                    if (this.query) {query.query = this.query};
                    if (this.checkedComps.length) {query.checkedComps = this.checkedComps};
                    if (this.checkedExp.length) {query.checkedExp = this.checkedExp};
                    this.$router.push({"path": `/search?query=${JSON.stringify(query)}`});
                }
                
            },
            reset() {
                this.idCode = '';
                this.minRes = '0.0';
                this.maxRes = 'Inf';
                this.query = '';
                this.seqQuery = '';
                this.checkedComps = [];
                this.checkedExp = [];
            },
            cleanHeader(sq) {
                let seq = '';
                let lines = sq.split('\n');
                let shouldSkip = false;
                lines.every( line => {
                    if (!line.match('>')) {
                        seq += line;
                    } else {
                        if (shouldSkip) {
                            return false;
                        }
                        shouldSkip = true;
                    }
                    return true;
                })
                return seq;
            },
            async getFile(e) {
                const file = e;
                if (!file) return;
                
                const readData = (f) => new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsBinaryString(f);
                });
                this.seqQuery = await readData(file);
                this.seqQuery = this.cleanHeader(this.seqQuery);
            }
        },

        async fetch() {
            const response = await fetch(this.$config.APIPrefix + '?glob')
            if (response.ok) {
                const pdbInfo = await response.json();
                this.compTypes = pdbInfo.compType;
                this.expClasses = pdbInfo.expClasse;
            }           
        }
        
    }

</script>