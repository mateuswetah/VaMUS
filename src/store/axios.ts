import axios from 'axios';

// Tainacan API Axios
export const tainacanApi = axios.create({
    baseURL: 'https://vamus.tainacan.org/wp-json/tainacan/v2'
});

// Mapas API Axios
export const mapasApi = axios.create({
    baseURL: 'https://vamus.tainacan.org/vamus_mapas/api/'
});

export default { tainacanApi };