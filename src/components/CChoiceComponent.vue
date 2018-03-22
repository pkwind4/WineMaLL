<style scope lang="less">
    @import '../styles/mytheme.less';

    .cchoicecomponent-content {
        position: relative;
        display: inline-block;
        line-height: 1;
        border:1px dashed transparent;
        border-radius: 4px;
    }
    .cchoicecomponent-content-check{
        vertical-align: middle;
        background-color: transparent;
        border:1px dashed @page-background-color;
    }
    .cchoicecomponent-mask{
        position: absolute;
        left: 0px;
        top: 0px;
        height:100%;
        width:100%;
        opacity: 0.1;
        cursor: pointer;
        background-color: @page-background-color;
    }
    .cchoicecomponent-mask-check{
        background-color: @check-mask-color;
    }
    .cchoicecomponent-item {
        position: absolute;
        -webkit-transform: translateX(50%);
        transform: translateX(50%);
        top: -5px;
        right: 5px;
        height: 20px;
        min-width: 20px;
        border: none;
        color: @check-color;
        line-height: 18px;
        text-align: center;
        padding: 0 6px;
        font-size: 16px;
        white-space: nowrap;
        -webkit-transform-origin: -10% center;
        transform-origin: -10% center;
        z-index: 10;
        display: none;
    }
    .cchoicecomponent-item-check{
        display: block;
    }
</style>
<template>
    <div :class="{'cchoicecomponent-content':true,'cchoicecomponent-content-check':selected}" :style="{width:long?'100%':''}">
        <slot></slot>
        <div :class="{'cchoicecomponent-mask':true,'cchoicecomponent-mask-check':selected}" @click="onChange"></div>
        <sup :class="{'cchoicecomponent-item':true,'cchoicecomponent-item-check':selected}">
            <Icon type="checkmark"></Icon>
        </sup>
    </div>
</template>
<script>
    export default{
        name:'CChoiceComponent',
        data(){
            return{
                selected:this.checked
            }
        },
        methods:{
            onChange:function(event){
                this.selected = !this.selected;
                if(this.selected){
                    this.$emit('on-checked',this,this.item);
                }else{
                    this.$emit('on-unchecked',this,this.item);
                }
                this.$emit('on-change',this,this.item,this.selected);
            },
            switchSelected:function(){
                this.selected = !this.selected;
            }
        },
        props:[
            'checked',
            'long',
            'item'
        ]
    }
</script>