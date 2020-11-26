export interface EventModel {
    id: string;
    name: string;
    readableOccurrences: any[];
}

export default class InstituteModel {
    name: string;
    events: EventModel[];
    '@files:avatar': { name: string; url: string };
    '@files:header': { name: string; url: string };

    constructor() {
      this.name = '';
      this.events = [];
      this['@files:avatar'] = { name: '', url: '' };
      this['@files:header'] = { name: '', url: '' };
    }
  }