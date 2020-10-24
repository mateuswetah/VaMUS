import { tainacanApi } from '../../axios'
import { stringify } from 'qs';

export const fetchItems = ({ commit }: any, params: any) => {
    return new Promise((resolve, reject) => { 
        let endpoint = '/items?fetch_only=thumbnail,title,description&';

        endpoint += stringify(params);

        tainacanApi.get(endpoint)
            .then(res => {
                const items = res.data.items;
                const totalItems = res.headers['x-wp-total'];
                commit('setItems', items);
                commit('setTotalItems', totalItems);

                resolve({ items, totalItems });
            }) 
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};

export const fetchCollectionItems = ({ commit }: any, { collectionId, params }: {collectionId: string; params: any}) => {
    return new Promise((resolve, reject) => { 
        let endpoint = '/collection/' + collectionId + '/items/?fetch_only=thumbnail,title,description&';
        endpoint += stringify(params);

        tainacanApi.get(endpoint)
            .then(res => {
                const collectionItems = res.data.items;
                const totalCollectionItems = res.headers['x-wp-total'];
                commit('setCollectionItems', collectionItems);
                commit('setTotalCollectionItems', totalCollectionItems);

                resolve({ collectionItems, totalCollectionItems });
            }) 
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};