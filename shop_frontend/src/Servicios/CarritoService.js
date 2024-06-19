import axios from 'axios';

export class CarritoService {
    baseUrl = 'http://54.242.254.159:8000/api/v1/carritos';

    postItem(idCarrito, items){
        return axios.post(this.baseUrl + `/${idCarrito}`, items)
            .then(res => res.data); 
    }

    getItems(idCarrito){
        return axios.get(this.baseUrl + `/${idCarrito}`)
            .then(res => res.data); 
    }

    deleteItem(idCarrito,idItem){
        return axios.delete(this.baseUrl + `/${idCarrito}/${idItem}`)
            .then(res => res.data);
    }

    patchItem(idCarrito, idItem, campos) {
        return axios.patch(this.baseUrl + `/${idCarrito}/${idItem}`, campos)
            .then(res => res.data);
    }
}

export default new CarritoService();