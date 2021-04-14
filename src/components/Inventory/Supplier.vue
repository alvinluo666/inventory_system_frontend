<template>
    <div class="supplier">
        <div class="header">
            <div class="title">
                <img src="@/assets/images/app/inventory/supplier.svg" alt="" width="20" height="20">
                <span>供应商</span>
            </div>
            <div class="add-product">
                <img src="@/assets/images/app/inventory/add.svg" alt="" width="15" height="15">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .supplier{
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
        }
    }
</style>