Vue.component('do-tracking', {

    template: '#tpl-do-tracking',

    props: {

        trackingList: Object

    },

    methods: {

        showPerjalanan(item) {

            let isi =
                '<div style="text-align:left">';

            item.perjalanan.forEach(
                (p,i) => {

                isi += `

                <div
                    style="
                    margin-bottom:15px;
                    padding:12px;
                    border-radius:8px;
                    background:#f4f6f9;
                    border-left:5px solid #3498db;
                    ">

                    <div
                        style="
                        font-weight:bold;
                        ">

                        Step ${i + 1}

                    </div>

                    <div
                        style="
                        font-size:12px;
                        color:#666;
                        margin:4px 0;
                        ">

                        ${p.waktu}

                    </div>

                    <div>

                        ${p.keterangan}

                    </div>

                </div>

                `;

            });

            isi += '</div>';

            Swal.fire({

                title:
                    `Tracking ${item.paket}`,

                html:
                    isi,

                width:
                    600,

                confirmButtonText:
                    'Tutup',

                confirmButtonColor:
                    '#3085d6'

            });

        }

    }

});