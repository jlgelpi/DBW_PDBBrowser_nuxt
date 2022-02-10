export default {
    components: true,
    target: 'static',
    plugins: ['~/plugins/bootstrap-vue.js'],
    publicRuntimeConfig: {
        baseURL: process.env.BASE_URL,
        APIPrefix: "http://mmb.irbbarcelona.org/formacio/~dbw00/PDBBrowser/api/"
    },
    head: {
        title: 'PDB-Browser 2022 (Nuxt version)',
        meta: [
            { charset: 'utf-8' }
        ]
    },
    router: {
        base: '/jspdb/'
    }
}