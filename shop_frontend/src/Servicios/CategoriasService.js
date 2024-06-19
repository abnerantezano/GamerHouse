import axios from 'axios';

export class CategoriasService {
    baseUrl = 'https://gamerhouse-260ba47e0100.herokuapp.com/api/v1/categorias';

    getCategorias() {
        return axios.get(this.baseUrl)
            .then(res => res.data); 
    }

}

export default new CategoriasService();