import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import CollectionModel from './models';

const state = {
    collection: new CollectionModel(),
    collections: Array<CollectionModel>(),
    totalCollections: 0,
    instituteCollections: Array<CollectionModel>(),
    totalInstituteCollections: 0,
    institutesIds: Array<number>()
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}