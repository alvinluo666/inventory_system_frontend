<template>
  <div class="products-list" ref="products_list">
    <AppBar>
      <template v-slot:leading>
        <img
          src="@/assets/images/app/left.svg"
          alt=""
          @click="$router.go(-1)"
          width="20"
          height="20"
        />
        <span style="display: inline; padding-left: 15px">商品列表</span>
      </template>
      <template v-slot:actions>
        <div class="add" @click="addNewProduct">
          <img src="@/assets/images/app/add_new.svg" alt="" />
        </div>
        <div class="print">
          <img src="@/assets/images/app/printer.svg" alt="" />
        </div>
      </template>
      <template v-slot:products_filter>
        <div class="products_filter">
          <div
            class="order"
            @click="showDrawer('order_by')"
            v-if="!showSearchField"
            v-ripple
          >
            <img
              v-if="products_filter.order_by"
              src="@/assets/images/app/inventory/order-by-active.svg"
              alt=""
              width="20"
              height="20"
            />
            <img
              v-else
              src="@/assets/images/app/inventory/order-by.svg"
              alt=""
              width="20"
              height="20"
            />
            <span>排序</span>
          </div>
          <div
            class="filter"
            @click="showDrawer('filter_by')"
            v-if="!showSearchField"
            v-ripple
          >
            <img
              v-if="products_filter.filter_by.show_outdate_products"
              src="@/assets/images/app/inventory/filter-active.svg"
              alt=""
              width="20"
              height="20"
            />
            <img
              v-else
              src="@/assets/images/app/inventory/filter.svg"
              alt=""
              width="20"
              height="20"
            />
            <span>筛选</span>
          </div>
          <div
            class="category"
            @click="showDrawer('group_by')"
            v-if="!showSearchField"
            v-ripple
          >
            <img
              v-if="products_filter.group_by.length > 0"
              src="@/assets/images/app/inventory/group-active.svg"
              alt=""
              width="20"
              height="20"
            />
            <img
              v-else
              src="@/assets/images/app/inventory/group.svg"
              alt=""
              width="20"
              height="20"
            />
            <span>分类</span>
          </div>
          <div class="scan" @click="openBarcodeScanner" v-if="showSearchField" v-ripple>
            <img
              src="@/assets/images/app/inventory/scanning-two.svg"
              alt=""
              width="20"
              height="20"
            />
            <span>扫描</span>
          
          </div>
          <a-input
            placeholder="搜索"
            v-if="showSearchField"
            autofocus
            @change="updateSearchField"
            :defaultValue="products_filter.search_value" :value="products_filter.search_value"
          />

          <div class="search" @click="toggleSearchField">
            <img
              v-if="showSearchField"
              src="@/assets/images/app/back.svg"
              alt=""
              width="20"
              height="20"
            />
            <img
              v-else-if="!products_filter.search_value"
              src="@/assets/images/app/inventory/search-black.svg"
              alt=""
              width="20"
              height="20"
            />
            <img
              v-if="!showSearchField && products_filter.search_value"
              src="@/assets/images/app/inventory/search.svg"
              alt=""
              width="20"
              height="20"
            />
            <span v-if="showSearchField">返回</span>
            <span v-if="!showSearchField">搜索</span>
          </div>

          <a-drawer
            :title="drawerTitle"
            placement="bottom"
            :closable="false"
            :visible="visible"
            @close="closeDrawer"
            height="auto"
          >
            <div class="order-by" v-if="drawerType == 'order_by'">
              <div
                :class="[
                  'order-type',
                  products_filter.order_by &&
                  products_filter.order_by.name == 'created_at'
                    ? 'active'
                    : '',
                ]"
                @click="updateOrderBy('created_at')"
              >
                <span
                  >创建日期
                  {{
                    products_filter.order_by &&
                    products_filter.order_by.name == "created_at"
                      ? products_filter.order_by.direction == "asc"
                        ? " (上到下)"
                        : " (下到上)"
                      : ""
                  }}
                </span>
                <img
                  v-if="
                    products_filter &&
                    products_filter.order_by.name == 'created_at'
                  "
                  src="@/assets/images/app/left-blue.svg"
                  alt=""
                  width="20"
                  height="20"
                />
                <img
                  v-else
                  src="@/assets/images/app/left.svg"
                  alt=""
                  width="20"
                  height="20"
                />
              </div>
              <div
                :class="[
                  'order-type',
                  products_filter.order_by &&
                  products_filter.order_by.name == 'id'
                    ? 'active'
                    : '',
                ]"
                @click="updateOrderBy('id')"
              >
                <span
                  >编号
                  {{
                    products_filter.order_by &&
                    products_filter.order_by.name == "id"
                      ? products_filter.order_by.direction == "asc"
                        ? " (上到下)"
                        : " (下到上)"
                      : ""
                  }}
                </span>
                <img
                  v-if="
                    products_filter && products_filter.order_by.name == 'id'
                  "
                  src="@/assets/images/app/left-blue.svg"
                  alt=""
                  width="20"
                  height="20"
                />
                <img
                  v-else
                  src="@/assets/images/app/left.svg"
                  alt=""
                  width="20"
                  height="20"
                />
              </div>
              <div
                :class="[
                  'order-type',
                  products_filter.order_by &&
                  products_filter.order_by.name == 'name'
                    ? 'active'
                    : '',
                ]"
                @click="updateOrderBy('name')"
              >
                <span
                  >名称
                  {{
                    products_filter.order_by &&
                    products_filter.order_by.name == "name"
                      ? products_filter.order_by.direction == "asc"
                        ? " (上到下)"
                        : " (下到上)"
                      : ""
                  }}
                </span>
                <img
                  v-if="
                    products_filter && products_filter.order_by.name == 'name'
                  "
                  src="@/assets/images/app/left-blue.svg"
                  alt=""
                  width="20"
                  height="20"
                />
                <img
                  v-else
                  src="@/assets/images/app/left.svg"
                  alt=""
                  width="20"
                  height="20"
                />
              </div>
              <div
                :class="[
                  'order-type',
                  products_filter.order_by &&
                  products_filter.order_by.name == 'expire_day'
                    ? 'active'
                    : '',
                ]"
                @click="updateOrderBy('expire_day')"
              >
                <span
                  >保质期
                  {{
                    products_filter.order_by &&
                    products_filter.order_by.name == "expire_day"
                      ? products_filter.order_by.direction == "asc"
                        ? " (上到下)"
                        : " (下到上)"
                      : ""
                  }}
                </span>
                <img
                  v-if="
                    products_filter &&
                    products_filter.order_by.name == 'expire_day'
                  "
                  src="@/assets/images/app/left-blue.svg"
                  alt=""
                  width="20"
                  height="20"
                />
                <img
                  v-else
                  src="@/assets/images/app/left.svg"
                  alt=""
                  width="20"
                  height="20"
                />
              </div>
            </div>
            <div class="filter-by" v-if="drawerType == 'filter_by'">
              <div class="filter-type">
                <span>显示停售商品</span>
                <a-switch
                  :checked="
                    products_filter.filter_by.show_outdate_products
                      ? true
                      : false
                  "
                  @change="updateFilterBy('show_outdate_products')"
                />
              </div>
            </div>
            <div class="group-by" v-if="drawerType == 'group_by'">
              <div
                :class="[
                  'category',
                  this.products_filter.group_by.length == 0 ? 'active' : '',
                ]"
                @click="updateGroupBy('all')"
              >
                <span>All</span>
              </div>
              <div class="category" v-ripple>
                <img src="@/assets/images/app/plus.svg" @click="showAddNewCategoryModal=true">
                <a-modal
                  title="Add new category"
                  :visible="showAddNewCategoryModal"
                  :closable="false"
                  @ok="addNewCategory"
                  @cancel="closeAddNewCategoryModal"
                  :confirmLoading="adding_new_category"
                  :okButtonProps="{size:'large'}"
                  :cancelButtonProps="{size:'large'}"
                >
                  <a-input maxlength="8" placeholder="分类" max @change="update_new_category_name_field" :value="new_category_name" size="large"/>
                </a-modal>
              </div>
              <div
                :class="[
                  'category',
                  this.products_filter.group_by.indexOf(category.id) != -1
                    ? 'active'
                    : '',
                ]"
                @click="updateGroupBy(category.id)"
                v-for="category in categories" :key="category.id"
              >
                <span>{{category.name}}</span>
              </div>
              
            </div>

          </a-drawer>
        </div>
      </template>
    </AppBar>
    <div class="top" style="height: 100px"></div>
    <div class="product-list" v-if="retrieved_products.length > 0">
      <div
        class="product-list-item"
        v-for="product in retrieved_products"
        :key="product.id"
        @click="viewProduct(product)"
        v-ripple
      >
        <div class="image">
          <img :src="product.images[0]" alt="" />
        </div>
        <div class="product-info">
            <span class="title">
                {{product.name}}
            </span>
            <span class="price-title">
                零售价:
                <span class="price">({{product.price_unit.name}}) {{product.retail_price}}</span>
            </span>
            <span class="price-title">
                批发价:
                <span class="price">({{product.price_unit.name}}) {{product.wholesale_price}}</span>
            </span>
            <span class="price-title">
                进货价:
                <span class="price">({{product.price_unit.name}}) {{product.cost_price}}</span>
            </span> 
        </div>
      </div>
    </div>
    <div v-if="retrieved_products.length <= 0&&!retrieving_data" style="padding-top:50px;">
      <!-- //show when no products -->
      <img src="@/assets/images/app/cry.svg" width="30" height="30">
      <div>
        <span>No products</span>
      </div>
    </div>
    <div class="loading" v-if="retrieving_data" style="padding:10px 0px;">
      <Spinner :loading="false"></Spinner>
    </div>
    <div class="last-page" v-if="(!retrieving_data&&current_retrieved_page>=last_retrieved_page)" style="padding:10px 0px 15px 0px;">
        <span>全部以加载 总共 <span>{{retrieved_products.length}}</span> 种</span>
    </div>
  </div>
</template>
<script>
import AppBar from "../../../components/AppBar.vue";
import Spinner from "../../../components/External/Spinner.vue";
import {mapState,mapActions,mapMutations} from "vuex";

export default {
  name:'allProducts',
  components: {
    AppBar,
    Spinner,
 
  },
  data: function () {
    return {
      scroll_y: 0, //to keep scroll position,
      visible: false, //for bottom sheet drawer,
      products_filter: {
        order_by: "",
        filter_by: {
          show_outdate_products: false,
        },
        group_by: [],
        search_value: "",
      },
      showSearchField: false,
      drawerType: "",
      drawerTitle: "",
      retrieving_data: false,
      retrieved_products: [], //data from server,
      current_retrieved_page : 1,
      last_retrieved_page : Infinity,
      showAddNewCategoryModal : false,
      adding_new_category:false,//for loading to work
      new_category_name:''
    };
  },
  computed:{
    ...mapState('categories',[
      'categories',//product categories
      
    ]),
    ...mapState([
      'tempBarcode'
    ])
  },
  methods: {
    ...mapActions('categories',[
      'addCategory'
    ]),
    ...mapMutations([
      'setTempBarcode'
    ]),
    showDrawer(type) {
      this.drawerType = type;
      switch (type) {
        case "order_by":
          this.drawerTitle = "产品排序";
          break;
        case "filter_by":
          this.drawerTitle = "产品筛选";
          break;
        case "group_by":
          this.drawerTitle = "产品分类";
          break;
      }
      this.visible = true;
    },
    closeDrawer() {
      this.visible = false;
    },
    toggleSearchField() {
      this.showSearchField = !this.showSearchField;
    },
    updateSearchField(e) {
      this.products_filter.search_value = e.target.value.trim();
    },
    closeAddNewCategoryModal(){
      this.showAddNewCategoryModal=false;
      this.adding_new_category=false;
      this.new_category_name='';
    },
    async addNewCategory(){
      if(this.new_category_name==''){
        this.$message.warning('Please enter category name!');
      }else{
        this.adding_new_category=true;

        if(this.categories.indexOf(this.new_category_name.trim())!=-1){
          this.$message.error('Category already exists!');
          this.adding_new_category=false;
        }else{
          await this.addCategory(this.new_category_name.trim())
          this.$message.success('New category added!');
          this.adding_new_category=false;
          this.new_category_name='';
          this.showAddNewCategoryModal=false;        }
        
        
      }
      
      
    },
    update_new_category_name_field(e){
      this.new_category_name=e.target.value;
    },
    updateOrderBy(method) {
      // console.log(method);
      if (!this.products_filter.order_by) {
        this.products_filter.order_by = {
          name: method,
          direction: "asc",
        };
      } else {
        if (this.products_filter.order_by.name != method) {
          this.products_filter.order_by.name = method;
          this.products_filter.order_by.direction = "asc";
        } else {
          var dir = ["", "asc", "desc"];
          var index = dir.indexOf(this.products_filter.order_by.direction);
          if (index == dir.length - 1) {
            index = 0;
          } else {
            index++;
          }
          if (dir[index] == "") {
            this.products_filter.order_by = "";
          } else {
            this.products_filter.order_by.direction = dir[index];
          }
        }
      }
    },
    updateFilterBy(method) {
      this.products_filter.filter_by[method] = !this.products_filter.filter_by[
        method
      ];
    },
    updateGroupBy(category) {
      if (category == "all") {
        this.products_filter.group_by = [];
      } else if (this.products_filter.group_by.indexOf(category) != -1) {
        this.products_filter.group_by = this.products_filter.group_by.filter(
          (product) => {
            return product != category;
          }
        );
      } else {
        this.products_filter.group_by.push(category);
      }
    },
    fetchProductsFromServer(page=0) {
      var isConnected = window.navigator.onLine;
      if(isConnected){
        this.retrieving_data = true;
        var query = [];
        var filter_keys = Object.keys(this.products_filter);
        var filter = this.products_filter;
        filter_keys.forEach(key=>{
            switch(key){
                case 'order_by' : let temp = filter.order_by!=''?filter.order_by.name+':'+filter.order_by.direction:'';
                                  query.push(key+'='+temp);
                                  break;
              case 'filter_by' : Object.keys(filter.filter_by).forEach(key=>{
                                      query.push(key+'='+filter.filter_by[key]);
                                  });
                                  break;
              case 'group_by' : query.push(key+"="+filter.group_by.join(','));
                                break;
              case 'search_value' : query.push(key+"="+filter.search_value);
            }
            
        });
        query=query.join('&');
        this.axios.get(config.server_url + "products?page="+page+'&'+query).then((response) => {
          this.last_retrieved_page=response.data.body.last_page;
          if(response.data.status!=200){
            this.$message.error('Something went wrong?');
          }
          if(response.data.body!=''){
            response.data.body.data.forEach((product)=>{
                this.retrieved_products.push(product)
            })
          }
          this.retrieving_data = false;
        }).catch((e)=>{
          this.retrieving_data = false;
        });
      }
    },
    openBarcodeScanner(){
      // this.$router.push('/scanner/barcode');
    },
    viewProduct(product){
      this.$router.push({name:'viewProduct',params:{'id':product.id}});
    },
    addNewProduct(){
      this.$router.push({name:'addProduct'});
    }

  },
  watch: {
    products_filter: {
      handler(val) {
        this.retrieved_products=[];
        this.current_retrieved_page=1;
        this.fetchProductsFromServer(this.current_retrieved_page);
      },
      deep: true,
    },
    tempBarcode : {
      handler(val){
        if(val!=''){
          this.products_filter.search_value=val;
          this.setTempBarcode('');
        }
      }
    }
  },
  mounted() {
    //getAllProducts
    this.fetchProductsFromServer(this.current_retrieved_page);
    window.addEventListener('scroll',()=>{
        var needFetchData = window.scrollY >= this.$refs.products_list.offsetHeight-window.innerHeight;
        if(!this.retrieving_data&&needFetchData){
            this.current_retrieved_page++;
            this.fetchProductsFromServer(this.current_retrieved_page);
        }
        
    })
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
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/constant.scss";
.products-list {
  background-color: $background-color;
  min-height:100vh;
  height: auto;
}
.order-by {
  display: flex;
  width: 100%;
  flex-direction: column;
  div.order-type {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    margin-bottom: 5px;
  }
  div.order-type.active {
    background: $background-color;
    border-radius: 10px;
  }
}
.filter-by {
  display: flex;
  width: 100%;
  flex-direction: column;
  div.filter-type {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0px;
    margin-bottom: 5px;
  }
}
.group-by {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  max-height:60vh;
  overflow-y:scroll;
  scrollbar-width:none;
  .category {
    padding: 10px 0px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .category.active {
    background: $background-color;
    border-radius: 5px;
  }
}
.group_by::-webkit-scrollbar{
  display:none;
}

.product-list {
  padding: 0px 0px 10px 0px;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 2px;
  .product-list-item {
    background: white;
    border-radius: 5px;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 3fr;
    max-height: 100px;
    .image {
      width: 100px;
      height: 100px;
      padding: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .product-info{
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        padding-right:10px;
        .title{
            font-size:16px;
            font-weight:bold;
            color:$dark-text-color;
        }
   
        .price-title{
            font-size:12px;
            color:$light-text-color;
            .price{
                color:$dark-text-color;
            }
        }
                              
    }
  }
}
.last-page{
    span{
        font-size:12px;
        color:$light-text-color;
        span{
            font-weight:bold;
            color:$dark-text-color;
        }
    }
}
</style>