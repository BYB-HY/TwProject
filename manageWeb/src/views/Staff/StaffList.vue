<template>
    <div>
        <BreadCrumb  />
        <el-card class="mt">
            <el-row>
                <el-col :span="6">
                    <el-input placeholder="请输入员工号或姓名" v-model="params.searchValue" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="18"  class="operate">
                    <el-button type="primary" @click="visible=true">员工入职</el-button>
                    <!-- <el-button :disabled="!select.length" @click="operate(1)">审核</el-button>
                    <el-button :disabled="!select.length" @click="operate(2)">修改</el-button>
                    <el-button :disabled="!select.length" @click="operate(3)">作废</el-button> -->
                </el-col>
            </el-row>
        </el-card>
        <el-card>
            <el-table 
                :data="tableData" 
                style="width: 100%" 
                v-loading="loading"  
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="employee_id" label="员工号" width="100" fixed="left"></el-table-column>
                <el-table-column prop="name" label="姓名" width="120" fixed="left"></el-table-column>
                <el-table-column prop="mobile_phone" label="手机" width="250"></el-table-column>
                <el-table-column prop="QQ" label="QQ" width="250"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="250"></el-table-column>
                <el-table-column prop="landline_phone" label="座机电话" width="200"></el-table-column>
                <!-- <el-table-column prop="start" label="名下资产" width="250"></el-table-column> -->
                <el-table-column prop="begin_date" label="入职时间" width="250"></el-table-column>
                <el-table-column label="操作" width="180" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                        <!-- <el-button size="mini" @click="edit(employee_id)">编辑</el-button> -->
                        <el-button type="danger" size="mini" @click="deletes(scope.row.employee_id)">离职</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="fr mt mb"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="params.per_page"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </el-card>
        <StaffModal :visible="visible" @hide="visible=false" @reload="loadData()"/>
    </div>
</template>

<script>
// import breadCrumb from "@/mixins/breadCrumb"
import BreadCrumb from "@/components/BreadCrumb"
import StaffModal from "./StaffModal.vue"
import {post,Put} from "@/utils/http"
import {mapMutations} from "vuex"
    export default {
    //    mixins:[breadCrumb],
       components:{BreadCrumb, StaffModal},
       data(){
        return{
            tableData:[],
            loading:false,
            total:0,
            select:"",
            params:{
                searchValue:"",
                page:1,
                per_page:10
            },
            visible:false,
        }
       },
       created(){
        this.loadData()
       },
       methods:{
        async loadData(){
            this.loading=true
            const res = await post('/employees_list',this.params)
            this.tableData = res.data
            this.total=res.total
            this.loading=false
        },
        handleSizeChange(per_page){
            this.params.per_page=per_page;
            this.loadData()
        },
        handleCurrentChange(page){
            this.params.page=page;
            this.loadData()
        },
        handleSelectionChange(selection){
            this.select=selection
        },
        operate(type){
            let nos=this.select.map(item=>item.id);
            this.$notify({
                title: '操作成功',
                message: [nos,type],
                type: 'success'
            });
        },
        deletes(id){
            Put(`/employees/${id}/dimission`).then(()=>{
                this.$message({
                    message:'操作成功',
                    type:'success'
                }).then(()=>{
                    this.loadData
                })
            })
        },
        ...mapMutations(["setRow"]),
        edit(row){
            this.setRow(row);
            this.visible=true;
        },
       }
    }
</script>

<style lang="less" scoped>
.operate{
    text-align: right;
}
</style>