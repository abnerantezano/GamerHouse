import axios from 'axios';

export class ProductosService {
    baseUrl = 'http://54.242.254.159:8000/api/v1/productos';

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