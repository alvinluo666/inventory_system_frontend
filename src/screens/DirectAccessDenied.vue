<!-- //to protect some route from direct access -->
<template>
	<div class="access-denied">
		<img src="@/assets/images/app/error-page.png">
		<p>Due to some internal structure of the app, you can't directly access this page from url !</p>
		<div @click="goHome">Go back</div>
	</div>

</template>
<script type="text/javascript">
	export default {
		methods:{
			goHome(){
				this.$router.go(-1);
			}
		}
	}

</script>
<style lang="scss" scoped>
	@import '../assets/scss/constant.scss';
	.access-denied{
		display:flex;
		align-items:center;
		justify-content:center;
		flex-direction :column;
		width:100vw;
		height:100vh;
		img{
			width:200px;
			height:200px;
		}
		p{
			padding:10px 20px;
			color:$light-text-color;
		}
		div{
			margin:100px 0px;
			background:$background-color;
			height:40px;
			display:flex;
			align-items:center;
			justify-content:center;
			padding:0px 20px;
			color:$dark-text-color
			
		}
	}
</style>