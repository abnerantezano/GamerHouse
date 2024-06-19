import axios from 'axios';

export class CategoriasService {
    baseUrl = 'http://54.242.254.159:8000/api/v1/categorias';

    getCategorias() {
        return axios.get(this.baseUrl)
            .then(res => res.data); 
    }

}

export default new CategoriasService();