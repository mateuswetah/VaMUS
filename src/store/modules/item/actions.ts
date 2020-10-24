import { tainacanApi } from '../../axios'

export const fetchItems = ({ commit }: any) => {
    return new Promise((resolve, reject) => { 
        const endpoint = '/items';

        tainacanApi.get(endpoint)
            .then(res => {
                const items = res.data;
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
        const endpoint = '/items/' + collectionId;

        tainacanApi.get(endpoint)
            .then(res => {
                const collectionItems = res.data;
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