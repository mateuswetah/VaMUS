import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import ItemModel from './models';

const state = {
    item: ItemModel,
    items: [ ItemModel ],
    collectionItems: [ ItemModel ],
    totalItems: 0,
    totalCollectionItems: 0
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}