
export const setItem = (state: any, item: any) => {
    state.item = item;
}

export const setItems = (state: any, items: []) => {
    state.items = items;
}

export const setCollectionItems = (state: any, collectionItems: []) => {
    state.collectionItems = collectionItems;
}