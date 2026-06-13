Vue.component('status-badge', {

    template: '#tpl-status-badge',

    props: {

        qty: {
            type: Number,
            required: true
        },

        safety: {
            type: Number,
            required: true
        }

    },

    computed: {

        badgeText() {

            if (this.qty === 0) {

                return '❌ Kosong';

            }

            if (this.qty < this.safety) {

                return '⚠️ Menipis';

            }

            return '✅ Aman';

        },

        badgeClass() {

            if (this.qty === 0) {

                return 'danger';

            }

            if (this.qty < this.safety) {

                return 'warning';

            }

            return 'aman';

        }

    }

});