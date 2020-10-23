import { tainacanApi } from '../../axios'

export const fetchCollections = ({ commit }: any) => {
    return new Promise((resolve, reject) => { 
        const endpoint = '/collections';

        tainacanApi.get(endpoint)
            .then(res => {
                const collections = res.data;
                commit('setCollections', collections);

                resolve({
                    collections: collections,
                    total: res.headers['x-wp-total'] 
                });
            }) 
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};