import InstituteModel, { EventModel } from './models';

export const setInstitute = (state: any, institute: InstituteModel ) => {
    state.institute = institute;
}

export const setInstituteEvent = (state: any, events: EventModel ) => {
    const institute = { ... state.institute, events};
    state.institute = institute;
}