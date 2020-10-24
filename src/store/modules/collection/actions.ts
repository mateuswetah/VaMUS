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


export const fetchCollection = ({ commit }: any, collectionId: string) => {
    return new Promise((resolve, reject) => { 
        const endpoint = '/collections/' + collectionId;

        tainacanApi.get(endpoint)
            .then(res => {
                const collection = res.data;

                commit('setCollection', collection);

                resolve({ collection });
            }) 
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};