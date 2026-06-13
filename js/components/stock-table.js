Vue.component('ba-stock-table', {

    template: '#tpl-stock-table',

    props: {
        stok: Array,
        upbjjList: Array,
        kategoriList: Array
    },

    data() {
        return {
            filterUpbjj: '',
            filterKategori: '',
            onlyWarning: false,
            sortBy: '',

            showForm: false,
            isEdit: false,
            editKode: null,

            // ✅ FIX 1: aman jika stok belum ada
            localStok: this.stok
                ? JSON.parse(JSON.stringify(this.stok))
                : [],

            form: {
                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                lokasiRak: '',
                harga: 0,
                qty: 0,
                safety: 0,
                catatanHTML: ''
            }
        };
    },

    // ✅ FIX 2: sinkronisasi ketika prop stok berubah (setelah API load)
    watch: {
        stok: {
            immediate: true,
            deep: true,
            handler(val) {
                if (val) {
                    this.localStok =
                        JSON.parse(JSON.stringify(val));
                }
            }
        }
    },

    computed: {
        filteredData() {
            let data = [...this.localStok];

            if (this.filterUpbjj) {
                data = data.filter(d => d.upbjj === this.filterUpbjj);
            }
            if (this.filterKategori) {
                data = data.filter(d => d.kategori === this.filterKategori);
            }
            if (this.onlyWarning) {
                data = data.filter(d => d.qty < d.safety || d.qty === 0);
            }
            if (this.sortBy) {
                data.sort((a, b) => {
                    if (this.sortBy === 'judul') {
                        return a.judul.localeCompare(b.judul);
                    }
                    return a[this.sortBy] - b[this.sortBy];
                });
            }

            return data;
        }
    },

    methods: {

        resetFilter() {
            this.filterUpbjj = '';
            this.filterKategori = '';
            this.onlyWarning = false;
            this.sortBy = '';
        },

        openTambahForm() {
            this.isEdit = false;
            this.editKode = null;
            this.resetForm();
            this.showForm = true;
        },

        editData(item) {
            this.isEdit = true;
            this.editKode = item.kode;
            this.form = { ...item };
            this.showForm = true;
        },

        resetForm() {
            this.form = {
                kode: '', judul: '', kategori: '',
                upbjj: '', lokasiRak: '',
                harga: 0, qty: 0, safety: 0, catatanHTML: ''
            };
        },

        tambahData() {
            this.localStok.push({ ...this.form });
        },

        simpanEdit() {
            const index = this.localStok.findIndex(
                item => item.kode === this.editKode
            );
            if (index !== -1) {
                this.localStok.splice(index, 1, { ...this.form });
            }
        },

        konfirmasiSimpan() {
            if (!this.form.kode || !this.form.judul ||
                !this.form.kategori || !this.form.upbjj) {
                Swal.fire({ icon: 'warning', title: 'Data Belum Lengkap' });
                return;
            }

            if (this.isEdit) {
                this.simpanEdit();
            } else {
                this.tambahData();
            }

            Swal.fire({ icon: 'success', title: this.isEdit ? 'Data Berhasil Diupdate' : 'Data Berhasil Disimpan' });
            this.showForm = false;
            this.resetForm();
        },

        // ✅ FIX 3: hapus berdasarkan kode, bukan index filteredData
        hapusData(item) {
            Swal.fire({
                title: 'Hapus Data?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Hapus'
            }).then(result => {
                if (result.isConfirmed) {
                    const index = this.localStok.findIndex(
                        d => d.kode === item.kode  // ← cari by kode
                    );
                    if (index !== -1) {
                        this.localStok.splice(index, 1);
                    }
                }
            });
        }

    }
});