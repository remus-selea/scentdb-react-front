import axios from 'axios';

export class BrandService {

    getBrands() {
        return axios.get('/brands.json')
                .then(res => res.data.data);
    }

}