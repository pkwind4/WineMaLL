<script>
  import { deepCopy } from '../../node_modules/iview/src/utils/assist.js';
  export default {
    name:'CSearchPanelItem',
    render:function(h){
      var context = this;
      return h(context.getComponentType(),context.getComponentAttributes(),context.getComponentChildrenItems().map(function(item){
        return context.getComponentChildrenRender().call(context,h,item);
      }));
    },
    methods:{
      getComponentType:function(){
        return this.component && this.component.type ? this.component.type:'Input';
      },
      getComponentAttributes:function(){
        if(this.component && this.component.attributes){
          return deepCopy(this.component.attributes);
        }else{
          return null;
        }
      }
      ,getComponentChildrenItems:function(){
        if(this.component && this.component.children && this.component.children.items && typeof(this.component.children.render)=="function"){
          return this.component.children.items;
        }else{
          return [];
        }
      },
      getComponentChildrenRender:function(){
        if(this.component && this.component.children && typeof(this.component.children.render)=="function"){
          return this.component.children.render;
        }else{
          return null;
        }
      }
    },
    props:[
      'component'
    ]
  }
</script>
