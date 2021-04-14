<template>
  <div class="products" ref="products" @click.self="to_products_view" style="{color:red}" v-ripple>
     <div class="header"  @click="to_products_view">
         <div class="title">
             <img src="@/assets/images/app/inventory/items.svg" alt="" width="20" height="20">
             <span>商品</span>
         </div>
         <div class="add-product">
             <img src="@/assets/images/app/inventory/add.svg" alt="" width="15" height="15">
         </div>
     </div>
     <div class="actions" @click.self="to_products_view">
         <div class="action" @click="$router.push('/inventory/f')">
             <img src="@/assets/images/app/inventory/ecommerce.svg" alt="" width="20" height="20">
             <span>电商导入</span>
         </div>
         <div class="action">
             <img src="@/assets/images/app/inventory/tag.svg" alt="" width="20" height="20">
             <span>打印标签</span>
         </div>
         <div class="action">
             <img src="@/assets/images/app/inventory/promote.svg" alt="" width="20" height="20">
             <span>推广商品</span>
         </div>
     </div>
  </div>
</template>

<script>

export default {
  name: 'Products',
  components: {
 
  },
  methods:{
      to_products_view(){
          this.$router.push('/inventory/products');
      }
  }
}
</script>
<style lang="scss" scoped>
    @import '../../assets/scss/constant.scss';
    .products{
       
        background:white;
        padding:20px;
      
        margin-top:5px;
        .header{
            display:flex;
            align-items:center;
            justify-content:space-between;
            .title{
                display:flex;
                align-items:center;
                img{
                    padding-right:5px;
                }
                span{
                    font-size:13px;
                }
            }
            
        }
        .actions{
            display:flex;
            align-items:center;
            justify-content:space-between;
            margin-top:12px;
            .action{
                width:30%;
                padding:7px 0px;
                border-radius:5px;
                display:flex;
                align-items:center;
                justify-content: center;
                img{
                    padding-right:5px;
                }
                span{
                    font-size:11px;
                    color:$light-text-color;
                }
            }
            .action:nth-child(1){
                background:$background-color;
            }
            .action:nth-child(2){
                background:$background-color;
            }
            .action:nth-child(3){
                background:$background-color;
            }
        }
    }
    
</style>