<style scoped lang="less">
    @import '../styles/mytheme.less';
    .approval-editor-row{
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        width:100%;
        flex-direction: column;
    }
    .approval-button{
        margin:auto;
    }
    .approval-editor-row1{
        width:100%;
        align-items: stretch;
        border-bottom:1px solid @font-color;
        flex-grow: 1;
        height:42px;
    }
    .approval-editor-row1:last-child{
        border-bottom: none;
    }
    .approval-editor-col{
        padding:5px;
        border-right:1px solid @font-color;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .approval-editor-col:last-child{
        flex-grow: 1;
        border-right:none;
    }
     .full-width{
        width:100%;
    } 
</style>
<template>
  <div class="approval-editor-row">
        <template v-if="step.stepState == 0">
            <!--当前步骤为未处理步骤-->
            <template v-if="getStepSigns().length">
                <Row class="approval-editor-row1" type="flex" justify="start" align="middle" v-for="sign in getStepSigns()" :key="sign.sid" >
                    <Col class="approval-editor-col">
                        <Tooltip :content="getSignTitle(sign)">
                            <Icon :type="getSignIcon(sign)" size="16"></Icon>
                            {{sign.needSignerName}}{{getStateText(sign)}}
                        </Tooltip>
                    </Col>
                </Row>
            </template>
        </template>
        <template v-if="step.stepState == 1">
            <!--当前步骤为待处理步骤-->
            <Row class="approval-editor-row1" type="flex" justify="start" align="middle" v-for="sign in getStepSigns()" :key="sign.sid" >
                <Col class="approval-editor-col" v-if="!sign.actualSignerName">
                    <Tooltip :content="getSignTitle(sign)">
                        <Icon :type="getSignIcon(sign)" size="16"></Icon>
                        {{sign.needSignerName}}{{getStateText(sign)}}
                    </Tooltip>
                </Col>
                <Col class="approval-editor-col" v-else>
                    <Tooltip :content="getHandledTooltip(sign)">
                        <Icon :type="getIcon(step)" size="16" color="#19be6b"></Icon>
                        {{sign.actualSignerName?sign.actualSignerName:sign.needSignerName}}{{getStateText(sign)}}
                    </Tooltip>
                </Col>
            </Row>
        </template>
        <template v-if="step.stepState == 2">
            <!--当前步骤为已处理步骤-->
            <Row class="approval-editor-row1" type="flex" justify="start" align="middle" v-for="sign in getStepSigns()" :key="sign.sid" v-if="(sign.state == 2 || sign.state==3) && sign.actualSignerName">
                <Col class="approval-editor-col">
                    <Tooltip :content="getHandledTooltip(sign)">
                        <Icon :type="getIcon(step)" size="16" color="#19be6b"></Icon>
                        {{sign.actualSignerName?sign.actualSignerName:sign.needSignerName}}{{getStateText(sign)}}
                    </Tooltip>
                </Col>
            </Row>
        </template>
        <template v-if="step.stepState == 3">
            <!--当前步骤为忽略步骤-->
            <template v-if="getStepSigns().length">
                <Row class="approval-editor-row1" type="flex" justify="start" align="middle" v-for="sign in getStepSigns()" :key="sign.sid" >
                    <Col class="approval-editor-col">
                        <Tooltip :content="getSignTitle(sign)">
                            <Icon :type="getSignIcon(sign)" size="16"></Icon>
                            {{sign.needSignerName}}{{getStateText(sign)}}
                        </Tooltip>
                    </Col>
                </Row>
            </template>
        </template>
  </div>
</template>
<script>
    import resource from '../resources/components/CApprovalButton';
    import datetimeFormat from '../helpers/datetimeFormat';

    export default{
        name:'CApprovalDetailButton',
        data(){
            return {
                resource:resource
            }
        },
        props:[
            'step',
            'currentStep',
            'handledSteps',
            'unHandledSteps'
        ],
        computed:{
            loadingState: function () {
                return this.$store.state.loadingState;
            }
        },
        methods:{
            isHandled:function(item){
                return item.state>1;
            },
            getTitle:function(step){
                return step.isSign?resource.signTitle:resource.handleTitle;
            },
            getIcon:function(step){
                return step.isSign?'ios-compose-outline':'ios-paperplane';
            },
            getStepSigns:function(){
                let signs = this.handledSteps[this.step.stepID];
                return signs?signs:[];
            },
            getSignIcon:function(sign){
                return sign.toggerSign?'android-contacts':'android-contact';
            },
            getSignTitle:function(sign){
                return sign.toggerSign?resource.signMethod2:resource.signMethod1;
            },
            getHandledTooltip:function(sign){
                if(sign.actualSignTime){
                    return sign.actualSignTime.toDateTimeFormat('yyyy-MM-dd hh:mm:ss');
                }
            },
            getStateText:function(sign){
                switch(sign.state){
                    case 1:
                        return resource.state1;
                        break;
                    case 2:
                        return resource.state2;
                        break;
                    case 3:
                        return resource.state3;
                        break;
                    case 4:
                        return resource.state4;
                        break;
                    default:
                        return resource.state0;
                        break;
                }
            }
        }
    }
</script>
