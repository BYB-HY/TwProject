<template>
    <div>
        <Bread-Crumb  />
        <el-card>
            <el-form :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="资产编号" prop="asset_number">
                            <el-input v-model="ruleForm.asset_number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="资产类型" prop="asset_type">
                            <el-input v-model="ruleForm.asset_type"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="资产品牌" prop="brand">
                            <el-input v-model="ruleForm.brand"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="资产型号" prop="model">
                            <el-input v-model="ruleForm.model"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="使用人" prop="employee_id">
                            <el-input v-model="ruleForm.employee_id"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="内存" prop="memory">
                            <el-input v-model="ruleForm.memory"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="cpu" prop="cpu">
                            <el-input v-model="ruleForm.cpu"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="货物单位" prop="name">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="购买时间等于入库时间" prop="entry_time">
                    <el-date-picker v-model="value" type="date" placeholder="选择日期"></el-date-picker>
                    <span> - </span>
                    <el-time-picker v-model="time" placeholder="选择时间"></el-time-picker>
                </el-form-item>
                <el-form-item label="备注" prop="exit_record">
                    <el-switch v-model="value3" ></el-switch>
                </el-form-item>
                <!-- <el-form-item label="申请人" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="收货地址" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item> -->
                <el-form-item label="承运方式" prop="name">
                    <el-radio v-model="radio" label="1">个人</el-radio>
                    <el-radio v-model="radio" label="2">公司</el-radio>
                </el-form-item>
                <!-- <el-form-item label="活动形式" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>    -->
            </el-form>
            <span>
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </span>
        </el-card>
    </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb"
import {post} from "@/utils/http"
    export default {
        data(){
            return{
                ruleForm:{},
                rules:{},
                options: [
                    // {
                    //     value: '1',
                    //     label: '日用品'
                    // }, 
                    // {
                    //     value: '2',
                    //     label: '纺织品'
                    // }, 
                    // {
                    //     value: '3',
                    //     label: '生鲜'
                    // }, 
                    // {
                    //     value: '4',
                    //     label: '建材'
                    // }, 
                    // {
                    //     value: '5',
                    //     label: '电器'
                    // }
                ],
                value: '',
                time:"",
                value3: false,
                radio:'',
            }
        },
        components:{BreadCrumb},
        methods:{
            save(){
                post('/assets_in',this.ruleForm).then(()=>{
                    this.$message({
                        message:'添加成功',
                        type:'success'
                    }).then(()=>{
                        this.loadData
                    })
                })
            },
            close(){}
        },
    }
</script>

<style lang="less" scoped>
</style>