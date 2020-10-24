import * as actions from './actions';
import * as getters from './getters';
import InstituteModel from './models';
import * as mutations from './mutations';

const state = {
    institute: InstituteModel
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}