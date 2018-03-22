<style scoped lang="less">
    @import '../styles/mytheme.less';
    .approval-editor-row{
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        width:100%;
        flex-direction: column;
        border-bottom:1px solid @font-color;
    }
    .approval-editor-row:last-child{
        flex-grow: 1;
        border-bottom:none;
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
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .approval-editor-col:last-child{
        flex-grow: 1;
        border-right:none;
    }
    .approval-editor-col2{
        width:140px;
    }
    .approval-editor-col3{
        width:100px;
    }
    .approval-editor-col4{
        width:140px;
    }
    .approval-editor-col5{
        width:100px;
    }
    .approval-editor-col6{
        width:140px;
    }
    .approval-editor-col2-5{
        width:620px;
    }
    .approval-editor-col2-3{
        width:240px;
    }
    .approval-editor-col2-4{
        width:480px;
    }
    .approval-editor-col-full{
        flex-grow: 1;
    }
    .approval-full-width{
        width:100%;
        display:flex;
        justify-content: center;
    }
     .full-width{
        width:100%;
    } 
    .input{
        background-color: @input-background-color;
    }
    .un-checked{
        color:#bbbec4;
    }
</style>

<template>
    <div class="approval-editor-row">
        <template v-if="step.stepState == 0">
            <!--步骤处于未审批处理状态，只显示一行输入框-->
            <template v-if="getStepSigns().length">
                <Row class="approval-editor-row1" type="flex" justify="start" align="middle" v-for="field in step.fields" :key="step.stepID + '_' + field.fieldID" v-if="isCreateElement(field)">
                    <Col class="approval-editor-col approval-editor-col2" v-if="isShowLabel(field)">
                        {{field.fieldHeader}}
                    </Col>
                    <Col class="approval-editor-col approval-editor-col3 input">         
                        <div class="approval-full-width" >
                            <div class="approval-full-width" v-if="field.inputElement=='RadioButtons'">
                                <Checkbox v-for="dataItem in getDatasource(field)" class="un-checked" disabled :key="dataItem.sid">{{dataItem[field.displayNameOrMinValue]}}</Checkbox>
                            </div>
                            <div class="approval-full-width" v-if="field.inputElement=='TextInputs'">
                                <Input disabled></Input>
                            </div>
                            <div class="approval-full-width" v-if="field.inputElement=='Textareas'">
                                <Input disabled></Input>
                            </div>
                            <div class="approval-full-width" v-if="field.inputElement=='Search'">
                                <Select disabled></Select>
                            </div>
                            <div class="approval-full-width" v-if="field.inputElement=='Dates'">
                            <DatePicker disabled type="date" placeholder="选择日期"  class="full-width" ></DatePicker>
                            </div>
                        </div>
                    </Col>
                </Row>
            </template>
        </template>
        <template v-if="step.stepState == 1">
            <!--步骤处于待处理状态，如果当前签名行状态为待处理，显示禁用的编辑框行，如果为已处理，显示处理结果，如果转发则不显示编辑框行-->
            <template v-for="(signItem,signIndex) in getStepSigns()">
                <template v-if="signItem.state == 1">
                    <Row class="approval-editor-row1" type="flex" justify="start" align="middle" v-for="field in step.fields" :key="step.stepID + '_' + field.fieldID" v-if="isCreateElement(field)">
                        <Col class="approval-editor-col approval-editor-col2" v-if="isShowLabel(field)">
                            {{field.fieldHeader}}
                        </Col>
                        <Col class="approval-editor-col approval-editor-col3 input">         
                            <div class="approval-full-width" >
                                <div class="approval-full-width" v-if="field.inputElement=='RadioButtons'">
                                    <Checkbox v-for="dataItem in getDatasource(field)" class="un-checked" disabled :key="dataItem.sid">{{dataItem[field.displayNameOrMinValue]}}</Checkbox>
                                </div>
                                <div class="approval-full-width" v-if="field.inputElement=='TextInputs'">
                                    <Input disabled></Input>
                                </div>
                                <div class="approval-full-width" v-if="field.inputElement=='Textareas'">
                                    <Input disabled></Input>
                                </div>
                                <div class="approval-full-width" v-if="field.inputElement=='Search'">
                                    <Select disabled></Select>
                                </div>
                                <div class="approval-full-width" v-if="field.inputElement=='Dates'">
                                <DatePicker disabled type="date" placeholder="选择日期"  class="full-width" ></DatePicker>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </template>
                <template v-if="signItem.state == 2 || signItem.state == 3 || signItem.state == 4">
                    <Row class="approval-editor-row1" type="flex" justify="start" align="middle" v-for="field in step.fields" :key="signItem.sid + '_' + field.fieldID" v-if="isCreateElement(field)">
                        <Col class="approval-editor-col approval-editor-col2" v-if="isShowLabel(field)">
                            {{field.fieldHeader}}
                        </Col>
                        <Col class="approval-editor-col approval-editor-col3 input">
                            <div class="approval-full-width" v-if="field.inputElement=='RadioButtons'">
                                <div v-for="dataItem in getDatasource(field)" v-if="IsDataItemHandled(signItem,field,dataItem)" :key="dataItem.sid"><Icon type="android-checkbox-outline" color="#ed3f14" size="16"></Icon> {{dataItem[field.displayNameOrMinValue]}}</div>
                            </div>
                            <div class="approval-full-width" v-if="field.inputElement=='TextInputs'">
                                <div>{{signItem[field.fieldName.toFirstCharLower()]}}</div>
                            </div>
                            <div class="approval-full-width" v-if="field.inputElement=='Textareas'">
                                <div>{{signItem[field.fieldName.toFirstCharLower()]}}</div>
                            </div>
                            <div class="approval-full-width" v-if="field.inputElement=='Dates'">
                                <div>{{signItem[field.fieldName.toFirstCharLower()]}}</div>
                            </div>
                        </Col>
                    </Row>
                </template>
            </template>
        </template>
        <template v-if="step.stepState == 2">
            <!--当前步骤状态为已处理，只显示已处理的结果-->
            <template v-for="(signItem,signIndex) in getStepSigns()">
                <template v-if="signItem.state == 2 || signItem.state == 3">
                    <Row class="approval-editor-row1" type="flex" justify="start" align="middle" v-for="field in step.fields" :key="signItem.sid + '_' + field.fieldID" v-if="isCreateElement(field)">
                        <Col class="approval-editor-col approval-editor-col2" v-if="isShowLabel(field)">
                            {{field.fieldHeader}}
                        </Col>
                        <Col class="approval-editor-col approval-editor-col3 input">
                            <div class="approval-full-width" v-if="field.inputElement=='RadioButtons'">
                                <div v-for="dataItem in getDatasource(field)" v-if="IsDataItemHandled(signItem,field,dataItem)" :key="dataItem.sid"><Icon type="android-checkbox-outline" color="#ed3f14" size="16"></Icon> {{dataItem[field.displayNameOrMinValue]}}</div>
                            </div>
                            <div class="approval-full-width" v-if="field.inputElement=='TextInputs'">
                                <div>{{signItem[field.fieldName.toFirstCharLower()]}}</div>
                            </div>
                            <div class="approval-full-width" v-if="field.inputElement=='Textareas'">
                                <div>{{signItem[field.fieldName.toFirstCharLower()]}}</div>
                            </div>
                            <div class="approval-full-width" v-if="field.inputElement=='Dates'">
                                <div>{{signItem[field.fieldName.toFirstCharLower()]}}</div>
                            </div>
                        </Col>
                    </Row>
                </template>
            </template>
        </template>
        <template v-if="step.stepState == 3">
            <!--当前步骤为忽略步骤，显示无需处理文字提示-->
            <Row class="approval-editor-row1" type="flex" justify="start" align="middle">
                <Col class="approval-editor-col">
                    {{step.isSign?resource.signStepIgon:resource.handleStepIgon}}
                </Col>
            </Row>
        </template>
    </div>
</template>

<script>
    import dataHelper from '../helpers/dataHelper.js';
    import config from '../config/config.js';
    import debounce from '../../node_modules/lodash/debounce.js';
    import resource from '../resources/components/CApprovalButton';
    export default{
        name:'CApprovalDetailEditor',
        data(){
            return {
                disabled:{},
                searchDatasource:[],
                resource:resource
            }
        },
        props:[
            'step',
            'currentStep',
            'handledSteps',
            'unHandledSteps',
            'value'
        ],   
        computed:{
            isHandled:function(){
                return this.handledSteps[this.step.stepID]!=null;
            }
        },
        methods:{
            isShowLabel:function(field){
                switch(field.inputElement){
                    case "TextInputs":
                        return true;
                        break;
                    case "Search":
                        return true;
                        break;
                    case "Dates":
                        return true;
                        break;
                    default:
                        return false;
                        break;
                }
            },
            getDatasource:function(field){
                if(field.jsonDatasource){
                    return JSON.parse(field.jsonDatasource);
                }else{
                    return [];
                }
            },
            getStepSigns:function(){
                let signs = this.handledSteps[this.step.stepID];
                return signs?signs:[];
            },
            isCreateElement:function(field){
                switch(field.inputElement){
                    case "Hidden":
                        return false;
                        break;
                    default:
                        return true;
                        break;
                }
            },
            IsDataItemHandled:function(signed,field,dataItem){
                return signed[field.fieldName.toFirstCharLower()] == dataItem[field.valueOrMaxValue];
            },
        },
        mounted:function(){
            
        }
    }
</script>