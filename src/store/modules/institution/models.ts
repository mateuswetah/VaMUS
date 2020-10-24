export interface EventModel {
    id: string;
    name: string;
    readableOccurrences: any[];
}

export default class InstitutionModel {
    name: string;
    events: EventModel[];
    constructor() {
      this.name = '';
      this.events = [];
    }
  }