import { createStore } from 'vuex'
import categories from './Categories/index'
import productUnits from './ProductUnits/index'

export default createStore({
  state: {
    tempBarcode : '',
    tempCategory : 'd'
  },
  mutations: {
    setTempBarcode(state,barcode){

      state.tempBarcode=barcode;
    
    },
    setTempCategory(state,category){
      state.tempCategory=category;
    }
  },
  actions: {
  },
  modules: {
  },
  modules:{
    'categories':categories,
    'productUnits':productUnits
  }
})
