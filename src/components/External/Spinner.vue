<template>
  <div>
      <a-spin :indicator="indicator" >
    
    </a-spin>
    <p style="color:lightgrey;padding-top:5px;font-size:10px">加载中...</p>
  </div>
</template>
<script lang="ts">
import { LoadingOutlined } from '@ant-design/icons-vue';
import { defineComponent, h } from 'vue';

export default defineComponent({
  setup() {
    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: '24px',
        color:'lightgrey'
      },
      spin: true,
      
    });
    return {
      indicator,
    };
  },


});
</script>

