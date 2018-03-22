<style scoped lang="less">
    .form-item{
      padding-left:10px;
      margin-bottom:0px;
    }
    .ivu-date-picker{
        padding-top:5px;
    }
</style>
<template>
    <Form :label-width="80" ref="form">
        <Row type="flex" justify="start" align="middle">
            <i-col :lg="mainCellLg" :md="mainCellMd" :sm="mainCellSm" :xs="mainCellXs">
                <Row>
                    <i-col :lg="getCellLg(editorItem)" :md="getCellMd(editorItem)" :sm="getCellSm(editorItem)" :xs="getCellXs(editorItem)" v-for="(editorItem,name) in editors" :key="editorItem.label">
                        <Form-item class="form-item" :label="editorItem.label" :prop="name">
                            <CSearchPanelItem :component="editorItem.component"></CSearchPanelItem>
                        </Form-item>
                    </i-col>
                </Row>
            </i-col>
            <i-col :lg="buttonCellLg" :md="buttonCellMd" :sm="buttonCellSm" :xs="buttonCellXs">
                <slot name="button"></slot>
            </i-col>
        </Row>
    </Form>
</template>

<script>
    import CSearchPanelItem from './CSearchPanelItem.vue';
    export default{
        name:'CSearchPanel',
        props:[
            'editors',
            'cellsOption'
        ],
        computed:{
            mainCellLg:function(){
                return this.cellsOption && this.cellsOption.mainCell && this.cellsOption.mainCell.lg != null?this.cellsOption.mainCell.lg:22;
            },
            mainCellMd:function(){
                return this.cellsOption && this.cellsOption.mainCell && this.cellsOption.mainCell.md != null?this.cellsOption.mainCell.md:21;
            },
            mainCellSm:function(){
                return this.cellsOption && this.cellsOption.mainCell && this.cellsOption.mainCell.sm != null?this.cellsOption.mainCell.sm:20;
            },
            mainCellXs:function(){
                return this.cellsOption && this.cellsOption.mainCell && this.cellsOption.mainCell.xs != null?this.cellsOption.mainCell.xs:19;
            },
            buttonCellLg:function(){
                return this.cellsOption && this.cellsOption.buttonCell && this.cellsOption.buttonCell.lg != null?this.cellsOption.buttonCell.lg:2;
            },
            buttonCellMd:function(){
                return this.cellsOption && this.cellsOption.buttonCell && this.cellsOption.buttonCell.md != null?this.cellsOption.buttonCell.md:3;
            },
            buttonCellSm:function(){
                return this.cellsOption && this.cellsOption.buttonCell && this.cellsOption.buttonCell.sm != null?this.cellsOption.buttonCell.sm:4;
            },
            buttonCellXs:function(){
                return this.cellsOption && this.cellsOption.buttonCell && this.cellsOption.buttonCell.xs != null?this.cellsOption.buttonCell.xs:5;
            }
        },
        methods:{
            getCellLg:function(item){
                return item && item.cellOption && item.cellOption.lg != null?item.cellOption.lg:6;
            },
            getCellMd:function(item){
                return item && item.cellOption && item.cellOption.md != null?item.cellOption.md:12;
            },
            getCellSm:function(item){
                return item && item.cellOption && item.cellOption.sm != null?item.cellOption.sm:12;
            },
            getCellXs:function(item){
                return item && item.cellOption && item.cellOption.xs != null?item.cellOption.xs:12;
            }
        },
        components:{
            CSearchPanelItem
        }
    }
</script>
