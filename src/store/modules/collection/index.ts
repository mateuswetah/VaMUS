import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import CollectionModel from './models';

const state = {
    collections: Array<CollectionModel>(),
    collection: new CollectionModel(),
    totalCollections: 0
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}