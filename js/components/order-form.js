Vue.component('order-form', {

    template: '#tpl-order-form',

    props: {

        paketList: Array,
        pengirimanList: Array,
        trackingList: Object

    },

    data() {

        return {

            newDO: {

                nomorDO: '',
                nim: '',
                nama: '',
                ekspedisi: '',
                paket: '',
                tanggalKirim: '',
                total: 0

            }

        };

    },

    computed: {

        selectedPaket() {

            return this.paketList.find(
                p => p.kode === this.newDO.paket
            );

        },

        nextNomorDO() {

            const tahun =
                new Date().getFullYear();

            const existing =
                Object.keys(this.trackingList);

            const nextSeq =
                existing.length + 1;

            return `DO${tahun}-${String(nextSeq).padStart(4,'0')}`;

        }

    },

    watch: {

        selectedPaket(newVal) {

            this.newDO.total =
                newVal
                    ? newVal.harga
                    : 0;

        }

    },

    methods: {

        submitDO() {

            if (
                !this.newDO.nim ||
                !this.newDO.nama ||
                !this.newDO.ekspedisi ||
                !this.newDO.paket
            ) {

                Swal.fire({

                    icon:'warning',

                    title:'Data Belum Lengkap',

                    text:'Silakan lengkapi semua field'

                });

                return;

            }

            const nomor =
                this.nextNomorDO;

            const newData = {

                nim:
                    this.newDO.nim,

                nama:
                    this.newDO.nama,

                status:
                    'Dalam Proses',

                ekspedisi:
                    this.newDO.ekspedisi,

                tanggalKirim:
                    this.newDO.tanggalKirim
                    ||
                    new Date()
                    .toISOString()
                    .split('T')[0],

                paket:
                    this.newDO.paket,

                total:
                    this.newDO.total,

                perjalanan: [

                    {

                        waktu:
                            new Date()
                            .toLocaleString('id-ID'),

                        keterangan:
                            'Data DO dibuat dan menunggu pengiriman'

                    }

                ]

            };

            this.$emit(
                'add-do',
                nomor,
                newData
            );

            Swal.fire({

                icon:'success',

                title:'Data Berhasil Disimpan',

                html:`

                    <p>
                    Nomor DO:
                    <b>${nomor}</b>
                    </p>

                    <p>
                    Nama:
                    <b>${this.newDO.nama}</b>
                    </p>

                `

            });

            this.resetForm();

        },

        resetForm() {

            this.newDO = {

                nomorDO:
                    this.nextNomorDO,

                nim:'',
                nama:'',
                ekspedisi:'',
                paket:'',
                tanggalKirim:'',
                total:0

            };

        }

    },

    mounted() {

        this.newDO.nomorDO =
            this.nextNomorDO;

    }

});