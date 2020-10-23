import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import CollectionModel from './models';

const state = {
    items: [],
    collections: Array<CollectionModel>(),
    collection: null,
    attachments: [],
    files: [],
    repositoryTotalCollections: '',
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}