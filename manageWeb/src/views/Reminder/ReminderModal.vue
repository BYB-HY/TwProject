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
                        <el-form-item label="标题" prop="title">
                            <el-input v-model="ruleForm.title"></el-input>
                        </el-form-item>
                        <el-form-item label="到期时间" prop="expiry_date">
                            <el-input v-model="ruleForm.expiry_date"></el-input>
                        </el-form-item>
                        <el-form-item prop="recurring" label="循环">
                            <el-input v-model="ruleForm.recurring"></el-input>
                        </el-form-item>
                        <el-form-item prop="recurring_type" label="循环类型">
                            <el-input v-model="ruleForm.recurring_type"></el-input>
                        </el-form-item>
                        <el-form-item prop="recurring_value" label="循环值">
                            <el-input v-model="ruleForm.recurring_value"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="created_at" label="创建时间">
                            <el-input v-model="ruleForm.created_at"></el-input>
                        </el-form-item>
                        <el-form-item label="更新时间" prop="updated_at">
                            <el-input v-model="ruleForm.updated_at"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" prop="descr">
                            <el-input v-model="ruleForm.descr"></el-input>
                        </el-form-item>
                        <!-- 1为开启，0为关闭 -->
                        <el-form-item label="开启" prop="enabled">
                            <el-input v-model="ruleForm.enabled"></el-input>
                        </el-form-item>
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
import {post, Put} from "@/utils/http"
import { mapState, mapMutations } from "vuex"
    export default {
        props:["visible"],
        data(){
            return{
                ruleForm:{
                    id:"",
                    title:"",
                    expiry_date:"",
                    descr:"",
                    recurring:"",
                    recurring_type:"",
                    recurring_value:"",
                    created_at:"",
                    updated_at:"",
                    enabled:"",
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
                title:"添加提醒",
            }
        },
        computed:{
            ...mapState(["row"])
        },
        watch:{
            visible(){
                this.title = this.row.name?"编辑提醒" : "添加提醒"
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
                        const id = this.ruleForm.id
                        if(id){
                                Put(`/reminder/edit/${id}`,this.ruleForm).then(()=>{
                                this.$notify({
                                    title: '操作成功',
                                    type: 'success'
                                });
                                this.close();
                                this.$emit("reload")
                            })
                        } else {
                            post("/reminder/create",this.ruleForm).then(()=>{
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