<!-- <template>
	<div class="scanner">
		<div id="scanner"></div>
		<audio controls id="scan-ringtone" hidden>
			<source src="@/assets/ringtones/bell.mp3" type="audio/mpeg">
		</audio>
		<div class="spinner">
		    <a-spin :spinning="decoding"/>
		</div>
		<div class="scanner-icon" v-if="!error">
			<span>Scanning you barcode</span>
		</div>
		
		<div class="error" v-if="error">
			<span>Something went wrong!<br> PLEASE CHECK YOUR CAMERA PERMISSION.<br> Then refresh the browser!</span>
		</div>
		<div class="cancel" @click="back" :style="{color:error?'black':'white'}">
			<span>Cancel</span>
		</div>
	</div>
</template>
<script>
import Quagga from 'quagga';
import {mapMutations} from 'vuex';
export default {
	name:'BarcodeScanner',
	data:function(){
		return {
			codeMap : new Map(),
			decoding : false,
			error:false ,//permission denied
		}
	},

	mounted(){
		this.$nextTick(()=>{
			Quagga.init({
			    inputStream : {
			      name : "Live",
			      type : "LiveStream",
			      target: document.querySelector('#scanner') ,

			      constraints:{
			      	width:window.innerWidth,
			      	height:window.innerHeight
			      } ,
			      
			    },
			    decoder : {
			      readers : ["ean_reader","upc_reader"],
			    

			    },

		  	},
		  	(err)=>{
		  		if(err){
		  			console.log(err);
		  			this.error=true;
		  			return;
		  		}
		  		this.start()
		  	}
		  	)
		})
	},
	methods:{
		...mapMutations([
			'setTempBarcode'
		]),
		start(){
			Quagga.onDetected((data)=>{
		      	var code=data.codeResult.code;
		      	
				if(this.codeMap.has(code)){

					var codeCount = this.codeMap.get(code);
					this.codeMap.set(code,codeCount+1);
					if(codeCount==2){
						Quagga.stop();
						this.decoding = true;
						document.getElementById('scan-ringtone').play();
						var scan_container = document.getElementById('scanner');
						var scan_bar = document.getElementsByClassName(
							'scanner-icon')[0];
						scan_bar.style.animationPlayState='paused';
						scan_bar.style.display="none";
						scan_container.getElementsByTagName('video')[0].pause();
						this.setTempBarcode(code);
						this.back();
					}
					
				
				}else{
					this.codeMap.set(code,1)
				}
				
				
		    })

			Quagga.start();
		      
		},
		back(){
			
			this.$router.go(-1);
			Quagga.stop();
			
		}
		
	},


}
	

</script>

<style>
.scanner{
	position:relative;
	height:100vh;
}
 #scanner{
 	display:flex;
 	justify-content:center;
 	width:100%;
 	height:100%;
 }
 #scanner video,canvas{
 	width:100%;
 	height:100vh;
 	padding:0;
 	margin:0;
 	object-fit:cover;
 	z-index:1;
 }
 #scanner video.drawingBuffer,canvas.drawingBuffer{
 	display:none;
 }
 #scan-ringtone{

 }
 .spinner{
 	z-index:1000;
 	position:absolute;
 	top:50%;
 	left:50%;
 	transform:translate(-50%,-50%)
 }
 .scanner-icon{
 	z-index:1000;
 	position:absolute;
 	top:80%;
 	left:50%;
 	transform:translate(-50%,-50%);
 	background:rgba(0,0,0,0.5);
 	padding:10px 20px;
 	width:60%;
 	border-radius:10px;
 	color:white;
 	animation:splink 2s infinite;
 }
 .cancel{
 	position:absolute;
 	bottom:5%;
 	left:50%;
 	padding:10px 20px;
 	width:100%;
 	border-radius:10px;
 	z-index:1100;
 	transform:translate(-50%,0);
 	color:white;
 }
 .error{
 	position:absolute;
 	top:20%;
 	padding:10px 20px;
 	width:100%;
 	border-radius:10px;
 	z-index:1000;
 	color:black;
 }


 @keyframes movedown{
 	from{
 		top:0%;
 	}
 	to{
 		top:100%;
 		transform:translateY(0);
 	}
 }
 @keyframes splink{
 	0%{
 		opacity:0.3
 	}
 	50%{
 		opacity:1
 	}
 	100%{
 		opacity:0.3
 	}
 }
</style>
 -->