import axios from 'axios';

// Tainacan API Axios
export const tainacanApi = axios.create({
    baseURL: 'http://vamus.tainacan.org/wp-json/tainacan/v2'
});

export default { tainacanApi };