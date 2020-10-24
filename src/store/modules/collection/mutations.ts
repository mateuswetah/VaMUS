import CollectionModel from './models';

export const setCollection = (state: any, collection: CollectionModel ) => {
    state.collection = collection;
}

export const setCollections = (state: any, collections: [] ) => {
    state.collections = collections;
}

export const setTotalCollections = (state: any, totalCollections: number ) => {
    state.totalCollections = totalCollections;
}

export const setInstituteCollections = (state: any, instituteCollections: [] ) => {
    state.instituteCollections = instituteCollections;
}

export const setTotalInstituteCollections = (state: any, totalInstituteCollections: number ) => {
    state.totalInstituteCollections = totalInstituteCollections;
}
