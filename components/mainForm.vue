<template>
    <div id="mainForm">
        <form
          accept-charset="UTF-8"
          v-on:submit.prevent="onSubmit()"
          method="POST"
        >
        <div class="row" style="border-bottom: solid 1px">
            <div class="form-group">
                <label><b>PDB Id</b></label>
                <input type="text" name="idCode" size="5" maxlength="4" v-model="inputData.idCode" placeholder=""/>
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
                        From <input type="text" name="minRes" size="5" v-model="inputData.minRes">
                        to <input type="text" name="maxRes" size="5" v-model="inputData.maxRes" >
                    </p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label><b>Compound Type:</b></label>
                    <div class="form-check-inline form-check">
                        <div v-for='comp in compTypes' :key='comp._id'>
                            <input class="form-check-input" type="checkbox" :id="comp._id" :value="comp._id" v-model="inputData.checkedComps" :name="comp._id" />
                            <label class="form-check-label" :for="comp._id">{{comp._id}}&nbsp;</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label><b>Exp. Type:</b></label>
                    <div class="form-check" >
                        <div v-for='exp in expClasses' :key='exp._id'>
                            <input class="form-check-input" type="checkbox" :id="exp._id" :value="exp._id" :name="exp._id" v-model="inputData.checkedExp" /> 
                            <label :for="exp._id" class="form-check-label" >{{ exp._id }}&nbsp; </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" style="border-bottom: 1px solid">
            <div class="col-md-6">
                <label><b>Free Text Search</b></label>
                <div class="form-group">
                    <input type="text" name="query" v-model="inputData.query" style="width:100%" />
                </div>
            </div>
        </div>
        <div class="row" style="border-bottom: 1px solid">
            <div class="col-md-6">
                <label><h4>Sequence search</h4></label>
                <div class="form-group">
                    <textarea class="form-control" name="seqQuery" style="width:100%" v-model="inputData.seqQuery"></textarea><br>
                    Upload sequence file: <input type="file" name="seqFile" v-bind="inputData.seqFile" style="width:100%"/>
                </div>
            </div>
        </div>
        <div class="row">
            <p>
            <button type='submit' class="btn btn-primary">Submit</button>
            <button type='reset' class="btn btn-primary">Reset</button>
            <button class="btn btn-primary" onclick="window.location.href='/?new=1'">New Search</button>
            </p>
        </div>
    </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                inputData:{
                    idCode: '',
                    minRes: '0.0',
                    maxRes: 'Inf',
                    query:'',
                    seqQuery:'',
                    seqFile:'',
                    checkedComps:[],
                    checkedExp:[]
                },
                compTypes:[],
                expClasses:[],
            }
        },

        methods: {
            onSubmit() {
                console.log(this.inputData);
                return false;
            }
        },

        async fetch() {
            const response = await fetch('http://mmb.irbbarcelona.org/api/pdb/info')
            if (response.ok) {
                const pdbInfo = await response.json();
                this.compTypes = pdbInfo.Data.compTypes;
                this.expClasses = pdbInfo.Data.expClasses;
            }           
        }
        
    }

</script>
