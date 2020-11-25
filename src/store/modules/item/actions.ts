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

export const fetchItem = ({ commit }: any, itemId: string) => {
    return new Promise((resolve, reject) => { 
        const endpoint = `/items/${itemId}?&fetch_only=title,description,document_type,document,document_as_html`;
        tainacanApi.get(endpoint)
            .then(res => {
                const item = res.data;
                commit('setItem', item);
                resolve(item);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
};

export const fetchItemMetadata = ({ commit }: any, itemId: string) => {
    return new Promise((resolve, reject) => {
        const endpoint = `/item/${itemId}/metadata`;
        tainacanApi.get(endpoint)
            .then(res => {
                const metadata = (res.data||[]).map( (meta: any) => ({label:meta.metadatum.name, value:meta.value_as_string }));
                commit('setItemMetadata', metadata);
                resolve(metadata);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
};

export const addItemAttachments = ({ commit }: any, itemId: string, page = '1') => {
    return new Promise((resolve, reject) => {
        const endpoint = `/items/${itemId}/attachments?order=ASC&orderby=menu_order&perpage=24&paged=${page}`;
        tainacanApi.get(endpoint)
            .then(res => {
                const attachments = (res.data||[]).map( (att: any) => ({url:att.url}));
                commit('addItemAttachments', attachments);
                resolve(attachments);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
};

export const fetchInstituteItems = ({ commit }: any, {instituteId, params}: {instituteId: string; params: any}) => {
    return new Promise((resolve, reject) => {
        const endpoint = '/collections?'
        const queryParams = {
            ...params,  
            metaquery: [{
                key: 'vamus_institute_identifier_collection',
                value: instituteId,
                compare: 'IN'
            }]
        }

        tainacanApi.get(endpoint + stringify(queryParams))
            .then(res => {
                const instituteCollections = res.data;
                const endpointItems = '/items?&';
                if(instituteCollections.length === 0 ) {
                    commit('setInstituteItems', []);
                    commit('setInstituteTotalItems', 0);
                    resolve({ items:[], totalItems:0 });
                } else {
                    const queryItemParams = {
                        fetch_only:'title,description,document_type,document,document_as_html,thumbnail',
                        metaquery: [{
                            key: 'collection_id',
                            value: instituteCollections.map((e: any) => e.id),
                            compare: 'IN'
                        }]
                    };
                    tainacanApi.get(endpointItems + stringify(queryItemParams)).then(resItems => {
                        const items = resItems.data.items;
                        const totalItems = resItems.headers['x-wp-total'];
                        commit('setInstituteItems', items);
                        commit('setInstituteTotalItems', totalItems);
                        resolve({ items, totalItems });
                    }).catch(error => {
                        console.log(error);
                        reject(error);
                    });
                }
            }) 
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};