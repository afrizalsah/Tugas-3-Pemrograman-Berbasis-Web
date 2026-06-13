const ApiService = {

    async getData() {

        const response =
            await fetch(
                'data/dataBahanAjar.json'
            );

        const data =
            await response.json();

        let trackingObj = {};

        if (
            Array.isArray(data.tracking)
        ) {

            data.tracking.forEach(item => {

                const key =
                    Object.keys(item)[0];

                trackingObj[key] =
                    item[key];

            });

        }

        data.tracking = trackingObj;

        return data;

    }

};