import axios from 'axios';
import TokenService from './TokenService';

export class IniciarSesionService {
    baseUrl = 'https://gamerhouse-260ba47e0100.herokuapp.com/api/v1/login';

    async postUsuario(datos) {
        console.log('Login data:', datos); 
        try {
            const response = await axios.post(this.baseUrl, datos, { withCredentials: true });
            const token = response.data.access; 
            TokenService.setToken(token); 
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            throw error;
        }
    }
    
}

export default new IniciarSesionService();