<style scoped lang="less">
    @import '../styles/mytheme.less';
    .layout{
        background: @background-color;
        overflow: auto;
    }
    .layout-header{
        height:60px;
        position:fixed;
        top:0p;
        left:0px;
        right:0px;
    }
    .layout-logo{
        width: 180px;
        height: 40px;
        border-radius: 3px;
        float: left;
        position: relative;
        left: 10px;
        background-image: url(../images/crgd_logo2.png);
        background-size: cover;
    }
    .layout-nav{
        width:200px;
        margin-right:20px;
        float:right;
    }
    .layout-content{
        margin: 0px;
        overflow: hidden;
        background: @background-color;
        background-image:url(../images/login-bg.jpg);
        position: fixed;
        top:60px;
        left:0px;
        right:0px;
        bottom:120px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-content-main-row{
        margin-top:60px;
    }
    .layout-content-large-title{
        font-family: "Helvetica Neue", "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
        font-size:40px;
        width:80%;
        margin-left:20%;
        color:@background-color;
    }
    .layout-footer{
        position: fixed;
        height:120px;
        left:0px;
        right:0px;
        bottom:0px;
        padding: 10px 0 20px;
        text-align: center;
    }
    .card{
        width:80%;
        margin-left:10%;
    }
    .card-title{
        font-size:18px;
        text-align: center;
    }
    .card-button{
        float:right;
    }
</style>
<template>
    <div class="layout" @keydown.enter="login">
        <Row class="layout-header" type="flex" justify="center" align="middle">
            <i-col span="12">
                <div class="layout-logo"></div>
            </i-col>
            <i-col span="12">
                <div class="layout-nav">
                    <Row>
                        <i-col span="12">
                            <a :href="resource.companyOAWebHost">
                                <Icon type="chatbubbles"></Icon>
                                {{resource.companyOA}}
                            </a>
                        </i-col>
                        <i-col span="12">
                            <a :href="resource.crgdWebHost">
                                <Icon type="ios-home"></Icon>
                                {{resource.crgdWeb}}
                            </a>
                        </i-col>
                    </Row>
                </div>
            </i-col>
        </Row>
        <div class="layout-content">
            <Row class="layout-content-main-row" type="flex" justify="center" align="middle">
                <i-col :lg="16" :md="16" :sm="12" :xs="0">
                    <div class="layout-content-large-title">
                        <p>{{resource.word1}}</p>
                        <p>{{resource.word2}}</p>
                    </div>
                </i-col>
                <i-col :lg="8" :md="8" :sm="12" :xs="24">
                    <Card class="card">
                        <p slot="title" class="card-title">
                            <Icon type="ios-unlocked"></Icon>
                            {{resource.login}}
                        </p>
                        <Form ref="form" :model="formData" :rules="rules" :label-width="80">
                            <Form-item prop="userAccount" :label="resource.userAccount">
                                <Input v-model="formData.userAccount" :placeholder="resource.userAccountPlaceholder" :autofocus="true"></Input>
                            </Form-item>
                            <Form-item prop="userPassword" :label="resource.userPassword">
                                <Input v-model="formData.userPassword" type="password" :placeholder="resource.userPasswordPlaceHolder"></Input>
                            </Form-item>
                            <Form-item prop="verificationCode" :label="resource.verificationCode">
                                <Input v-model="formData.verificationCode"  :placeholder="resource.verificationCodeMessage">
                                    <Button v-if="!isSend" slot="append" type="primary"  @click="SendCode" >{{resource.getVerificationCode}}</Button>
                                    <label v-if="isSend" slot="append" >{{resource.verificationCodeWait}}</label>
                                </Input>     
                            </Form-item>
                            <Form-item>
                                <Button type="primary" class="card-button" @click="login" :loading="loadingState">
                                    <span v-if="!loadingState">
                                        <Icon type="log-in"></Icon>
                                        {{resource.login}}
                                    </span>
                                    <span v-else>
                                        <Icon type="log-in"></Icon>
                                        {{resource.logining}}
                                    </span>
                                </Button>
                            </Form-item>
                        </Form>
                    </Card>
                </i-col>
            </Row>
        </div>
        <div class="layout-footer">
            {{resource.copyRight}}
        </div>
    </div>
</template>
<script>
    import resource from '../resources/login.js';
    import dataHelper from '../helpers/dataHelper.js';
    import config from '../config/config.js';
    import debounce from '../../node_modules/lodash/debounce.js';

    export default {
        data(){
            return {
                formData:{
                    userAccount:null,
                    userPassword:null,
                    verificationCode:null
                },
                rules:{
                    userAccount:[
                        {type:"string",required:true,max:64,trigger:"blur",message:resource.userAccountMessage}
                    ],
                    userPassword:[
                        {type:"string",required:true,max:64,trigger:"blur",message:resource.userPasswordMessage}
                    ],
                    verificationCode:[
                        {type:"string",required:true,max:64,trigger:"blur",message:resource.verificationCodeMessage}
                    ],
                },
                isSend:false,
                wait:60,
                resource:resource
            }
        },
        methods:{
            login:debounce(function(){
                var context = this;
                context.$refs["form"].validate((valid)=>{
                    if(valid){
                        dataHelper.postData(context,config.server.host + "/permessions/permession/userlogin",context.formData,(result)=>{
                            context.goBack();
                        },()=>{
                            context.getData(context.$route.query.id);
                        });
                    }
                });
            },200),
            SendCode:function(){
                if(this.formData.userAccount==null||this.formData.userAccount.length<=0){
                    this.$Message.warning(this.resource.userAccountMessage);
                    return ;
                }
                if(this.formData.userPassword==null||this.formData.userPassword.length<=0){
                    this.$Message.warning(this.resource.userPasswordMessage);
                    return ;
                }
                 dataHelper.postData(this, config.server.host + "/permessions/permession/sendVerificationCode", this.formData, (result) => {
                    this.$Message.success(this.resource.verificationCodeSuccess); 
                    this.isSend=true;
                    this.countDownTime();                                           
                });
            },  
            countDownTime:function(){
                if (this.wait == 0) {
                    this.isSend = false;
                    this.wait = 60;
                }
                else {
                    this.resource.verificationCodeWait = this.wait + "秒后重试",
                    this.wait--;
                    let obj=this;
                    setTimeout(function() {
                        obj.countDownTime();
                    }, 1000)
                } 
            },      
            goBack:function(){
                let url = this.$route.query.url?this.$route.query.url:config.client.root;
                url = url?url:config.client.root + '/';
                this.$router.replace({
                    path:url,
                    query:{
                        t:(new Date()).getTime()
                    }
                });
            }
        },
        computed:{
            loadingState:function(){
                return this.$store.state.loadingState;
            }
        }
    }
</script>
