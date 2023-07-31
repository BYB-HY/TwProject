<template>
    <div>
        <el-form :model="ruleProject" ref="ruleProject" label-width="100px" class="demo-ruleForm">
            <el-form-item label="项目类型" prop="type">
                <el-select v-model="ruleProject.type">
                    <el-option v-for="item in typeList" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="完成月份" prop="completion_month">
                <el-input v-model="ruleProject.completion_month"></el-input>
            </el-form-item>
            <el-form-item label="项目名称" prop="project_name">
                <el-input v-model="ruleProject.project_name"></el-input>
            </el-form-item>
            <el-form-item label="立项编号" prop="project_number">
                <el-input v-model="ruleProject.project_number"></el-input>
            </el-form-item>
            <el-form-item label="担当角色" prop="role">
                <el-input v-model="ruleProject.role"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="project_type">
                <el-input v-model="ruleProject.project_type"></el-input>
            </el-form-item>
            <el-form-item label="项目金额" prop="project_amount">
                <el-input v-model="ruleProject.project_amount"></el-input>
            </el-form-item>
            <el-form-item label="外包金额" prop="outsourcing_amount">
                <el-input v-model="ruleProject.outsourcing_amount"></el-input>
            </el-form-item>
            <template v-if="false">
                <el-form-item label="投标阶段 40%" prop="floating_ratio">
                    <el-form-item label="占比" prop="floating_ratio">
                        <el-input v-model="ruleProject.floating_ratio"></el-input>
                    </el-form-item>
                    <el-form-item label="额度" prop="floating_ratio">
                        <el-input v-model="ruleProject.floating_ratio"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="执行创意阶段 40%" prop="floating_ratio">
                    <el-form-item label="占比" prop="floating_ratio">
                        <el-input v-model="ruleProject.floating_ratio"></el-input>
                    </el-form-item>
                    <el-form-item label="额度" prop="floating_ratio">
                        <el-input v-model="ruleProject.floating_ratio"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="执行阶段 20%" prop="floating_ratio">
                    <el-form-item label="占比" prop="floating_ratio">
                        <el-input v-model="ruleProject.floating_ratio"></el-input>
                    </el-form-item>
                    <el-form-item label="额度" prop="floating_ratio">
                        <el-input v-model="ruleProject.floating_ratio"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="补充占比" prop="floating_ratio">
                    <el-form-item label="投标阶段" prop="floating_ratio">
                        <el-input v-model="ruleProject.floating_ratio"></el-input>
                    </el-form-item>
                    <el-form-item label="执行创意阶段" prop="floating_ratio">
                        <el-input v-model="ruleProject.floating_ratio"></el-input>
                    </el-form-item>
                    <el-form-item label="执行阶段" prop="floating_ratio">
                        <el-input v-model="ruleProject.floating_ratio"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="中标/执行数" prop="floating_ratio">
                    <el-input v-model="ruleProject.floating_ratio"></el-input>
                </el-form-item>
            </template>
            <template v-if="false">
                <el-form-item label="投标 50%" prop="floating_ratio">
                    <el-form-item label="占比" prop="floating_ratio">
                        <el-input v-model="ruleProject.floating_ratio"></el-input>
                    </el-form-item>
                    <el-form-item label="额度" prop="floating_ratio">
                        <el-input v-model="ruleProject.floating_ratio"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="执行 50%" prop="floating_ratio">
                    <el-form-item label="占比" prop="floating_ratio">
                        <el-input v-model="ruleProject.floating_ratio"></el-input>
                    </el-form-item>
                    <el-form-item label="额度" prop="floating_ratio">
                        <el-input v-model="ruleProject.floating_ratio"></el-input>
                    </el-form-item>
                </el-form-item>
            </template>
            <el-form-item label="浮动占比" prop="floating_ratio">
                <el-input v-model="ruleProject.floating_ratio"></el-input>
            </el-form-item>
            <el-form-item label="协助投标数量" prop="bid_assistance_quantity">
                <el-input v-model="ruleProject.bid_assistance_quantity"></el-input>
            </el-form-item>
            <el-form-item label="利润率" prop="profit_margin">
                <el-input v-model="ruleProject.profit_margin"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
                <el-input v-model="ruleProject.remarks"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="changeProject(false, 'submit', ruleProject)">确定</el-button>
                <el-button @click="changeProject(true)">重置</el-button>
                <el-button @click="changeProject(false)">取 消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    neme: 'addProject',
    props: ['typeList', 'projectData', 'tableKey'],
    data() {
        return {
            ruleProject: {
                type: '',
                completion_month: '',
                project_name: '',
                project_number: '',
                role: '',
                project_type: '',
                project_amount: '',
                outsourcing_amount: '',
                floating_ratio: '',
                total_completion_amount: '',
                bid_assistance_quantity: '',
                profit_margin: '',
                remarks: ''
            },
        }
    },
    methods: {
        fillData(editData){
            this.ruleProject = editData
        },
        changeProject(show, handle, ruleProject) {
            if (handle == 'submit') {
                let projectData = this.projectData;
                let { project_amount, outsourcing_amount, floating_ratio } = ruleProject;
                //没输入外包金额默认为100%
                outsourcing_amount ||= 100;
                //没输入占比默认为100%
                floating_ratio ||= 100;
                //计算总金额
                ruleProject.total_completion_amount = project_amount * outsourcing_amount / 100 * floating_ratio / 100
                //第一次添加
                if (projectData.length === 0) {
                    projectData.push(ruleProject)
                } else {
                    //判断是添加还是编辑
                    const index = (ruleProject.index+1) ? ruleProject.index : (projectData.length)
                    projectData[index] = ruleProject
                }
                this.$emit('changeProjectData', projectData)
            }
            this.ruleProject = {
                type: '',
                completion_month: '',
                project_name: '',
                project_number: '',
                role: '',
                project_type: '',
                project_amount: '',
                outsourcing_amount: '',
                floating_ratio: '',
                total_completion_amount: '',
                bid_assistance_quantity: '',
                profit_margin: '',
                remarks: ''
            }
            this.$emit('addShow', show)
        },
    }
}
</script>

