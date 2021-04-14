var Ripple= {
    beforeMount : function(e){
        // console.log('h')
    },
    mounted : function(e,binding){
      
        var color = binding.value?binding.value:'rgb(235, 244, 248)';
        var originalBg = e.style.backgroundColor;
        e.addEventListener('mouseover',()=>{
            e.style.backgroundColor=color;
        })
        e.addEventListener('mouseout',()=>{
            e.style.backgroundColor=originalBg;
        })
    }
}

export default Ripple;