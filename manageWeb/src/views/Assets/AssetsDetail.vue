<template>
    <div>
        <Bread-Crumb />
        <el-card>
            <el-row type="">
                <el-button type="primary" @click="back">返回</el-button>
                <el-button size="mini" type="danger">出入库</el-button>
            </el-row>
        </el-card>
        <el-card class="mt_10">
            <el-descriptions class="margin-top" title="基本信息" :column="3" :size="size" border>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        资产编号
                    </template>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        资产类型
                    </template>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        使用人
                    </template>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        入库时间
                    </template>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        出库时间
                    </template>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        备注
                    </template>
                </el-descriptions-item>
            </el-descriptions>
            <el-descriptions class="margin-top" title="设备配置" :column="3" :size="size" border>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        资产品牌
                    </template>
                    <el-tag size="small">品牌</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        资产型号
                    </template>

                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        CPU
                    </template>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        内存
                    </template>
                    <el-input></el-input>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        显卡
                    </template>
                    <el-input></el-input>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        硬盘
                    </template>
                    <el-tag size="small"></el-tag>
                </el-descriptions-item>
            </el-descriptions>
            <el-button type="primary">保存</el-button>
        </el-card>
    </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb"
import { mapMutations, } from 'vuex';
export default {
    data() {
        return {
            value1: '',
            value2: '',
        }
    },
    components: { BreadCrumb },
    //组件路由离开守卫
    beforeRouteLeave(to, from, next) {
        if (to.path != "/Assets/list") {
            //不是去列表页，把store的标记改为true
            this.changeIsFromDetail(true)
        }
        next()
    },
    methods: {
        ...mapMutations(["changeIsFromDetail"]),
        back() {
            this.$router.push("/Assets/list");
        }
    },
}
</script>

<style lang="less" scoped>
.a {
    border-bottom: 2px solid #f3f3f3
}
</style>