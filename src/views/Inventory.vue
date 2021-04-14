<template>
  <div class="inventory" >
    <AppBar>
    </AppBar>
    <BottomAppBar></BottomAppBar>
    <div class="top" style="height:55px"></div>  
    <Dashboard></Dashboard>
    <Tools></Tools>
    <Products></Products>
    <Supplier></Supplier>
    <StockConsult></StockConsult>
    <div class="bottom" style="height:55px"></div>
    
  </div>
</template>

<script>

import Dashboard from '../components/Inventory/Dashboard.vue';
import Tools from '../components/Inventory/Tool.vue';
import Products from '../components/Inventory/Products.vue';
import Supplier from '../components/Inventory/Supplier.vue';
import StockConsult from '../components/Inventory/StockConsult.vue';
import AppBar from '../components/AppBar.vue';
import BottomAppBar from '../components/BottomAppBar.vue'
export default {
  name: 'Inventory',
  components: {
    Dashboard,
    Tools,
    Products,
    Supplier,
    StockConsult,
    AppBar,
    BottomAppBar
  },
  data(){
      return {
          scroll_y: 0 //to keep scroll position
      }
  },
  beforeRouteLeave(to,from,next){
      this.scroll_y = window.scrollY;
      next();
  },
  beforeRouteEnter(to,from,next){
      next(vm=>{
          window.scrollTo(0,vm.scroll_y);
      })
  }

}
</script>
<style lang="scss" scoped>
    @import '../assets/scss/constant.scss';
    .inventory{
        padding:5px 0px;
        background:$background-color;
    }
</style>
