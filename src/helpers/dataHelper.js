import resource from '../resources/dataHelper';
import outputState from '../enums/outputStates.js';
import config from '../config/config';

const dataHelper = {
    postData:function(context,url,data,success,reload){
        var path = context.$route.path.replace(new RegExp("^" + config.client.root,"i"),"");
        path = path?path:"/";
        var body = {
            path:path,
            sessionid:context.$store.state.sessionid,
            data:data
        };
        context.$Loading.start();
        context.$store.commit("setLoadingState",true);
        context.$http.post(url + '?t=' + (new Date()).getTime()
                ,body
                ,{emulateJSON:true,withCredentials:true})
                .then((response)=>{
                    context.$Loading.finish();
                    context.$store.commit('setSessionID',response.data.sessionid);
                    switch(response.data.state){
                        case outputState.success:{
                            if(typeof(success) == 'function'){
                                success(response.data);
                            }
                            context.$store.commit("setLoadingState",false);
                        }
                        break;
                        case outputState.notLogin:{
                            context.$store.commit("setLoadingState",false);
                            let reg= /^\/login$/i;
                            if(!reg.test(context.$route.matched[0].path)){
                                context.$router.push({
                                    path:config.client.root + "/login",
                                    query:{
                                        url:context.$route.fullPath,
                                        t:(new Date()).getTime()
                                    }
                                });
                            }
                        }
                        break;
                        case outputState.notAuthorized:{
                            context.$store.commit("setLoadingState",false);
                            context.$Notice.warning({
                                title:resource.warningTitle,
                                desc:resource.notAuthorized
                            });
                        }
                        break;
                        case outputState.redirect:{
                            context.$store.commit("setLoadingState",false);
                            context.$router.push({
                                path:response.data.data,
                                query:{
                                    t:(new Date()).getTime()
                                }
                            });
                        }
                        break;
                        case outputState.inValid:{
                            context.$store.commit("setLoadingState",false);
                            let msg = [];
                            response.data.data.forEach(function(item,key){
                                msg.push(item.columnName + ":" + item.message);
                            });
                            context.$Notice.error({
                                title:resource.errorTitle,
                                desc:msg.join("</br>")
                            });
                        }
                        break;
                        case outputState.dataConfirm:{
                            context.$store.commit("setLoadingState",false);
                            context.$Modal.confirm({
                                title:resource.confirmTitle,
                                content:resource.dataBeChangeConfirm,
                                okText:resource.dataBeChangeReload,
                                cancelText:resource.dataBeChangeReplace,
                                onOk:function(){
                                    if(typeof(reload) == "function"){
                                        reload();
                                    }
                                },
                                onCancel:function(){
                                    data._forceUpdate = true;
                                    dataHelper.postData(context,url,data,success,confirm);
                                }
                            });
                        }
                        break;
                        default:{
                            context.$store.commit("setLoadingState",false);
                            context.$Notice.error({
                                title:resource.errorTitle,
                                desc:response.data.data
                            });
                        }
                        break;
                    }
                },(response)=>{
                    context.$Loading.error();
                    context.$store.commit("setLoadingState",false);
                    context.$Notice.error({
                        title:resource.errorTitle,
                        desc:resource.netConnectionError
                    });
                });
    }
};
export default dataHelper;