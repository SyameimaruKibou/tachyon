import Vue from 'vue'

import './styles/quasar.sass'
import lang from 'quasar/lang/zh-hans.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar,Notify,Dialog } from 'quasar'

Vue.use(Quasar, {
    config: {
        notify: {}
    },
    plugins: {
        Notify,
        Dialog
    },
    lang: lang
})
