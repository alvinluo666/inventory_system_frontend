<template>
	<div class="add-product">
		<AppBar>
			<template v-slot:leading>
		        <img
		          src="@/assets/images/app/left.svg"
		          alt=""
		          @click="$router.go(-1)"
		          width="20"
		          height="20"
		        />
		        <span style="display: inline; padding-left: 15px">添加商品</span>
     		</template>
     		<template v-slot:actions>
		        <div class="confirm" @click="addNewProduct">
		         	<span style="color:rgb(125, 205, 251);font-size:12px">保存</span>
		        </div>
		    </template>
		</AppBar>
		<div class="top" style="height: 56px"></div>
		{{tempCategory+'hhhg'}}
		<div class="images-uploader">
			<div class="title"><span>图片</span></div>
			<div>
				<ImageUploader @fileChange="handleFileChange"></ImageUploader>
			</div>
		</div>
		<div class="section one">
			<div class="subsection one">
				<span class="title">名称<span style="color:red"> *</span></span>
				<input class="input" type="text" name="name" placeholder="输入产品名称" v-model="name">
			</div>
			
		</div>
		<div class="section two">
			<div class="subsection one"  @click="$router.push('/chooseCategory')">
				<span class="title">分类<span style="color:red"> *</span></span>
				<span v-if="!selected_category" class="field" style="color:red">选择</span>
				<span v-else class="field" >{{selected_category.name}}</span>
			</div>
			<div class="subsection two" @click="$router.push('/chooseProductUnit')">
				<span class="title">单位<span style="color:red"> *</span></span>
				<span class="field" style="color:red">选择</span>
			</div>
			<div class="subsection three barcode">
				<span class="title">条形码</span>
				<input class="input" type="text" name="name" placeholder="输入或扫描">
				<span class="scan-button"><img src="@/assets/images/app/inventory/scanning-two.svg" width="20" height="20"></span>
			</div>
		</div>
		<div class="section three">
			<div class="subsection one">
				<span class="title">产品介绍</span>
				<span class="text-area" role="textbox" contenteditable></span>
			</div>
			
		</div>
		<div class="section four">
			<div class="subsection one">
				<span class="title">价格管理</span>
				<span class="field" style="color:red">选择</span>
			</div>
			<div class="subsection two">
				<span class="title">重量单位</span>
				<span class="field" style="color:red">选择</span>
			</div>
			
		</div>
		<div class="section five">
			<div class="subsection one">
				<span class="title">库存预警</span>
				<span class="field" style="color:red">设定</span>
			</div>
		</div>
		
		<div class="section six">
			<small class="note-title">备注</small>
			<div class="subsection one note">
				<span class="text-area" role="textbox" contenteditable></span>
			</div>
		</div>

	</div>
</template>
<script>
	import AppBar from '../../../../components/AppBar.vue';
	import ImageUploader from './ImageUploader.vue';
	import {mapState,mapMutations} from 'vuex';
	export default{
		name:'addProduct',
		components:{
			AppBar,
			ImageUploader
		},
		data:function(){
			return {
				fileList:[],
				name:'',
				selected_category:undefined,
			}
		},
		computed:{
			...mapState([
				'tempCategory'
			])
		},
		methods:{
			handleFileChange(fileList){
				this.fileList=fileList;
			},
			...mapMutations([
				'setTempCategory'
			])
		},
		watch:{
			tempCategory(val){
				if(val!=''){
					this.selected_category = val;
				}
				this.setTempCategory('');
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../../assets/scss/constant.scss';
	.add-product{
		background:$background-color;
		height:100vh;
		.section{
			display:flex;
			flex-direction:column;
			background:white;
			margin-bottom:5px;
			.note-title{
				color:red;
				background-color:$background-color;
				padding:5px 0px;
				color:$light-text-color;
				margin-top:-1px;
			}
			.subsection{
				display:grid;
				grid-template-columns:1fr 3fr;
				align-items:center;
				justify-items:start;
				padding:12px 20px;
				border-bottom:0.2px solid rgba(0,0,0,0.05);
				.title{
					font-size:13px;
					color:$dark-text-color;
					opacity:0.7;
					display:block;
					
				}
				.field{
					font-size:13px;
					color:$dark-text-color;
					text-align:left;
					
				}
				.input{
					width:100%;
					height:100%;
					padding-right:10px;
					border:none;
					outline:none;
					color:$dark-text-color;
					&::placeholder{
						font-size:13px;
					}
				}
				.text-area{
					display:block;
					width: 100%;
					  overflow: hidden;
					  resize: vertical;
						text-align:left;
					  line-height: 20px;
					  outline:none;
			
						min-height:22.3px;
				}
				.text-area[contenteditable]:empty::before {
				  content: "输入";
				  color: $light-text-color;
				  font-size:13px;
				}


			}
			.subsection.barcode{
				grid-template-columns:1fr 2fr 1fr;
				.scan-button{
	
					width:100%;
					display:block;
					text-align:right;
				}
			}
			.subsection.note{
				grid-template-columns:1fr;
			}
		}
		
		.images-uploader{
			background-color:white;
			padding:12px 10px 0px 10px;
			margin-bottom:5px;
			display:flex;
			flex-direction:column;
			// align-items:flex-start;
			.title{
				color:$light-text-color;
				padding-bottom:5px;
				font-size:12px;
				align-self:flex-start
			}
		}
	}
</style>