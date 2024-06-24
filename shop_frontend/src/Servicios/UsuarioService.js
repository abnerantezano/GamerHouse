import axios from 'axios';

export class UsuarioService {
    baseUrl = 'https://gamerhouse-260ba47e0100.herokuapp.com/api/v1/usuarios';

    postUsuario(datos){
        return axios.post(this.baseUrl, datos,{withCredentials:true})
            .then(res => res.data); 
    }

    getUsuarios(){
        return axios.get(this.baseUrl,{withCredentials:true})
            .then(res => res.data); 
    }
    
}

export default new UsuarioService();