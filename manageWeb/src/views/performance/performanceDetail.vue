<template>
    <div>
        <BreadCrumb />
        <el-card>

            <!-- 计算结果，上传表单，验证表单 -->
            <!-- 添加项目 -->
            <el-button type="primary" round @click="addShow(true)">添加项目</el-button>
            <el-dialog title="添加项目" :visible.sync="show">
                <AddProject @addShow="addShow" @changeProjectData="changeProjectData" :typeList="typeList"
                    :projectData="projectData" :tableKey="tableKey" ref="addProject" />
            </el-dialog>

            <!-- 项目 -->
            <PerformanceProject :projectData="projectData" :tableKey="tableKey" @addShow="addShow"
                @editProject="editProject" @deleteProject="deleteProject" />

            <!-- 考核指标 -->
            <PerformancePointer ref="pointer" :pointerData="pointerData" :projectData="projectData" />

            <!-- 上传 -->
            <el-button type="primary">获得结果<i class="el-icon-cpu el-icon--right"></i></el-button>
            <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-card>
    </div>
</template>
<script>
import BreadCrumb from "@/components/BreadCrumb.vue"
import PerformanceProject from "./performanceProject.vue"
import AddProject from "./addProject.vue"
import PerformancePointer from "./performancePointer.vue"

export default {
    name: 'performanceDetail',
    components: { BreadCrumb, PerformanceProject, AddProject, PerformancePointer },
    data() {
        return {
            typeList: '',
            show: false,
            projectData: [],
            pointerData: [],
            tableKey: '',
        }
    },
    mounted() {
        this.projectType()
    },
    methods: {
        //项目类型选项和考核指标，传入部门和职位对应的id,后面用数据库存起来当默认值
        projectType(id) {
            const options = []
            let pointerData = []
            const pointerData_default = { indicator: '', completion_value: '', schedule: '', coefficient: '', remarks: '' }
            const pointerData_list = {
                // id1:{
                //     ratioName: { value: '完成项目金额', label: '完成项目金额' },{ value: '协助项目', label: '协助项目' },
                //     ratio: [{name:'完成项目金额', ratio:40},{name:'季度利润率', ratio:45},{name:'协助投标数量',ratio:15}]
                // },
                id1: [{ name: '完成项目金额', ratio: 40, }, { name: '季度利润率', ratio: 45 }, { name: '协助投标数量', ratio: 15 }],
                id2: [{ name: '团队营业额', ratio: 40 }, { name: '广丰利润率', ratio: 22.5 }, { name: '整组季度利润率', ratio: 22.5 }, { name: '投标项目数量', ratio: 15 }],
                id3: [{ name: '投标数量', ratio: 25 }, { name: '团队利润率', ratio: 20 }, { name: '中标数量', ratio: 25 }, { name: '中标金额', ratio: 15 }, { name: '团队中标金额', ratio: 15 }],
                id4: [{ name: '投标数量', ratio: 25 }, { name: '主笔利润率', ratio: 20 }, { name: '中标数量', ratio: 25 }, { name: '中标金额', ratio: 30 }],
                id5: [{ name: '完成项目金额', ratio: 25 }, { name: '版块担当数量', ratio: 20 }, { name: '季度利润率', ratio: 45 }, { name: '投标项目数量', ratio: 10 }],
                id6: [{ name: '完成项目金额', ratio: 12.5 }, { name: '团队完成金额', ratio: 12.5 }, { name: '团队版块担当数量', ratio: 20 }, { name: '团队利润率', ratio: 45 }, { name: '投标项目数量', ratio: 10 }],
                id7: [{ name: '投标数量', ratio: 15 }, { name: '执行项目数量', ratio: 20 }, { name: '季度利润率', ratio: 45 }, { name: '团队完成额', ratio: 20 }],
                id8: [{ name: '投标数量', ratio: 15 }, { name: '执行数量', ratio: 20 }, { name: '季度利润率', ratio: 45 }, { name: '完成额度', ratio: 20 }],
                id9: [{ name: '执行项目数量', ratio: 30 }, { name: '季度利润率', ratio: 20 }, { name: '项目完成金额', ratio: 50 }],
                id10: [{ name: '投标数量', ratio: 25 }, { name: '季度利润率', ratio: 20 }, { name: '中标数量', ratio: 25 }, { name: '中标金额', ratio: 30 }],
                id11: [{ name: '投标数量', ratio: 25 }, { name: '季度利润率', ratio: 20 }, { name: '中标数量', ratio: 20 }, { name: '中标数量', ratio: 15 }, { name: '团队中标金额', ratio: 15 }],
            }
            id = '客户部主任'
            switch (id) {
                //客户部主任
                case '客户部主任':
                    options.push({ value: '完成项目金额', label: '完成项目金额' }, { value: '协助项目', label: '协助项目' });
                    pointerData = pointerData_list.id1;
                    break;
                //客户部副总监
                case '客户部副总监':
                    options.push({ value: '团队营业额', label: '团队营业额' });
                    pointerData = pointerData_list.id2;
                    break;
                //策划部副总监
                case '策划部副总监':
                    options.push({ value: '中标项目', label: '中标项目' }, { value: '团队中标项目', label: '团队中标项目' });
                    pointerData = pointerData_list.id3;
                    break;
                //策划部主任
                case '策划部主任':
                    options.push({ value: '中标项目', label: '中标项目' }, { value: '备注（附加）', label: '备注（附加）' });
                    pointerData = pointerData_list.id4;
                    break;
                //项目部经理
                case '项目部经理':
                    options.push({ value: '完成项目金额', label: '完成项目金额' }, { value: '版块担当数量', label: '版块担当数量' });
                    pointerData = pointerData_list.id5
                    break;
                //项目部总监
                case '项目部总监':
                    options.push({ value: '完成项目金额', label: '完成项目金额' }, { value: '团队完成项目', label: '团队完成项目' });
                    pointerData = pointerData_list.id6
                    break;
                //演出总监
                case '演出总监':
                    options.push({ value: '完成额度', label: '完成额度' }, { value: '团队投标项目', label: '团队投标项目' },{ value: '团队完成额', label: '团队完成额' });
                    pointerData = pointerData_list.id7
                    break;
                //演出副总监
                case '演出副总监':
                    options.push({ value: '中标项目', label: '中标项目' });
                    pointerData = pointerData_list.id8;
                    break;
                //设计部平面
                case '设计部平面':
                    options.push({ value: '执行项目数量', label: '执行项目数量' }, { value: '协助投标', label: '协助投标' });
                    pointerData = pointerData_list.id9
                    break;
                //设计部3d
                case '设计部3d':
                    options.push({ value: '中标项目', label: '中标项目' }, { value: '中标金额', label: '中标金额' });
                    pointerData = pointerData_list.id10;
                    break;
                //设计部总监
                case '设计部总监':
                    options.push({ value: '中标项目', label: '中标项目' }, { value: '个人完成项目', label: '个人完成项目' });
                    pointerData = pointerData_list.id11;
                    break;
            }
            options.push({ value: '未中标项目', label: '未中标项目' });
            this.typeList = options;
            for (let i = 0; i < pointerData.length; i++) {
                pointerData[i] = { ...pointerData[i], ...pointerData_default }
            }
            this.pointerData = pointerData
        },
        addShow(show) {
            this.show = show
        },
        changeProjectData(projectData) {
            this.projectData = projectData,
                this.tableKey += 1
            //指标中的考核指标有值就运算
            for (let i = 0; i < this.pointerData.length; i++) {
                if (this.pointerData[i].indicator) {
                    this.$refs.pointer.completion(this.pointerData[i].name, i)
                }
            }
        },
        editProject(editData) {
            this.$refs.addProject.fillData(editData)
        },
        deleteProject(index) {
            //这里要判断这个项目有没有上传
            this.projectData.splice(index, 1);
            for (let i = 0; i < this.pointerData.length; i++) {
                if (this.pointerData[i].indicator) { this.$refs.pointer.completion(this.pointerData[i].name, i) }
            }
        }
    },
}
</script>

<style lang="less" scoped >
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>