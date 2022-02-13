export default {
    components: true,
    ssr: false,
    plugins: ['~/plugins/bootstrap-vue.js'],
    publicRuntimeConfig: {
        APIPrefix: "http://mmb.irbbarcelona.org/formacio/~dbw00/PDBBrowser/api/",
        PDBLink : "https://www.rcsb.org/structure/",
        ImgLink : "http://mmb.pcb.ub.es/api/pdb/"
    },
    head: {
        title: 'PDB-Browser 2022 (Nuxt version)',
        meta: [
            { charset: 'utf-8' }
        ]
    },
    router: {
//        base: '/jspdb/'
          base: '/formacio/jspdb/'
    },
    buildModules: [
        '@nuxtjs/vuetify'
    ]
}
