<style scoped lang="less">
    @import '../styles/mytheme.less';
    .layout{
    }
    .layout-folder-header{
        font-family: @font-family;
        font-size:1rem;
        font-weight: bold;
    }
    .fullWidth{
        width:100%;
    }
    .colspan{
        padding-bottom:12px;
    }
</style>
<style>
    .systemNavigateFolder-hide > .ivu-card-body{
        display: none;
    }
</style>

<template>
  <div class="layout">
      <Card :class="{'systemNavigateFolder-hide':!ui.showItem}">
          <div slot="title">
            <Icon type="android-folder"></Icon>
            {{item.folderName}}
        </div>
        <Button-group slot="extra">
            <Button type="text" size="small" :icon="expendButtonIcon" @click="ui.showItem=!ui.showItem"></Button>
            <Button type="text" size="small" icon="edit" @click="editFolder" v-if="allowEdit"></Button>
            <Button type="text" size="small" icon="close" @click="removeFolder" v-if="allowDelete"></Button>
        </Button-group>
        <Row type="flex" justify="start" align="top" :gutter="16">
            <Col :span="span" :lg="lg" :md="md" :sm="sm" :xs="xs" v-for="childItem of item.items" :key="childItem.menuItemID" class="colspan">
                <Badge :count="childItem.count" :overflow-count="childItem.overflowCount" class="fullWidth">
                    <Button-group class="fullWidth">
                        <Button :type="getItemType(childItem)" :long="!allowDeleteItem" :icon="childItem.icon" :size="size" @click="clickChild(childItem)">{{childItem.actionName}}</Button>
                        <Button v-if="allowDeleteItem" :type="getItemType(childItem)" :size="size" icon="close" @click="removeChild(childItem)"></Button>
                    </Button-group>
                </Badge>
            </Col>
            <Col v-if="allowAddItem" :span="span" :lg="lg" :md="md" :sm="sm" :xs="xs" key="plus" class="colspan">
                <Button type="dashed" long icon="plus" :size="size" @click="addItem"></Button>
            </Col>
        </Row>
      </Card>
  </div>
</template>
<script>
    export default {
        name:'CNavigatorFolder',
        data(){
            return{
                ui:{
                    showItem:true
                }
            }
        },
        methods:{
            removeFolder:function(event){
                this.$emit('on-remove',event,this.item);
            },
            editFolder:function(event){
                this.$emit('on-edit',event,this.item);
            },
            addItem:function(event){
                this.$emit('on-add-item',event,this.item);
            },
            removeChild:function(childItem){
                this.$emit('on-remove-item',event,this.item,childItem);
            },
            clickChild:function(childItem){
                this.$emit('on-click-item',event,this.item,childItem);
            },
            getItemType:function(childItem){
                let result = 'ghost';
                switch(childItem.level){
                    case 1:
                        result = 'primary';
                        break;
                    case 2:
                        result = 'success';
                        break;
                    case 3:
                        result = 'warning';
                        break;
                    case 4:
                        result = 'error';
                        break;
                    case 5:
                        result = 'dashed';
                        break;
                    case 6:
                        result = 'text';
                        break;
                    default:
                        result = 'ghost';
                        break;
                }
                return result;
            }
        },
        computed:{
            expendButtonIcon:function(){
                return this.ui.showItem?'chevron-down':'chevron-up';
            }
        },
        props:[
            'item',
            'span',
            'lg',
            'md',
            'sm',
            'xs',
            'size',
            'allowEdit',
            'allowDelete',
            'allowAddItem',
            'allowDeleteItem'
        ]
    }
</script>
