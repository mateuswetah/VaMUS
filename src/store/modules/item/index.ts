import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import ItemModel from './models';

const state = {
    item: new ItemModel(),
    items: Array<ItemModel>(),
    collectionItems: Array<ItemModel>(),
    itemsByLocation: Array<ItemModel>(),
    totalItems: 0,
    totalCollectionItems: 0,
    totalItensByLocation: 0,
    totalInstituteItems: 0
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}