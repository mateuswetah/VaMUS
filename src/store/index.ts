import { createStore } from 'vuex'

import item from './modules/item';
import collection from './modules/collection';
import search from './modules/search';

export default createStore({
    modules: {
      item,
      collection,
      search
  }
})
