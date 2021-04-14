<template>
	<div class="choose-product-unit">
		<AppBar>
			<template v-slot:leading>
		        <img
		          src="@/assets/images/app/left.svg"
		          alt=""
		          @click="$router.go(-1)"
		          width="20"
		          height="20"
		        />
		        <span style="display: inline; padding-left: 15px">选择分类</span>
	 		</template>
	 		<template v-slot:actions>
		        <div class="confirm" @click="addNew">
		         	<span style="color:rgb(125, 205, 251);font-size:12px">新增</span>
		         
		        </div>
		    </template>
		</AppBar>
		<div class="top" style="height: 56px"></div>
		<NoData :data="productUnits" message="No Unit Available"/>
		<div class="productUnits" >
			 <a-checkbox-group @change="onChange">
					<div class="options">
						<a-checkbox v-for="productUnit in productUnits" :value="productUnit.id" :key="productUnit.id">
						{{productUnit.name}}
						</a-checkbox>
						
						
					</div>
			  </a-checkbox-group>
		</div>
	</div>
</template>
<script>
	import AppBar from '../../components/AppBar.vue';
	import NoData from '../../components/External/NoData.vue';
	import {mapState} from 'vuex';
	export default {
		components:{
			AppBar,
			NoData
		},
		computed:{
			...mapState('productUnits',[
				'productUnits'
			])
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../assets/scss/constant.scss';
	.choose-product-unit{
		background:$background-color;
		height:100%;
	}
	.productUnits{
		.options{
			display:flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			width:100vw;
			background:white;
	
			.ant-checkbox-wrapper{
				margin-left:0;
				padding: 0px 30px;
				line-height:50px;
				height:50px;
				width:100%;
				border-bottom:0.5px solid rgba(0,0,0,0.05);
				text-align:left;
			}
		}
	}
</style>