<template>
    <div id="mainForm">
        <!-- <form
          accept-charset="UTF-8"
          v-on:submit.prevent="onSubmit()"
          method="POST"
        > -->
        <div class="row" style="border-bottom: solid 1px">
            <div class="form-group">
                <label><b>PDB Id</b></label>
                <input type="text" v-on:change="submit()" name="idCode" size="5" maxlength="4" v-model="idCode" placeholder="PDB Code"/>
            </div>
        </div>
        <div class="row">
            <h3>Search fields</h3>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label><b>Resolution:</b></label>
                    <p>                    
                        From <input type="text" name="minRes" size="5" v-model="minRes">
                        to <input type="text" name="maxRes" size="5" v-model="maxRes" >
                    </p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label>Compound Type:</label>
                    <div class="form-check">
                        <div style="display:block" v-for='(comp, index) in compTypes' :key="index">
                            <input class="form-check-input" type="checkbox" :id="index" :value="index" 
                            v-model="checkedComps" /> {{ comp }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label>Exp. Type:</label>
                    <div class="form-check">
                        <div v-for='(exp, index) in expClasses' :key='index'>
                            <input class="form-check-input" type="checkbox" :id="index" :value="index" 
                            v-model="checkedExp" /> {{ exp }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" style="border-bottom: 1px solid">
            <div class="col-md-6">
                <label><b>Free Text Search</b></label>
                <div class="form-group">
                    <input type="text" name="query" v-model="query" v-on:change="submit()" style="width:100%" />
                </div>
            </div>
        </div>
        <div class="row" style="border-bottom: 1px solid">
            <div class="col-md-6">
                <label><h4>Sequence search</h4></label>
                <div class="form-group">
                    <textarea class="form-control" name="seqQuery" rows="4" cols="60" style="width:100%"
                     v-model="seqQuery"></textarea><br>
                    Upload sequence file: <input type="file" name="seqFile" width="50" style="width:100%"
                     @change="getFile"/>
                </div>
            </div>
        </div>
        <div class="row">
            <p>
            <button class="btn btn-primary" v-on:click="submit()">Submit</button>
            <button class="btn btn-primary" v-on:click="reset()">Reset</button>
            </p>
        </div>
    <!-- </form> -->
    </div>
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
                    this.$router.push({"path":"/jspdb/show?id=" + this.idCode});
                } else if (this.seqQuery) {
                    this.$router.push({"path": "/jspdb/blast?query=" + this.seqQuery});
                } else {
                    this.$router.push({"path": "/jspdb/search?query=" + JSON.stringify(this.$data)});
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
            async getFile(e) {
                const file = e.target.files[0];
                
                if (!file) return;
                
                const readData = (f) => new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsBinaryString(f);
                });
                this.seqQuery = await readData(file);
            }
        },

        async fetch() {
            const response = await fetch('http://mmb.irbbarcelona.org/formacio/~dbw00/PDBBrowser/api/?glob')
            if (response.ok) {
                const pdbInfo = await response.json();
                this.compTypes = pdbInfo.compType;
                this.expClasses = pdbInfo.expClasse;
            }           
        }
        
    }

</script>