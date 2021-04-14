<template>
  <div class="dashboard">
     <div class="card">
         <h4>12<span>笔</span></h4>
         <span>进货单</span>
     </div>
     <div class="card">
         <h4>5<span>笔</span></h4>
         <span>待出库</span>
     </div>
     <div class="card">
         <h4>7<span>笔</span></h4>
         <span>待入库</span>
     </div>
  </div>
</template>

<script>


export default {
  name: 'dashboard',
  components: {
    
  }
}
</script>
<style lang="scss" scoped>
    @import '../../assets/scss/constant.scss';
    .dashboard{
        display: grid;
        grid-template-columns:auto auto auto;
        grid-column-gap: 10px;
        padding:5px 10px;
        .card{
            border-radius:10px;
            background:white;
            height:65px;
            display:flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            h4{
                font-size:23px;
                span{
                    font-size:14px;
                    display:inline;
                    padding-left:5px;
                    // color:$light-text-color;
                }
                margin:0;
                
            }
            span{
                font-size: 10px;
                color:$light-text-color;
                padding-top:3px;
            }

        }
    }
</style>