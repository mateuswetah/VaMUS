import axios from 'axios';

// Tainacan API Axios
export const tainacanApi = axios.create({
    baseURL: 'https://vamus.tainacan.org/wp-json/tainacan/v2'
});

// Mapas API Axios
export const mapasApi = axios.create({
    baseURL: 'https://museus.cultura.gov.br/api'
});

export default { tainacanApi };