import axios from 'axios';

export class BrandService {

    getBrands() {
        return axios.get('/brands.json')
                .then(res => res.data.data);
    }

    // getCustomers(params) {
    //     return axios.get('https://www.primefaces.org/data/brands',{params: params})
    //             .then(res => res.data)
    // }
}