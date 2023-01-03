export default {
    components: true,
    ssr: false,
    publicRuntimeConfig: {
        APIPrefix: "https://formacio.bq.ub.edu/PDBBrowser/api/",
        PDBLink : "https://www.rcsb.org/structure/",
        ImgLink : "https://mmb.irbbarcelona.org/api/pdb/"
    },
    head: {
        title: 'PDB-Browser 2022 (Nuxt version)',
        meta: [
            { charset: 'utf-8' }
        ]
    },
    router: {
        base: '/jspdb/'
    },
    buildModules: [
        '@nuxtjs/vuetify'
    ]
}
