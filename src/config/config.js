import Env from './env'; 

const config = {
    env: Env,
    client:{
        root:''
    },
    server:{
        host:Env === 'development'?'http://localhost:2992':'/Server'
    }
};
export default config;