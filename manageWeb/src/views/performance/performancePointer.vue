<template>
    <div>
        <el-card>
            <el-table :data="pointerData" :key="tableKey" border style="width: 100%">
                <el-table-column prop="name" label="考核项">
                </el-table-column>
                <el-table-column prop="indicator" label="考核指标">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.indicator" @change="changePointer(scope.row, scope.$index)">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="completion_value" label="实际完成值">
                </el-table-column>
                <el-table-column prop="schedule" label="完成情况">
                </el-table-column>
                <el-table-column prop="ratio" label="各项占比(%)">
                    <!-- 当部门是客户部和项目部的时候需要手动填占比 -->
                </el-table-column>
                <el-table-column prop="coefficient" label="系数">
                </el-table-column>
                <el-table-column prop="remarks" label="备注">
                    <template slot-scope="scope">
                        <el-input type="textarea" v-model="scope.row.remarks"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-card>
            <el-descriptions title="统计结果" direction="vertical" :column="5" border>
                <el-descriptions-item label="各项系数合计">{{ ratioTotal }}</el-descriptions-item>
                <el-descriptions-item label="总加分"></el-descriptions-item>
                <el-descriptions-item label="总减分"></el-descriptions-item>
                <el-descriptions-item label="考核得分">{{ score }}</el-descriptions-item>
                <el-descriptions-item label="考核结果">{{ result }}</el-descriptions-item>
            </el-descriptions>
        </el-card>
    </div>
</template>
<script>
import {performanceValue} from '@/utils/performanceValue'
export default {
    name: 'performancePointer',
    props: ['pointerData', 'projectData'],
    data() {
        return {
            tableKey: '',
        }
    },
    methods: {
        //考核指标修改
        changePointer(row, index) {
            //如果指标修改不为空或0，则计算
            if (Number(row.indicator)) {
                this.completion(row.name, index)
            } else {
                row.coefficient = '',
                row.schedule = ''
            }
        },
        //计算实际完成值，name：需要传考核项的name，index：在pointerData中第几项
        completion(name, index) {
            const item = this.pointerData[index];
            item.completion_value = performanceValue(name,this.projectData);
            //完成情况  item.schedule
            item.schedule = (item.completion_value / item.indicator).toFixed(4)
            //计算系数   item.coefficient
            item.coefficient = ((item.schedule * parseFloat(item.ratio)) / 100).toFixed(2)
            this.tableKey += 1
        },     
    },
    computed: {
        ratioTotal() {
            //系数合计 ratioTotal
            let sum = 0;
            for (let i = 0; i < this.pointerData.length; i++) {
                if (this.pointerData[i].indicator) {
                    sum += Number(this.pointerData[i].coefficient)
                }
            }
            return sum.toFixed(2) || ''
        },
        score() {
            //考核得分 score   两个0是总加分和总减分
            return Number(this.ratioTotal).toFixed(2) || ''
        },
        result() {
            //考核结果  result  <0.8:不称职		[0.8-0.99]:需改进	[1.00-1.19]:称职	[1.20-1.29]:良好	≥1.3:优秀
            const score = this.score
            const result = () => {
                if (score < 0.8) {
                    return ('不称职');
                } else if (score >= 0.8 && score <= 0.99) {
                    return ('需改进');
                } else if (score >= 1.0 && score <= 1.19) {
                    return ('称职');
                } else if (score >= 1.2 && score <= 1.29) {
                    return ('良好');
                } else if (score >= 1.3) {
                    return ('优秀');
                }
            }
            return score !== '' ? result() : ''
        },
    },
}
</script>