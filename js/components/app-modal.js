Vue.component('app-modal', {

    template: '#tpl-app-modal',

    props: {

        show: {
            type: Boolean,
            default: false
        },

        title: {
            type: String,
            default: ''
        }

    }

});