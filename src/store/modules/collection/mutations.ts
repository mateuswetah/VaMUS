import CollectionModel from './models';

export const setCollection = (state: any, collection: CollectionModel ) => {
    state.collection = collection;
}

export const setCollectionBasics = (state: any, collectionBasics: CollectionModel ) => {
    state.collectionBasics = collectionBasics;
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

export const setInstitutesIds = (state: any, institutesIds: [ number ] ) => {
    state.institutesIds = institutesIds;
}

export const setCollectionsByLocation = (state: any, collectionsByLocation: []) => {
    state.collectionsByLocation = collectionsByLocation;
}

export const setTotalCollectionsByLocation = (state: any, totalCollectionsByLocation: number) => {
    state.totalCollectionsByLocation = totalCollectionsByLocation;
}
