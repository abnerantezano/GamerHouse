import axios from 'axios';

export class RegistroService {
    baseUrl = 'https://gamerhouse-260ba47e0100.herokuapp.com/api/v1/register';

    postUsuario(datos){
        return axios.post(this.baseUrl, datos,{withCredentials:true})
            .then(res => res.data); 
    }
    
}

export default new RegistroService();