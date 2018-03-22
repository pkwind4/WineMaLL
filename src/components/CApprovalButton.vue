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
        height: 42px;
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
    .choice-employee-item{
        height: 300px;
        overflow: auto;
        border-width: 1px;
        border-style: inset;
        margin-left: 5px;
    }
    .choice-employee-title{
        font-weight: bold;
        text-align: center;
        color:#1c2438;
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
            <Row class="approval-editor-row1" type="flex" justify="start" align="middle">
                <Col class="approval-editor-col">
                    <ButtonGroup>
                        <Button :loading="loadingState" class="approval-button" type="warning" :icon="getIcon(step)" @click="onClick">
                            {{getTitle(step)}}
                        </Button>
                        <Button :loading="loadingState" v-if="allowTransfer" class="approval-button" type="error" icon="share" @click="onTransfer">
                            {{resource.transferTitle}}
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </template>
        <template v-if="step.stepState == 2">
            <!--当前步骤为已处理步骤-->
            <Row class="approval-editor-row1" type="flex" justify="start" align="middle" v-for="sign in getStepSigns()" :key="sign.sid" v-if="(sign.state==2 || sign.state==3) && sign.actualSignerName">
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
        <Modal
            v-model="showModal"
            :title="resource.transferWindowTitle"
            @on-ok="onChoiceTransfer"
            >
            <Row style="margin-bottom:15px;">
                <Col span="4">
                    <div style="padding-top:8px;">
                        <Icon type="ios-search-strong"></Icon>{{resource.transferWindowSearchTitle}}
                    </div>
                </Col>
                <Col span="16">
                    <Input v-model="searchKey" @on-enter="onSearchEmp"></Input>
                </Col>
                <Col span="4">
                    <Button style="margin-left:5px;" type="primary" icon="ios-search-strong" @click="onSearchEmp">{{resource.transferWindowSearchButtonTitle}}</Button>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <div class="choice-employee-title">{{resource.transferWindowOrgTitle}}</div>
                </Col>
                <Col span="8">
                    <div class="choice-employee-title">{{resource.transferWindowEmpTitle}}</div>
                </Col>
                <Col span="8">
                    <div class="choice-employee-title">{{resource.transferWindowSelectedEmpTitle}}</div>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <div  class="choice-employee-item">
                        <Tree :data="organizations" @on-select-change="onOrgChange"></Tree>
                    </div>
                </Col>
                <Col span="8">
                    <div  class="choice-employee-item">
                        <ButtonGroup vertical>
                            <Button type="text" icon="ios-person" style="text-align:left;" v-for="(item,index) in employees" :key="index" @click="function(){onChoiceEmployee(item)}">{{item.display}}</Button>
                        </ButtonGroup>
                    </div>
                </Col>
                <Col span="8">
                    <div  class="choice-employee-item">
                        <div style="padding-left:5px;" v-for="(item,index) in selectedEmployees" :key="index">
                            <Tag color="blue" closable @on-close="function(){onRemoveEmployee(item);}">{{item.display}}</Tag>
                        </div>
                    </div>
                </Col>
            </Row>
        </Modal>
    </div>
</template>
<script>
    import resource from '../resources/components/CApprovalButton';
    import dataHelper from '../helpers/dataHelper.js';
    import config from '../config/config.js';

    export default{
        name:'CApprovalButton',
        props:[
            'step',
            'currentStep',
            'handledSteps',
            'unHandledSteps',
            'allowTransfer'
        ],
        data(){
            return {
                resource:resource,
                showModal:false,
                organizations:[],
                employees:[],
                selectedEmployees:[],
                searchKey:null
            }
        },
        computed:{
            loadingState: function () {
                return this.$store.state.loadingState;
            }
        },
        methods:{
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
            onClick:function(){
                this.$emit('click',this.step);
            },
            onTransfer:function(){
                this.selectedEmployees.splice(0,this.selectedEmployees.length);
                this.searchKey = null;
                this.getOrgs();
                this.showModal = true;
            },
            onSearchEmp:function(){
                if(this.searchKey){
                    this.getEmps(null,this.searchKey);
                }
            },
            getOrgs:function(){
                dataHelper.postData(this,config.server.host + '/Permessions/BaseData/QueryOrganizationsTree',null,(result)=>{
                    this.organizations = result.data;
                });
            }, 
            getEmps:function(orgID,empKey){
                var sortCondition = [];
                sortCondition.push({
                    columnName:'EmployeeName',
                    order:'ASC'
                });
                var queryCondition = {
                    conditionType:'AndGroup',
                    value:[]
                };
                if(orgID){
                    queryCondition.value.push({
                        columnName:'OrganizationID',
                        value:orgID,
                        conditionType:'Equal'
                    });
                }
                if(empKey){
                    queryCondition.value.push({
                        columnName:'EmployeeName',
                        value:empKey,
                        conditionType:'Contains'
                    });
                }
                dataHelper.postData(this,config.server.host + '/Permessions/Users/QueryEmployees'
                ,{
                    pageIndex:1,
                    pageSize:99999,
                    queryCondition:queryCondition.value.length?JSON.stringify(queryCondition):null,
                    sortCondition:JSON.stringify(sortCondition)
                }
                ,(result)=>{
                    this.employees = result.data.rows;
                });
            },
            onOrgChange:function(selectedObjects){
                if(selectedObjects.length){
                    var orgID = selectedObjects[0].organizationID;
                    this.getEmps(orgID);
                }
            },
            onChoiceEmployee:function(employee){
                if(this.getSelectedEmployeeIndex(employee)<0){
                    this.selectedEmployees.push(employee);
                }
            },
            getSelectedEmployeeIndex:function(employee){
                var result = -1;
                this.selectedEmployees.every((item,index)=>{
                    if(item.value===employee.value){
                        result = index;
                        return false;
                    }else{                        
                        return true;
                    }
                });
                return result;
            },

            onRemoveEmployee:function(employee){
                var index = this.getSelectedEmployeeIndex(employee);
                if(index>=0){
                    this.selectedEmployees.splice(index,1);
                }
            },
            onChoiceTransfer:function(){
                this.$emit('onTransfer',this.selectedEmployees);
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
