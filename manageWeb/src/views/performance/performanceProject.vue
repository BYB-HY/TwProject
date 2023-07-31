<template>
    <div>
        <el-table :data="projectData" :key="tableKey" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="项目类型">
                            <span>{{ props.row.type }}</span>
                        </el-form-item>
                        <el-form-item label="完成月份">
                            <span>{{ props.row.completion_month }}</span>
                        </el-form-item>
                        <el-form-item label="项目名称">
                            <span>{{ props.row.project_name }}</span>
                        </el-form-item>
                        <el-form-item label="立项编号">
                            <span>{{ props.row.project_number }}</span>
                        </el-form-item>
                        <el-form-item label="担当角色">
                            <span>{{ props.row.role }}</span>
                        </el-form-item>
                        <el-form-item label="类型">
                            <span>{{ props.row.project_type }}</span>
                        </el-form-item>
                        <el-form-item label="项目金额">
                            <span>{{ props.row.project_amount }}</span>
                        </el-form-item>
                        <el-form-item label="外包金额">
                            <span>{{ props.row.outsourcing_amount }}</span>
                        </el-form-item>
                        <template v-if="false">
                            <el-form-item label="投标阶段 40%">
                                <el-form-item label="占比">
                                    <span>{{ props.row.floating_ratio }}</span>
                                </el-form-item>
                                <el-form-item label="额度">
                                    <span>{{ props.row.floating_ratio }}</span>
                                </el-form-item>
                            </el-form-item>
                            <el-form-item label="执行创意阶段 40%">
                                <el-form-item label="占比">
                                    <span>{{ props.row.floating_ratio }}</span>
                                </el-form-item>
                                <el-form-item label="额度">
                                    <span>{{ props.row.floating_ratio }}</span>
                                </el-form-item>
                            </el-form-item>
                            <el-form-item label="执行阶段 20%">
                                <el-form-item label="占比">
                                    <span>{{ props.row.floating_ratio }}</span>
                                </el-form-item>
                                <el-form-item label="额度">
                                    <span>{{ props.row.floating_ratio }}</span>
                                </el-form-item>
                            </el-form-item>
                            <el-form-item label="补充占比">
                                <el-form-item label="投标阶段">
                                    <span>{{ props.row.floating_ratio }}</span>
                                </el-form-item>
                                <el-form-item label="执行创意阶段">
                                    <span>{{ props.row.floating_ratio }}</span>
                                </el-form-item>
                                <el-form-item label="执行阶段">
                                    <span>{{ props.row.floating_ratio }}</span>
                                </el-form-item>
                            </el-form-item>
                            <el-form-item label="中标/执行数">

                            </el-form-item>
                        </template>
                        <template v-if="false">
                            <el-form-item label="投标 50%">
                                <el-form-item label="占比">
                                    <span>{{ props.row.floating_ratio }}</span>
                                </el-form-item>
                                <el-form-item label="额度">
                                    <span>{{ props.row.floating_ratio }}</span>
                                </el-form-item>
                            </el-form-item>
                            <el-form-item label="执行 50%">
                                <el-form-item label="占比">
                                    <span>{{ props.row.floating_ratio }}</span>
                                </el-form-item>
                                <el-form-item label="额度">
                                    <span>{{ props.row.floating_ratio }}</span>
                                </el-form-item>
                            </el-form-item>
                        </template>
                        <el-form-item label="浮动占比">
                            <span>{{ props.row.floating_ratio }}</span>
                        </el-form-item>
                        <el-form-item label="总完成金额">
                            <span>{{ props.row.total_completion_amount }}</span>
                        </el-form-item>
                        <el-form-item label="协助投标数量">
                            <span>{{ props.row.bid_assistance_quantity }}</span>
                        </el-form-item>
                        <el-form-item label="利润率">
                            <span>{{ props.row.profit_margin }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ props.row.remarks }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="项目类型" prop="type">
            </el-table-column>
            <el-table-column label="项目名称" prop="project_name">
            </el-table-column>
            <el-table-column label="总完成金额" prop="total_completion_amount">
            </el-table-column>
            <el-table-column label="利润率" prop="profit_margin">
            </el-table-column>
            <el-table-column label="协助投标数量" prop="bid_assistance_quantity">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="projectEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="projectDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'performanceProject',
    props:['projectData','tableKey'],
    deta() {
        return {
            
        }
    },
    methods: {
        //项目编辑按钮
        projectEdit(index, editData) {
            this.$emit('addShow',true)
            this.$emit('editProject',{ ...editData, index })
        },
        //删除项目
        projectDelete(index) {
            this.$emit('deleteProject',index)
        },
    }
}
</script>