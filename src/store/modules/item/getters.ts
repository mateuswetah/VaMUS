export const getItem = (state: any) => {
    return state.item;
};

export const getItems = (state: any) => {
    return state.items;
};

export const getCollectionItems =  (state: any) => {
    return state.collectionItems;
};

export const getTotalItems = (state: any) => {
    return state.totalItems;
};

export const getCollectionTotalItems = (state: any) => {
    return state.totalCollectionItems;
};

export const getItemsByLocation = (state: any) => {
    return state.itemsByLocation;
};

export const getTotalItemsByLocation = (state: any) => {
    return state.totalItemsByLocation;
};
