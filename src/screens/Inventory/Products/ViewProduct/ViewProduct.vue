<template>
	<div class="view-product">
		<AppBar>
			<template v-slot:leading>
		        <img
		          src="@/assets/images/app/left.svg"
		          alt=""
		          @click="$router.go(-1)"
		          width="20"
		          height="20"
		        />
		        <span style="display: inline; padding-left: 15px">商品详情</span>
      		</template>
      		<template v-slot:actions>
      			<div class="edit">
		          <img src="@/assets/images/app/edit_.svg" alt="" />
		        </div>
      		</template>
		</AppBar>
		<div class="top" style="height: 55px"></div>
		
		<div class="product-images" v-if="product">
		
			<carousel :items-to-show="1">
				<slide v-for="(image,index) in product.images" :key="image">
					<img :src="image">					
				</slide>
				<template #addons="{slideCount}">
					<h1>{{slideCount}}</h1>
				</template>
			</carousel>
			
		</div>
		<div class="product-info" v-if="product">
			<div class="product-name">
				<span>{{product.name}}</span>
			</div>

			<div class="section one">
				<span class="title">编号</span>
				<span class="text">{{product.id||'--'}}</span>
				<span class="title">分类</span>
				<span class="text">{{product.category.name||'--'}}</span>
				<span class="title">单位</span>
				<span class="text">{{product.product_unit.name||'--'}}</span>
			</div>
			<div class="section two">
				<span class="title">条形码</span>
				<span class="text">{{product.barcode||'---'}}</span>
			</div>
			<div class="section three">
				<span class="title">详情</span>
				<span class="text">{{product.description||'---'}}</span>
			</div>
			<div class="section four">
				<span class="title">重量单位</span>
				<span class="text">{{product.weight_unit.name||'---'}}</span>
			</div>
			<div class="section five">
				<span class="title">保质期天数</span>
				<span class="text">{{product.weight_unit.name||'---'}}</span>
				<span class="title">预警天数</span>
				<span class="text">{{product.weight_unit.name||'---'}}</span>
			</div>
			<div class="section six">
				<span class="title">库存预警</span>
				<span class="text" style="color:blue">详情</span>
			</div>
			<div class="section seven">
				<span class="title">价格管理</span>
				<span class="text" style="color:blue">详情</span>
			</div>
			<div class="section eight">
				<span class="title" style="color:orange">备注</span>
				<span class="text" >{{product.note||'---'}}</span>
			</div>
		</div>
	</div>

</template>
<script type="text/javascript">
	import AppBar from '../../../../components/AppBar.vue';
	import 'vue3-carousel/dist/carousel.css';
	import {Carousel,Slide,Pagination,Navigation} from 'vue3-carousel';

	export default {
		name:'viewProduct',
		data : function(){
			return {
			
				product : ''
			}
		},

		components:{
			AppBar,
			Carousel,
			Slide,
			Pagination,
			Navigation,
		
		},
		mounted(){
			console.log('mounted');
			this.$nextTick(()=>{
					this.axios.get(config.server_url+'products/'+this.$route.params.id).then((response)=>{
					this.product=response.data.body;
					console.log(this.product);
				}).catch((e)=>{
					if(e.response){
						if(e.response.status=404){
							console.log('not found');
						}
					}
				})
			})
		}
	}

</script>
<style lang="scss">
	@import '../../../../assets/scss/constant.scss';
	.view-product{
		background:$background-color;
		height:100vh;
		.product-images{
			
			background:white;
			height:250px;
			
			img{
				height:250px;
				width:100%;
			}
			
		}
		.product-info{
			display:flex;
			justify-content:start;
			
			background-color:$background-color;
			flex-direction:column;
			height:100%;
			padding-bottom:10px;
			.product-name{
				
				display:flex;
				padding:10px 0px;
				align-items:center;
				justify-content:start;
				span{
					font-size:17px;
					color:$dark-text-color;
					font-weight:bold;
				}
				background-color:white;
				padding:10px 20px;
				// border-bottom:1px solid black;

			}
			.section{
				display:grid;
				grid-template-columns:1fr 3fr;
				justify-items:start;
				align-items:center;
				.title{
					font-size:13px;
					color:$light-text-color;
					opacity:0.7
				}
				.text{
					font-size:13px;
					color:$dark-text-color;
					text-align:left;
				}
				grid-column-gap:10px;
				grid-row-gap:12px;
				background-color:white;
				padding:10px 20px;
				margin-bottom:5px;
			}
			.section:last-of-type{
				margin-bottom:20px;

			}
		}
	}
</style>