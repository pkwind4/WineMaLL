<style scoped lang="less">
    @import '../styles/mytheme.less';
    .layout{
        min-width:1000px;
    }
    .layout-banner{
    }
    .layout-logo{
        width: 100%;
        height: 40px;
        background: @logo-background-color;
        border-radius: 3px;
        background-image: url(../images/crgd_logo2.png);
        background-size: cover;
    }
    .layout-menu{
        overflow-y: auto;
        overflow-x: hidden;
        position: fixed;
        left: 0px;
        top: 0px;
        bottom: 0px;
        width:200px;
        transition:width 0.3s ease-in;
    }
    .layout-full{
        height:100%;
    }
    .layout-content{
        overflow: auto;
        position: fixed;
        top: 0px;
        right: 0px;
        bottom: 0px;
        background: @background-color;
        transition:left 0.3s ease-in;
    }
    .layout-router-view{
       
    }
    .layout-router-iframe{
        width:100%;
        height:100%;
    }
    .expend-button{
        float:right;
        margin-right:8px;
    }
    .layout-menu-button{
        float:right;
    }
    .layout-menu-show-button{
        position: fixed;
        left:-10px;
        top:36px;
        z-index:1024;
    }

    .slide-fade-enter-active {
        transition: all .3s;
    }
    .slide-fade-leave-active {
        transition: all .3s;
    }
    .slide-fade-enter, .slide-fade-leave-active {
        transform: translateX(-100%);
    }
</style>
<template>
<div class="layout">
        <transition-group name="slide-fade">
            <div class="layout-menu" style="width:250px" key="left-menu">
                <Menu :theme="theme3">
                    <MenuGroup title="内容管理">
                        <MenuItem name="1">
                            <Icon type="document-text"></Icon><router-link to="myCenter">个人中心</router-link>    
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="chatbubbles"></Icon><router-link to="settint">个人设置</router-link>
                        </MenuItem>
                    </MenuGroup>
                    <MenuGroup title="统计分析">
                        <MenuItem name="3">
                            <Icon type="heart"></Icon>
                            用户留存
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="heart-broken"></Icon>
                            流失用户
                        </MenuItem>
                    </MenuGroup>
                </Menu>
            </div>
        </transition-group>
        <div class="layout-content" style="left:250px;overflow:auto">
            <transition-group name="fade" mode="out-in">
                <router-view class="layout-router-view"  key="item1">
                </router-view>
            </transition-group>
        </div>
</div>
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
              theme3: 'dark'
            };
        },
        methods:{
           navToPath:function(url){
                this.$router.push({
                path:url,
                query:{
                    t:(new Date()).getTime()
                }
                });
            },
        },
        computed:{
           
        },
        mounted:function(){
            
        },
        components:{
           
        }
    }
</script>
