import config from './config/config';
const routers = [
    {
        path: config.client.root + '/',
        meta: {
            title: '主页'
        },
        component: (resolve) => require(['./views/index.vue'], resolve),
        children:[
            {
                path:'',
                meta:{
                    title:'个人设置'
                },
                component:(resolve) => require(['./views/settint.vue'], resolve)
            },  
            {
                path:'settint',
                meta:{
                    title:'个人设置'
                },
                component:(resolve) => require(['./views/settint.vue'], resolve)
            },     
        ]
    },
    {
        path:config.client.root + '/login',
        meta:{
            title:'用户登录'
        },
        component:(resolve) => require(['./views/login.vue'],resolve)
    },
    {
        path: config.client.root +'/myCenter',
        meta:{
             title:'个人中心'
        },
        component:(resolve) => require(['./views/myCenter.vue'], resolve)
        },  
];
export default routers;