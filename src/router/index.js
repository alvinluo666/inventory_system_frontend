import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Inventory from '../views/Inventory.vue'

import Products from '../screens/Inventory/Products/Products.vue'
import ViewProduct from '../screens/Inventory/Products/ViewProduct/ViewProduct.vue'
import AddProduct from '../screens/Inventory/Products/AddProduct/AddProduct.vue'
import Barcode from '../screens/Scanner/Barcode.vue'
import ChooseCategory from '../screens/ChooseCategory/ChooseCategory.vue'
import ChooseProductUnit from '../screens/ChooseProductUnit/ChooseProductUnit.vue'
import DirectAccessDenied from '../screens/DirectAccessDenied.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      stack:0 //for manage page transition
    }
  },
  {
    path: '/sale',
    name: 'Sale',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Sale.vue'),
    meta:{
      stack:0 
    }
  },
  {
    path:'/accounting',
    name: 'Accounting',
    component: () => import('../views/Accounting.vue'),
    meta:{
      stack:0
    }
  },
  {
    path:'/inventory',
    name: 'Inventory',
    component: Inventory,
    meta:{
      stack:0
    }
  },
  {
    path:'/setting',
    name: 'Setting',
    component: () => import('../views/Setting.vue'),
    meta:{
      stack:0
    }
  },
  //screens
  {
    path:'/inventory/products',
    component: Products,
    name:'allProducts',
    meta:{
      stack:1
    }
  },
  {
    path:'/inventory/products/:id',
    component: ViewProduct,
    name:'viewProduct',
    meta:{
      stack:2,
    },
  },
  {
    path:'/inventory/addProduct',
    component: AddProduct,
    name:'addProduct',
    meta:{
      stack:2,
    }
  },
  {
    path:'/scanner/barcode',
    name:'BarcodeScanner',
    component: Barcode,
    meta:{
      stack:2,
      noDirectAccess:true
    }

  },
  {
    path:'/chooseCategory',
    name:'ChooseCategory',
    component: ChooseCategory,
    meta:{
      stack:3,
      noDirectAccess:true
    }

  },
  {
    path:'/chooseProductUnit',
    name:'chooseProductUnit',
    component: ChooseProductUnit,
    meta:{
      stack:3,
      noDirectAccess:false
    }

  },
  {
    path:'/noAccessPage',
    component: DirectAccessDenied,
    meta : {
      stack : 10,
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior:(to,from,savedPosition)=>{
    return savedPosition;
  },

})

router.beforeEach((to,from,next)=>{
  // console.log('from:'+from.path);
  // console.log('to:'+to.path);
  if(from.path=='/'&&to.meta.noDirectAccess){
    next({path:'/noAccessPage'});
  }else{
    next();
  }
  
})

export default router
