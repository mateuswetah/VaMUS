import InstituteModel, { EventModel } from './models';

export const setInstitute = (state: any, institute: InstituteModel ) => {
    state.institute = institute;
}

export const setInstituteEvent = (state: any, events: EventModel ) => {
    const institute = { ... state.institute, events};
    state.institute = institute;
}

export const setInstitutes = (state: any, institutes: [ InstituteModel ] ) => {
    state.institutes = institutes;
}

export const setTotalInstitutes = (state: any, totalInstitutes: number ) => {
    state.totalInstitutes = totalInstitutes;
}