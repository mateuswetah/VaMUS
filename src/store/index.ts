import { createStore } from 'vuex'

import item from './modules/item';
import collection from './modules/collection';
import institution from './modules/institution';

export default createStore({
    modules: {
      item,
      collection,
      institution
  }
})
