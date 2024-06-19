import axios from 'axios';

export class ProductosService {
    baseUrl = 'https://gamerhouse-260ba47e0100.herokuapp.com/api/v1/productos';

    getProductos() {
        return axios.get(this.baseUrl)
            .then(res => res.data); 
    }

    getProductosPorCategoria(idCategoria) {
        return axios.get( this.baseUrl + `?categoria=${idCategoria}`)
            .then(res => res.data); 
    }

    getProducto(idProducto) {
        return axios.get(this.baseUrl + `/${idProducto}`)
            .then(res => res.data);
    }
}
export default new ProductosService();