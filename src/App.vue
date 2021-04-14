<template>
  <div class="root">
    
       
        <router-view v-slot="{Component}" >
          <transition :name="transitionName" mode="out-in" >
            <keep-alive exclude="BarcodeScanner">              
                <component :is="Component"/>             
            </keep-alive>
          </transition>
        </router-view>
      



    
    
  </div>
</template>
<script>

  import {mapActions,mapState} from 'vuex';

  export default{
    data:function(){
      return {
        transitionName:''
      }
    },
    computed:{
      ...mapState([
        'categories'
      ])
    },
    methods:{
      ...mapActions('categories',[
        'getCategories',
        'addCategory'
      ]),
      ...mapActions('productUnits',[
        'getProductUnits',

      ])
    },
    watch:{
      '$route'(to,from){
        const toDepth = to.meta.stack;
        const fromDepth = from.meta.stack;
        if(toDepth==fromDepth){
          this.transitionName='none';
        }else{
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
        
      }
    },
    async mounted(){  
      await this.getCategories();
      await this.getProductUnits();
      
      const viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      viewportMeta.content = 'width=device-width, initial-scale=1';
      document.head.appendChild(viewportMeta);
    }
  }
</script>

<style lang="scss">
@import './assets/scss/constant.scss';
*{
  padding:0;
  margin:0;
  box-sizing:border-box;
}
body{
  background:$background-color;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#bottom-nav{

  position:fixed;
  bottom:0;
  background:white;
  display:flex;
  align-items:center;
  justify-content: space-around;
  width:100%;
  height:55px;
  a{
    text-decoration: none;
    width:calc(100%/5);
    display:flex;
    height: 100%;
    align-items:center;
    justify-content: center;
    div{
      display:flex;
      flex-direction:column;
      justify-content: space-around;
      align-items:center;
      img{
        width:20px;
        height:20px;
        opacity:0.6;      
      }
      img.active{
        display:none;
      }
      span{
        font-size:10px;
        padding-top:5px;
        color:$light-text-color;
      }
    }
  }
  a.router-link-exact-active{
    div{
      img{
        display:none;
        opacity:1.0;  
      }
      img.active{
        display:inline;
      }
      span{
        color:$primary-color;
      }
    }
  }
}

.fade-enter-active,.fade-leave-active{
  transition: opacity .2s;
}
.fade-enter,.fade-leave-to{
  opacity:0;
}


.slide-left-enter-active, .slide-left-leave-active {
  transition: .2s;
}
.slide-left-enter {
  transform: translate(100%,0);
}
.slide-left-leave-to{
  transform: translate(-100%, 0);
}
.slide-left-leave,.slide-left-enter-to{
  transform: translate(0,0);
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: .2s;
}
.slide-right-enter {
  transform: translate(-100%,0);
}
.slide-right-leave-to{
  transform: translate(100%, 0);
}
.slide-right-leave,.slide-right-enter-to{
  transform: translate(0,0);
}
</style>
