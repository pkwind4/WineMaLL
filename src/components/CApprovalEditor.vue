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
            <!--当前步骤未处理-->
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
            <!--当前步骤待处理-->
            <Row class="approval-editor-row1" type="flex" justify="start" align="middle" v-for="field in step.fields" :key="step.sid + '_' + field.fieldID" v-if="isCreateElement(field)">
                <Col class="approval-editor-col approval-editor-col2" v-if="isShowLabel(field)">
                    {{field.fieldHeader}}
                </Col>
                <Col class="approval-editor-col approval-editor-col3 input">
                    <div class="approval-full-width">
                        <div class="approval-full-width" v-if="field.inputElement=='RadioButtons'">
                            <Checkbox :ref="field.fieldName" v-for="dataItem in getDatasource(field)" :value="isCurrentStepDataItemChecked(field,dataItem)" :key="dataItem.sid" @on-change="onRadioButtonChange(field,dataItem,$event)" :disabled="getFieldDisabled(field)">{{dataItem[field.displayNameOrMinValue]}}</Checkbox>
                        </div>
                        <div class="approval-full-width" v-if="field.inputElement=='TextInputs'">
                            <Input :ref="field.fieldName" v-model="currentStep[field.fieldName.toFirstCharLower()]" :disabled="getFieldDisabled(field)"></Input>
                        </div>
                        <div class="approval-full-width" v-if="field.inputElement=='Textareas'">
                            <Input :ref="field.fieldName" v-model="currentStep[field.fieldName.toFirstCharLower()]" :disabled="getFieldDisabled(field)"></Input>
                        </div>
                        <div class="approval-full-width" v-if="field.inputElement=='Search'">
                            <Select :ref="field.fieldName" v-model="currentStep[field.fieldName.toFirstCharLower()]" :disabled="getFieldDisabled(field)" clearable filterable remote  label-in-value not-found-text=""  :remote-method="function(keyword){loadSearchDatasource(field,keyword)}">
                                <Option v-for="item in searchDatasource" :value="item.oID" :key="item.oID" :label="item.oName"></Option>
                            </Select>
                        </div>
                        <div class="approval-full-width" v-if="field.inputElement=='Dates'">
                            <DatePicker v-model="currentStep[field.fieldName.toFirstCharLower()]"  :disabled="getFieldDisabled(field)" type="date" placeholder="选择日期"  class="full-width" @on-change="selectDate(field.fieldName.toFirstCharLower(),$event)"></DatePicker>
                        </div>
                    </div>
                </Col>
            </Row>
        </template>
        <template v-if="step.stepState == 2">
            <!--当前步骤已处理-->
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
            <!--当前步骤忽略-->
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
        name:'CApprovalEditor',
        props:[
            'step',
            'currentStep',
            'handledSteps',
            'unHandledSteps',
            'value'
        ],
        data(){
            return {
                disabled:{},
                searchDatasource:[],
                resource:resource
            }
        },
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
                    case "Dates":
                        return true;
                        break;
                    case "Search":
                        return true;
                        break;
                    default:
                        return false;
                        break;
                }
            },
            selectDate:function(fieldName,value){
                 this.currentStep[fieldName]=value;   
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
            getFieldDisabled:function(field){
                var disable = this.disabled[field.fieldName.toFirstCharLower()];
                return disable;
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
            isCurrentStep:function(){
                return this.step.stepID == this.currentStep.stepID;
            },
            IsDataItemHandled:function(signed,field,dataItem){
                return signed[field.fieldName.toFirstCharLower()] == dataItem[field.valueOrMaxValue];
            },
            isCurrentStepDataItemChecked:function(field,dataItem){
                return this.currentStep[field.fieldName.toFirstCharLower()] === dataItem[field.valueOrMaxValue]
            },
            onRadioButtonChange:function(field,dataItem,checked){
                if(checked){
                    this.currentStep[field.fieldName.toFirstCharLower()] = dataItem[field.valueOrMaxValue];
                }else{
                    this.currentStep[field.fieldName.toFirstCharLower()] = null;
                }
            },
            initWatch:function(){
                let context = this;
                if(context.step.stepID == context.currentStep.stepID){
                    context.step.fields.forEach(field=>{
                        context.$set(context.disabled,field.fieldName.toFirstCharLower(),false);
                        if(field.fireValueChange && field.valueChangeCode){
                            context.$watch('currentStep.' + field.fieldName.toFirstCharLower(),function(value){
                                eval(field.valueChangeCode + '//# sourceURL=onValueChange' + field.fieldName + field.fieldID + '.js');
                            });
                            context.$nextTick(function(){
                                var oldValue = context.currentStep[field.fieldName.toFirstCharLower()];
                                context.currentStep[field.fieldName.toFirstCharLower()] = oldValue==null?"":null;
                                context.$nextTick(function(){
                                    context.currentStep[field.fieldName.toFirstCharLower()] = oldValue;
                                })
                            })
                            
                        }
                    });
                }
            },
            loadSearchDatasource:debounce(function(field,keyword){
                if(this.getFieldDisabled(field)){
                    return;
                }
                var queryCondition = {
                    conditionType:"OrGroup",
                    value:[]
                };
                if(keyword){
                    queryCondition.value.push({
                        conditionType:"Contains",
                        columnName:"oName",
                        value:keyword
                    });
                }
                dataHelper.postData(this,config.server.host + '/finances/creditNoteByPurchaseAbandonReasonOthers/query',{
                        pageIndex:1,
                        pageSize:20,
                        queryCondition:JSON.stringify(queryCondition)
                    },
                    (result)=>{
                        if(result.data.rows.length==0){
                            this.searchDatasource=[{oID:0,oName:keyword}];
                        }else
                        {
                            this.searchDatasource = result.data.rows;
                        }
                    }
                );
            },200)
        },
        mounted:function(){
            this.initWatch();
        }
    }
</script>