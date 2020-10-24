import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import ItemModel from './models';

const state = {
    item: ItemModel,
    items: [ ItemModel ],
    collectionItems: [ ItemModel ]
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}