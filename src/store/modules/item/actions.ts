import { tainacanApi } from '../../axios'
import { stringify } from 'qs';

export const fetchItems = ({ commit }: any, params: any) => {
    return new Promise((resolve, reject) => { 
        let endpoint = '/items?fetch_only=thumbnail&';

        endpoint += stringify(params);

        tainacanApi.get(endpoint)
            .then(res => {
                const items = res.data.items;
                commit('setItems', items);

                resolve({
                    items: items,
                    total: res.headers['x-wp-total'] 
                });
            }) 
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};

export const fetchCollectionItems = ({ commit }: any, { collectionId }: {collectionId: string}) => {
    return new Promise((resolve, reject) => { 
        const endpoint = '/items/' + collectionId + '?fetch_only=thumbnail';

        tainacanApi.get(endpoint)
            .then(res => {
                const collectionItems = res.data.items;
                commit('setCollectionItems', collectionItems);

                resolve({
                    collectionItems: collectionItems,
                    total: res.headers['x-wp-total'] 
                });
            }) 
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};