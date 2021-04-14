<template>
  <div class="tools">
      <div class="tool">
         <img src="@/assets/images/app/inventory/order.svg" alt="" width="50" height="50">
         <span>进货订单</span>
     </div>
     <div class="tool">
         <img src="@/assets/images/app/inventory/order-in.svg" alt="" width="50" height="50">
        <span>进货</span>
     </div>
     <div class="tool">
         <img src="@/assets/images/app/inventory/stock-return.svg" alt="" width="50" height="50">
         <span>进货退货</span>
     </div>
     
     <div class="tool">
         <img src="@/assets/images/app/inventory/preorder.svg" alt="" width="50" height="50">
         <span>以消订购</span>
     </div>
     <div class="tool">
         <img src="@/assets/images/app/inventory/check.svg" alt="" width="50" height="50">
         <span>盘点</span>
     </div>
     <div class="tool">
         <img src="@/assets/images/app/inventory/edit.svg" alt="" width="50" height="50">
        <span>调拨</span>
     </div>
     <div class="tool">
         <img src="@/assets/images/app/inventory/stock-in.svg" alt="" width="50" height="50">
         <span>出库</span>
     </div>
     <div class="tool">
         <img src="@/assets/images/app/inventory/stock-out.svg" alt="" width="50" height="50">
         <span>入库</span>
     </div>
     
  </div>
</template>

<script>


export default {
  name: 'Tools',
  components: {
    
  }
}
</script>
<style lang="scss" scoped>
    @import '../../assets/scss/constant.scss';
    .tools{
        background:white;
        width:100%;
        display:grid;
        grid-template-columns: auto auto auto auto;
        grid-row-gap:15px;
        padding:20px 5px;
        // border-radius:5px;
        margin-top:5px;
        .tool{
            display:flex;
            align-items:center;
            justify-content:center;
            flex-direction:column;
            span{
                color:$light-text-color;
                font-size:10px;
                display: block;
                padding-top:5px;
            }
        }
    }
</style>
