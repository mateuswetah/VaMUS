export default {
    namespaced: true,
    state: {
        searchValue: '',
        isLoadingSomeEntity: false
    },
    mutations: {
        setSearchValue(state: any, searchValue: string) {
            state.searchValue = searchValue
        },
        setIsLoadingSomeEntity(state: any, isLoadingSomeEntity: string) {
            state.isLoadingSomeEntity = isLoadingSomeEntity
        }
    },
    getters: {
        getSearchValue(state: any) {
            return state.searchValue;
        },
        getIsLoadingSomeEntity(state: any) {
            return state.isLoadingSomeEntity;
        }
    }
}