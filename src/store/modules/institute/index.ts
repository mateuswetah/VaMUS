import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import InstituteModel from './models';

const state = {
    institute: new InstituteModel(),
    institutes: Array<InstituteModel>(),
    totalInstitutes: 0
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}