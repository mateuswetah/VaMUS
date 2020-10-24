import * as actions from './actions';
import * as getters from './getters';
import InstitutionModel from './models';
import * as mutations from './mutations';

const state = {
    institution: InstitutionModel
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}