<template>
    <div>
        <Bread-Crumb />
        <el-select v-model="year" placeholder="请选择" @change="optionClick(year)" >
            <el-option v-for="item in options" :key="item.key" :label="item" :value="item">
            </el-option>
        </el-select>
        <el-table :data="tableData" style="width: 100%" border height="800" :empty-text="'添加'" @header-click="handleHeaderClick" @cell-click="handleCellClick">
            <el-table-column prop="date" label="公司" >
            </el-table-column>
            <el-table-column prop="name" label="部门" >
            </el-table-column>
            <el-table-column prop="address" label="组别">
            </el-table-column>
            <el-table-column prop="date" label="姓名" >
            </el-table-column>
            <el-table-column prop="first_result" label="第一季度" >
            </el-table-column>
            <el-table-column prop="second_result" label="第二季度">
            </el-table-column>
            <el-table-column prop="third_result" label="第三季度" >
            </el-table-column>
            <el-table-column prop="fourth_result" label="第四季度">
            </el-table-column>
            <el-table-column prop="average_score" label="年平均数">
            </el-table-column>
            <el-table-column prop="assessment_result" label="年考核结果">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import BreadCrumb from "@/components/BreadCrumb"
import { get} from "@/utils/http"
export default {
    name: 'performanceList',
    components: { BreadCrumb },
    data() {
        return {
            options: [],
            year: '2023',
            tableData: [],
            allQuarter:[]
        }
    },
    mounted(){
        this.getList(this.year);
    },
    methods: {
        async getList(year) {
            const res = await get(`/performance-summary/${year}`)
            this.options = res.data[1];
            this.tableData = res.data[0];
            this.allQuarter = res.data[2];
        },
        optionClick(year){
            this.getList(year)
        },
        handleHeaderClick(column, event) {
            // 在这里处理表头点击事件
            console.log('表头点击事件', column, event);
            // 你可以根据column对象的属性来确定是哪个表头被点击了，然后编写相应的逻辑处理
        },
        async handleCellClick(row, column){
            console.log(row, column)
            //员工id
            const {employee_id} =row;
            //季度名称，季度属性，row[property]季度值
            const {label,property} = column;
            //选中的季度id
            const quarterId = this.allQuarter.find(obj => obj.quarter === label);
            //需要传row.employee_id,通过年份和quarter去数据库查询对应的季度id传过去
            if(row[property] == null){
                this.$router.push({ path: 'performanceList/performanceDetail', query: { employee_id, quarterId, label } })
            } else{
                this.$router.push({ path: 'performanceList/performanceDetail', query: { employee_id, quarterId, label } })
            }
        },
    }
}
</script>