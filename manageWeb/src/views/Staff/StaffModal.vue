<template>
    <div>
        <el-dialog
            :title="title"
            :visible="visible"
            width="50%"
            :before-close="close"
        >
            <el-row :gutter="20">
                <el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleform">
                    <el-col :span="12">
                        <el-form-item label="员工号" prop="employee_id">
                            {{ruleForm.employee_id}}
                        </el-form-item>
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="座机电话" prop="landline_phone">
                            <el-input v-model="ruleForm.landline_phone"></el-input>
                        </el-form-item>
                        <el-form-item prop="mobile_phone" label="手机">
                            <el-input v-model="ruleForm.mobile_phone"></el-input>
                        </el-form-item>
                        <el-form-item prop="QQ" label="QQ">
                            <el-input v-model="ruleForm.QQ"></el-input>
                        </el-form-item>
                        <el-form-item prop="email" label="邮箱">
                            <el-input v-model="ruleForm.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="begin_date" label="入职时间">
                            <el-input v-model="ruleForm.begin_date"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="名下资产" prop="price">
                        </el-form-item> -->
                    </el-col>
                </el-form>  
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {post} from "@/utils/http"
import { mapState, mapMutations } from "vuex"
    export default {
        props:["visible"],
        data(){
            return{
                ruleForm:{
                    employee_id:"",
                    name:"",
                    landline_phone:"",
                    mobile_phone:"",
                    QQ: "",
                    email:"",
                    begin_date:""
                },
                rules:{
                    name:[{required:true,message:"不能为空",trigger:"blur"}],
                    email:[{required:true,message:"不能为空",trigger:"blur"}],
                    begin_date:[{required:true,message:"不能为空",trigger:"blur"}],
                    cargo:[{required:true,message:"不能为空",trigger:"blur"}],
                    count:[
                        {required:true,message:"不能为空",trigger:"blur"},
                        {pattern:/^\d+$/,message:"只能为数字",trigger:"blur"}
                    ],
                    unit:[{required:true,message:"不能为空",trigger:"blur"}],
                    price:[{required:true,message:"不能为空",trigger:"blur"}],
                    from:[{required:true,message:"不能为空",trigger:"change"}],
                    pay:[{required:true,message:"不能为空",trigger:"change"}],
                },
                title:"新建订单",
            }
        },
        computed:{
            ...mapState(["row"])
        },
        watch:{
            visible(){
                this.title = this.row.name?"编辑信息" : "员工入职"
                this.ruleForm=this.row
            }
        },
        methods:{
            ...mapMutations(["clearRow"]),
            close(){
                this.$refs.ruleform.resetFields()
                this.$emit("hide")
                this.clearRow()
            },
            save(){
                this.$refs.ruleform.validate((vaild)=>{
                    if(vaild){
                        const id = this.ruleForm.employee_id
                        if(id){
                                post(`/employees/${id}`,this.ruleForm).then(()=>{
                                    console.log(this.$notify,this)
                                this.$notify({
                                    title: '操作成功',
                                    type: 'success'
                                });
                                this.close();
                                this.$emit("reload")
                            })
                        } else {
                            post("/employees_entry",this.ruleForm).then(()=>{
                                this.$notify({
                                    title: '操作成功',
                                    type: 'success'
                                });
                                this.close();
                                this.$emit("reload")
                            })
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>