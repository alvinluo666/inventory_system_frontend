<template>
	<div class="choose-category">
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
		<div class="categories" >
			<a-radio-group v-model="value" @change="onChange" >
				<a-radio :style="radioStyle" :value="0" v-ripple>
			      default
			    </a-radio>
			    <a-radio v-for="category in categories" :key="category.id" :style="radioStyle" :value="category" @touchstart="touchstart($event,category)" @mousedown="touchstart($event,category)" @mouseup="touchend"  @touchend="touchend" @contextmenu="oncontextmenu" v-ripple>
			      {{category.name}}
			    </a-radio>
			    
			    
		  	</a-radio-group>
		</div>
		<a-drawer
	  
	      :placement="placement"
	      :closable="false"
	      :visible="showDrawer"
	      @close="closeDrawer"
	      height="auto"
	    >
	    	<div class="drawer-action">
	    		<span @click="showRenamePopup">重命名</span>
	    		<span @click="showDeletePopup">删除</span>
	    	</div>
	      

	    </a-drawer>
	    <a-modal
		      title="重命名"
		      :visible="showRenameModal"
		      @ok="handleRename"
		      @cancel="handleCancelRename"
		  >
		      <input ref="rename_input" class="rename-input" type="text" name="rename" v-model="rename_value" autofocus>
	    </a-modal>
	     <a-modal
		      title="新增"
		      :visible="showAddNewModal"
		      @ok="handleAddNew"
		      @cancel="handleCancelAddNew"
		  >
		      <input class="addnew-input" type="text" name="new_value" v-model="new_value" autofocus>
	    </a-modal>
	</div>
</template>
<script>
	const components = {
		AppBar
	}
	var timer;// to keep track how many user has press on item

	import {mapState,mapActions,mapMutations} from 'vuex';
	import AppBar from '../../components/AppBar.vue';

	export default{
		components:components,
	
		data(){
			return {
				value: null,
				radioStyle: {
					display: 'block',
					height: '50px',
					fontSize : '13px',
					lineHeight :'50px',
					minWidth:'100vw',
					padding:'0px 30px',
					borderBottom:'0.5px solid rgba(0,0,0,0.05)',

				},
				showDrawer:false,
				placement:'bottom',
				drawerItem : null,//category to perform 
				showRenameModal : false,
				rename_value : '',
				new_value: '',
				showAddNewModal : false
			}
		},
		computed:{
			...mapState('categories',[
				'categories'
			]),
			...mapState([
				'tempCategory'
			])
		},
		methods:{
			...mapMutations([
				'setTempCategory'
			]),
			...mapActions('categories',[
				'deleteCategory',
				'updateCategory',
				'addCategory'
			]),
			addNew(){
				this.showAddNewModal = true;
				setTimeout(()=>{
					document.getElementsByClassName('addnew-input')[0].focus();
				},500)
			},
			async handleAddNew(){
				var name = this.new_value.trim();
				var alreadyExist = false;
				await this.categories.forEach((category)=>{
					if(category.name==name){
						this.$message.warning('Category already exists!')
						alreadyExist = true;

					}

				})
				if(name==''){
					this.$message.warning('Please Enter something!');
				}else{

					if(!alreadyExist){
						this.addCategory(name).then((response)=>{
							if(response.data.status!=200){
								console.log(response);
								this.$message.error('Something went wrong!')
							}else{
								this.$message.success('Add successfully!');
								this.showAddNewModal = false;
							}
						}).catch((e)=>{
							console.log(e)
							this.$message.error('Something went wrong!')
						})
					}

				}
	
			},
			handleCancelAddNew(){
				this.showAddNewModal = false;
			},
			onChange(e){
				//on radio change
				if(e.target.value==0){
					this.setTempCategory({id:e.target.value,name:'default'})
				}else{
					this.setTempCategory(e.target.value);
				}
				
				this.$router.go(-1);
			},
			openDrawer(category){
				this.drawerItem=category
				this.showDrawer=true;
			},
			closeDrawer(){
				this.showDrawer=false;
			},
			touchstart(e,category){

				// e.preventDefault();
				if(!timer){

					timer = setTimeout(()=>{
						
						this.openDrawer(category)
					},500);
				}

			},
			touchend(){
				if(timer){
					clearTimeout(timer);
					timer = null;
				}
			},
			oncontextmenu(e){
				// disable default menu
				console.log(e);
				e.preventDefault();
				return false;
			},
			removeCategory(){
				this.deleteCategory(this.drawerItem.id).then((response)=>{
			        if(response.data.status!=200){
			        	this.$message.error('Something went wrong Please try again!');
			        }else{
			        	this.$message.success('Delete successfully!');
			        	this.showDrawer=false;
			        }
			    }).catch((e)=>{
			    	this.$message.error('Something went wrong Please try again!');
			    })
			},
			showDeletePopup(){
				
				this.$confirm({
			        title: '是否删除此分类 : '+this.drawerItem.name+'?',
			        
			        okText: 'Yes',
			        okType: 'danger',
			        cancelText: 'No',
			        onOk : this.removeCategory,
			        onCancel() {
			          
			        },
			     });
			},
			showRenamePopup(){

				this.showRenameModal = true;
				setTimeout(()=>{
					document.getElementsByClassName('rename-input')[0].focus();
				},500)
				
				this.rename_value = this.drawerItem.name;
				
			},
			handleRename(){
				var name = this.rename_value.trim();
				if(name==this.drawerItem.name||name==''){
					this.$message.warning('Please change something!');
				}else{
			
					this.updateCategory({name,id:this.drawerItem.id}).then((response)=>{
						if(response.data.status!=200){
							this.$message.error('Something went wrong!')
						}else{
							this.$message.success('Update successfully!');
							this.showRenameModal = false;
							this.showDrawer = false;
						}
					}).catch((e)=>{
						this.$message.error('Something went wrong!')
					})
				}
			},
			handleCancelRename(){
				
				this.showRenameModal= false;
				this.rename_value = this.drawerItem.name;

			},
			onLongPressStop(){
				console.log('stop')
			},
			onLongPressStart(){
				console.log('f');
			}
		},
		mounted(){
			document.activeElement.blur();
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../assets/scss/constant.scss';
	.choose-category{
		background:$background-color;
		height:100%;
		.categories{
		
			background:white;
			text-align:left;
			user-select:none;
		}
		user-select:none;
		
	}
	.drawer-action{
		display:flex;
		flex-direction:column;
		text-align:center;
		justify-content:center;
		span{
			display:block;
			width:100%;
			padding:15px 0px;
			font-size:12px;
			&:last-child{
				color:red;
			}
		}
		user-select:none;
	}
	.rename-input,.addnew-input{
		outline:none;
		border:none;
		height:30px;
		width:100%;
	}
</style>