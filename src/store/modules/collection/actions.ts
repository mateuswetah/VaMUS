import { tainacanApi } from '../../axios'
import qs from 'qs'

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

export const fetchCollections = ({ commit }: any, params: any) => {
    return new Promise((resolve, reject) => { 
        const endpoint = '/collections?'

        tainacanApi.get(endpoint + qs.stringify(params))
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

export const fetchInstituteCollections = ({ commit }: any, {vamusInstituteIdentifier, params}: {vamusInstituteIdentifier: string; params: any}) => {
    return new Promise((resolve, reject) => { 
        const endpoint = '/collections?'
        const queryParams = {
            ...params,  
            metaquery: [{
                key: 'vamus_institution_collection',
                value: vamusInstituteIdentifier,
                compare: 'IN'
            }]
        }

        tainacanApi.get(endpoint + qs.stringify(queryParams))
            .then(res => {
                const instituteCollections = res.data;
                const totalInstituteCollections = res.headers['x-wp-total'];

                commit('setInstituteCollections', instituteCollections);
                commit('setTotalInstituteCollections', totalInstituteCollections);

                resolve({ instituteCollections, totalInstituteCollections });
            }) 
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};