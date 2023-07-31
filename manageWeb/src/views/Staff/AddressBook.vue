<template>
    <div>
        <Bread-Crumb  />
        <el-card class="mt">
            <el-row>
                <el-col :span="6">
                    <el-input placeholder="请输入员工号或姓名" v-model="params.searchValue" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
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
            >
                <el-table-column prop="department_id" label="部门" width="100" fixed="left"></el-table-column>
                <el-table-column prop="employee_id" label="员工号" width="100" fixed="left"></el-table-column>
                <el-table-column prop="name" label="姓名" width="120" fixed="left"></el-table-column>
                <el-table-column prop="mobile_phone" label="手机" width="250"></el-table-column>
                <el-table-column prop="QQ" label="QQ" width="250"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="250"></el-table-column>
                <el-table-column prop="landline_phone" label="座机电话" width="200"></el-table-column>
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
    </div>
</template>

<script>
import {post} from "@/utils/http"
import BreadCrumb from "@/components/BreadCrumb"
    export default {
        name:"AddressBook",
       components:{BreadCrumb},
       data(){
        return{
            tableData:[],
            loading:false,
            total:0,
            params:{
                searchValue:"",
                page:1,
                per_page:10
            },
        }
       },
       created(){
        this.loadData()
       },
       methods:{
        async loadData(){
            this.loading=true
            const res = await post('/address_book',this.params)
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
        }
       }
    }
</script>

<style lang="less" scoped>
.operate{
    text-align: right;
}
</style>