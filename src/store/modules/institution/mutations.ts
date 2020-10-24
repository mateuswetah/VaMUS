import InstitutionModel, { EventModel } from './models';

export const setInstitution = (state: any, institution: InstitutionModel ) => {
    state.institution = institution;
}

export const setInstitutionEvent = (state: any, events: EventModel ) => {
    const institution = { ... state.institution, events};
    state.institution = institution;
}