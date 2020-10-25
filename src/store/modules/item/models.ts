export class ItemMetadata {
  label: string;
  value: string;
  constructor() {
    this.label = '';
    this.value = '';
  }
}

export class ItemAttachments {
  url: string;
  constructor() {
    this.url = '';
  }
}

export default class ItemModel {
    title: string;
    metadata?: ItemMetadata[];
    attachments?: ItemAttachments[];

    constructor() {
      this.title = '';
    }
  }