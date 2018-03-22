<style scoped>
    .menuitem-text{
        padding-right:10px;
    }
</style>

<template>
    <div>
        <template v-for="(item,index) in menuItems">
            <component :is="menuType(item[typeField])" :name="item[idField]" :title="item[titleField]">
                <template slot="title" v-if="menuType(item[typeField])==='Submenu'">
                    <Icon :type="item[iconField]" v-if="item[iconField]"></Icon>
                    <span v-if="largeMenuMode">{{item[titleField]}}</span>
                </template>
                <template v-else-if="todoCountList!=null">
                    <Badge :count="getCount(item)" :overflow-count="item[overflowCountField]">
                        <Icon :type="item[iconField]" v-if="item[iconField]"></Icon>
                        <span v-if="largeMenuMode" class="menuitem-text">{{item[titleField]}}</span>
                    </Badge>
                </template>
                <template v-else>
                    <Badge :count="item[countField]" :overflow-count="item[overflowCountField]">
                        <Icon :type="item[iconField]" v-if="item[iconField]"></Icon>
                        <span v-if="largeMenuMode" class="menuitem-text">{{item[titleField]}}</span>
                    </Badge>
                </template>
                <template v-if="menuType(item[typeField])==='Submenu' && item[menuItemsField] && item[menuItemsField].length">
                    <CMenuItem :menuItems="item[menuItemsField]" :largeMenuMode="largeMenuMode" :typeField="typeField" :idField="idField" :titleField="titleField" :iconField="iconField" :menuItemsField="menuItemsField" :countField="countField" :overflowCountField="overflowCountField"></CMenuItem>
                </template>
            </component>
        </template>
    </div>
</template>

<script>
    export default {
        name:'CMenuItem',
        data(){
            return {
                   
            }
        },
        props:[
            'menuItems',
            'largeMenuMode',
            'typeField',
            'idField',
            'titleField',
            'iconField',
            'menuItemsField',
            'countField',
            'overflowCountField'
        ],
        computed:{
            todoCountList:function(){
                return this.$store.state.todoCountList;
            }
        },
        methods:{
            menuType:function(type){
                return type === 0?"Submenu":"Menu-item";
            },
            getCount:function(menuitem){
                 var index = this.todoCountList.findIndex((item)=>{
                      return item.actionRoute == menuitem.actionRoute;
                });
                if(index>=0){
                   return  this.todoCountList[index].count;
                }
                else
                {
                    return 0;
                }
            }
        }
    }
</script>
