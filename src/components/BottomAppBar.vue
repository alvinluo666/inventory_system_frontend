<template>
    <div id="bottom-nav">
      <router-link to="/" v-ripple>
        <div>
          <img src="@/assets/images/app/house.svg" alt="">
          <img class="active" src="@/assets/images/app/house-on.svg" alt="">
          <span>首页</span>
        </div>
      </router-link>
      <router-link to="/sale" v-ripple>
        <div>
          <img src="@/assets/images/app/sale.svg" alt="">
          <img class="active" src="@/assets/images/app/sale-on.svg" alt="">
          <span>销售</span>
        </div>
      </router-link>
      <router-link to="/accounting" v-ripple>
        <div>
          <img src="@/assets/images/app/accounting.svg" alt="">
          <img class="active" src="@/assets/images/app/accounting-on.svg" alt="">
          <span>财务</span>
        </div>
      </router-link>
      <router-link to="/inventory" v-ripple>
        <div>
          <img src="@/assets/images/app/inventory.svg" alt="">
          <img class="active" src="@/assets/images/app/inventory-on.svg" alt="">
          <span>仓库</span>
        </div>
      </router-link>
      <router-link to="/setting" v-ripple>
        <div>
          <img src="@/assets/images/app/settings.svg" alt="">
          <img class="active" src="@/assets/images/app/settings-on.svg" alt="">
          <span>设置</span>
        </div>
      </router-link>

    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>

</style>