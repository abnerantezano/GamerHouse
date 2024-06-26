import axios from 'axios';

export class CarritoService {
    baseUrl = 'https://gamerhouse-260ba47e0100.herokuapp.com/api/v1/carritos';

    postItem(idCarrito, items){
        return axios.post(this.baseUrl + `/${idCarrito}`, items, {withCredentials:true})
            .then(res => res.data); 
    }

    getItems(idCarrito){
        return axios.get(this.baseUrl + `/${idCarrito}`,{withCredentials:true})
            .then(res => res.data); 
    }

    deleteItem(idCarrito,idItem){
        return axios.delete(this.baseUrl + `/${idCarrito}/${idItem}`,{withCredentials:true})
            .then(res => res.data);
    }

    patchItem(idCarrito, idItem, campos) {
        return axios.patch(this.baseUrl + `/${idCarrito}/${idItem}`, campos,{withCredentials:true})
            .then(res => res.data);
    }
}

export default new CarritoService();