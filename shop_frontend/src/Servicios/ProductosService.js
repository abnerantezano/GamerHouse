import axios from 'axios';

export class ProductosService {
    baseUrl = 'https://gamerhouse-260ba47e0100.herokuapp.com/api/v1/productos';

    getProductos() {
        return axios.get(this.baseUrl,{withCredentials:true})
            .then(res => res.data); 
    }

    getProductosPorCategoria(idCategoria) {
        return axios.get( this.baseUrl + `?categoria=${idCategoria}`,{withCredentials:true})
            .then(res => res.data); 
    }

    getProducto(idProducto) {
        return axios.get(this.baseUrl + `/${idProducto}`,{withCredentials:true})
            .then(res => res.data);
    }
}
export default new ProductosService();