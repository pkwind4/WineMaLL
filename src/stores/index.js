import Vue from 'vue';
import Vuex from 'vuex';
import storageHelper from '../helpers/storageHelper';

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
      sessionid: null,
      layout: {
          menu: {
              visible: true,
              largeMode: true
          },
          searchPanel: {
              visible: true
          },
          mainPanel: {
              largeMode: false
          },
          isSystemView: true
      },
      loadingState: false,
      todoCountList:null,
      
  },
  mutations:{
      setSessionID(state,sessionid){
          state.sessionid = sessionid;
      },
      setLayout(state,layout){
          state.layout = layout
          storageHelper.setItem('layout',JSON.stringify(layout));
      },
      setLoadingState(state,loadingState){
          state.loadingState = loadingState;
      },
      setMenuLargeMode(state,largeMode){
          state.layout.menu.largeMode = largeMode;
      },
      setMenuVisible(state,visible){
          state.layout.menu.visible = visible;
      },
      setSearchPanelVisible(state,visible){
          state.layout.searchPanel.visible = visible;
      },
      setIsSystemView(state,isSystemView){
          state.layout.isSystemView = isSystemView;
      },
      setTodoCount(state,todoCountList){
          state.todoCountList = todoCountList; 
      },
      
  },
  getters:{
      menuWidth:state=>{
          if(state.layout.menu.visible){
            return state.layout.menu.largeMode?230:105;
          }else{
              return 0;
          }
      }
  }
})