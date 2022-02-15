<template>
    <v-app>
        <v-main>
            <v-container>
                <h1>{{title}}</h1>
                <mainForm />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                title: 'DBW - PDBBrowser (NuxtJs Version)',
            }
        },
        head() {                            
            return {
                title: this.title,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'Nuxt-JS version of DBW PDBBrowser'
                    },
                    {  hid: 'viewport',
                       name: 'viewport',
                       content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
                    }
                ]
            }
        }       
    }

</script>
