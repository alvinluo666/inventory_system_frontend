<template>
    <div class="app-bar">
      <div :class="['top',scrollTop?'hide':'']">
        <div class="leading">
          <slot name="leading">
            <img class="avatar" src="@/assets/images/app/default-avatar.png" alt="">
            <span class="company-name">保险套有限公司</span>
          </slot>
        </div>
        <div class="actions">
          <slot name="actions">
            <div class="search">
              <img src="@/assets/images/app/search.svg" alt="">
            </div>
            <div class="barcode">
              <img src="@/assets/images/app/barcode.svg" alt="">
            </div>
            <div class="notification">
              <img src="@/assets/images/app/bell.svg" alt="">
            </div>
          </slot>
        </div>
      </div>
      <div class="second">
        <slot name="products_filter">       
        </slot>
      </div>
    </div>
    
</template>
<script>

export default {
    data(){
      return{
        scrollTop:false //to determine whether to hide app bar
      }
    },
    mounted(){
      var lastScrollTop = 0;
      window.addEventListener('scroll',(e)=>{
        var st = window.scrollY;
        if(st>lastScrollTop&&st>55){
          this.scrollTop=true;
        }else{
          this.scrollTop=false;
        }
        if(st==0){
          this.scrollTop=false;
        }
        lastScrollTop = st;
      });
    }
}
</script>
<style lang="scss">
@import '../assets/scss/constant.scss';
.app-bar{
  width:100%;
  padding: 0px ;
  background:white;
  position:fixed;
  top:0;
  z-index:1000;
  div.top{
    padding:0px $left-right-padding;   
    transition:0.3s;
    height:55px;   
    display:flex;
    justify-content: space-between;
    align-items: center;  
      .leading{
      display:flex;
      align-items:center;
      justify-content:left;
      height:100%;
      .avatar{
        width:40px;
        height:40px;
        border-radius:50px;
      }
      span{
        padding-left:10px;
        font-size: 12px;
        color:$light-text-color;
      }
      h1{
        color:yellow;
      }
    }
    .actions{
      display: flex;
      align-items: center;
      justify-content: center;
      div{
        padding-left:20px;
        height:20px;
        img{
          width:20px;
          height:20px;
          
        }
      }
    }
  }
  .top.hide{
    
    display:none;
  }
  .second .products_filter{ 
      // background-color:red;
      // // position:fixed;
      width:100%;      
      display:flex;
      align-items: center;
      justify-content:space-between;
      padding: 0px;
     
      border-top:0.1px solid rgba($color: #000000, $alpha: 0.2);
      // border-bottom:0.1px solid rgba($color: #000000, $alpha: 0.2);
      // padding:10px $left-right-padding;
      div{
          height:100%;
          width:calc(100vw/4);
          padding:10px 0px;
          img{
              padding-right:5px;
          }
          span{
              font-size:11px;
              color:$light-text-color;
          }
      }
      
  }
}

</style>