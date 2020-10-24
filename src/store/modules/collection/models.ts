export default class CollectionModel {
  name: string;
  description: string;
  vamus_institute_identifier_collection: number;

  constructor() {
    this.name = '';
    this.description = '';
    this.vamus_institute_identifier_collection = -1;
  }
}