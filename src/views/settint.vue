<style scoped lang="less">
    .demo-carousel{
        height:200px;line-height:200px;text-align:center;color:#fff;font-size:20px;background:#506b9e
    }
</style>
<template>
     <Carousel autoplay  loop >
        <CarouselItem>
            <div class="demo-carousel">vuex状态管理</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">vue-router路由</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">vue全家桶及项目架构</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">vue的缺点</div>
        </CarouselItem>
    </Carousel>
</template>

<script>
    import config from '../config/config.js';
    import dataHelper from '../helpers/dataHelper.js';
    import storageHelper from '../helpers/storageHelper.js';
    import resource from '../resources/index.js';
    import debounce from '../../node_modules/lodash/debounce.js';

    export default {
        data(){
            return {
              value:"456"
            };
        },
        methods:{
           
        },
        computed:{
           
        },
        mounted:function(){
            
        },
        components:{
           
        }
    }
</script>
