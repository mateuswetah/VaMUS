import { tainacanApi } from '../../axios'

export const fetchCollections = ({ commit }: any) => {
    return new Promise((resolve, reject) => { 
        const endpoint = '/collections';

        tainacanApi.get(endpoint)
            .then(res => {
                const collections = res.data;
                const totalCollections = res.headers['x-wp-total'];

                commit('setCollections', collections);
                commit('setTotalCollections', totalCollections);

                resolve({ collections, totalCollections });
            }) 
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};