import ItemModel from './models';

export const setItem = (state: any, item: ItemModel) => {
    state.item = item;
}

export const setItems = (state: any, items: []) => {
    state.items = items;
}

export const setCollectionItems = (state: any, collectionItems: []) => {
    state.collectionItems = collectionItems;
}

export const setTotalItems = (state: any, totalItems: number) => {
    state.totalItems = totalItems;
}

export const setTotalCollectionItems = (state: any, totalCollectionItems: number) => {
    state.totalCollectionItems = totalCollectionItems;
}