import CollectionModel from './models';

export const setCollections = (state: any, collections: CollectionModel) => {
    state.collections = collections;
}
