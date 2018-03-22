<style scoped lang="less">
    .layout-scroll{
        overflow: auto;
        padding:10px;
    }
</style>
<template>
  <div class="layout-scroll">
    <Input v-model="keyword" :placeholder="resource.searchPlaceHolder" @input="onKeywordChange"></Input>
    <Row>
        <Col :span="span" :lg="lg" :md="md" :sm="sm" :xs="xs" :gutter="16" v-for="(item,index) in dataItems" :key="item.sid">
            <CChoiceComponent :long="true" @on-checked="onItemChecked" @on-unchecked="onItemUnChecked" :item="item">
                <Button long :icon="item[iconField]">{{item[titleField]}}</Button>
            </CChoiceComponent>
        </Col>
    </Row>
  </div>
</template>
<script>
    import CChoiceComponent from './CChoiceComponent.vue';
    import resource from '../resources/components/CChoiceComponent.js';
    export default {
        name:'CChoiceListButton',
        data(){
            return {
                selectedChild:null,
                selectedValue:null,
                selectedValues:[],
                resource:resource,
                keyword:null
            }
        },
        methods:{
            onKeywordChange:function(){
                this.selectedChild = null;
                this.$emit('on-filter',this.keyword);
            },
            onItemChecked:function(child,item){
                if(this.multipe){
                    this.selectedValues.push(item);
                }else{
                    if(this.selectedChild){
                        this.selectedChild.selected = !this.selectedChild.selected;
                    }
                    this.selectedChild = child;
                    this.selectedValue = item;
                }
            },
            onItemUnChecked:function(child,item){
                if(this.multipe){
                    var index = this.selectedValues.indexOf(item);
                    if(index>=0){
                        this.selectedValues.splice(index,1);
                    }
                }else{
                    this.selectedChild = null;
                    this.selectedValue = null;
                }
            }
        },
        computed:{
            dataItems:function(){
                return this.items == null?[]:this.items;
            }
        },
        props:[
            'span',
            'lg',
            'md',
            'sm',
            'xs',
            'items',
            'iconField',
            'titleField',
            'multipe'
        ],
        components:{
            CChoiceComponent
        }
    }
</script>
