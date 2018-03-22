import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Http from 'vue-resource';
import Util from './libs/util';
import App from './app.vue';
import Vuex from 'vuex';
import store from './stores';
import Config from './config/config';
import storageHelper from './helpers/storageHelper';
import 'iview/dist/styles/iview.css';
import './helpers/datetimeFormat';
import './helpers/stringHelper';

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(Http);
Vue.use(Vuex);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    let layout = storageHelper.getItem('layout');
    if(layout){
        let layoutObject = JSON.parse(layout);
        var defaultLayout = store.state.layout;
        for(let item in defaultLayout){
            if(layoutObject[item] === undefined){
                layoutObject[item] = defaultLayout[item];
            }
        }
        store.commit('setLayout', layoutObject)
    }
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    store:store,
    router: router,
    render: h => h(App)
});
