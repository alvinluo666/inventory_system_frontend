<template>
    <div class="stock-consult">
        <div class="header">
            <div class="title">
                <img src="@/assets/images/app/inventory/search.svg" alt="" width="20" height="20">
                <span>库存查询</span>
            </div>
            <div class="info">
                <span>总和 : $12000,000</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    @import '../../assets/scss/constant.scss';
    .stock-consult{
        margin-top:5px;
        padding:15px 20px;
        background:white;
        
        .header{              
            display:flex;
            justify-content: space-between;
            align-items:center;
            .title{
                display:flex;
                align-items:center;
                justify-content:center;
                img{
                    padding-right:5px;
                }
                span{
                    font-size:13px;
                }
            }
            .info{
                span{
                    color:$light-text-color;
                    font-size:12px;
                }
            }
        }
    }
</style>