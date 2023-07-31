<template>
    <div>
      <Bread-Crumb />
      <el-card class="mt">
        <el-row>
          <el-col :span="6">
            <el-input placeholder="请输入标题" v-model="params.searchValue" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="18" class="operate">
            <el-button type="primary" @click="visible = true">添加提醒</el-button>
            <!-- <el-button :disabled="!select.length" @click="operate(1)">审核</el-button>
                    <el-button :disabled="!select.length" @click="operate(2)">修改</el-button>
                    <el-button :disabled="!select.length" @click="operate(3)">作废</el-button> -->
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="title" label="标题" width="180" fixed="left"></el-table-column>
          <el-table-column prop="expiry_date" label="到期时间" width="180" fixed="left"></el-table-column>
          <el-table-column prop="descr" label="备注" width="180"></el-table-column>
          <!-- 下面的判断及计算后端处理完返回到期时间，这里这是填值 -->
          <!-- 这里是判断是否循环两个值true或false，循环开关 -->
          <el-table-column prop="recurring" label="循环" width="180"></el-table-column>
          <!-- 这里是判断按日还是按每个月几号（这里还要选几个月提醒一次），还是按年的几月几号（几年提醒一次），还是按星期几（一个星期七天，几个星期乘几）暂定4个值，每天提醒自己手机提醒功能好点 -->
          <el-table-column prop="recurring_type" label="循环类型" width="180"></el-table-column>
          <!-- 填数字，先判断上面的循环类型，按日无限制，按月限制31（如果没有31则最后一天），按年限制12， 按星期几限制7-->
          <el-table-column prop="recurring_value" label="循环值" width="180"></el-table-column>
          <el-table-column prop="created_at" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="updated_at" label="更新时间" width="180"></el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
              <!-- <el-button size="mini" @click="edit(employee_id)">编辑</el-button> -->
              <el-button type="danger" size="mini" @click="deletes(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
          <!-- 1为开启，0为关闭 -->
          <el-table-column label="开启" width="80" fixed="right">
            <template slot-scope="scoped">
              <el-tooltip :content="'Switch value: ' + scoped.row.enabled" placement="top">
                <!-- :active-value="1" :inactive-value="0"注意要绑定 -->
              <el-switch v-model="scoped.row.enabled "  :active-value="1" :inactive-value="0" @change="scoped.row.enabled=0"></el-switch>
            </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="fr mt mb" @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="params.page" :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-card>
      <Reminder-modal :visible="visible" @hide="visible = false" @reload="loadData()" />
    </div>
  </template>
  
  <script>
  // import breadCrumb from "@/mixins/breadCrumb"
  import BreadCrumb from "@/components/BreadCrumb"
  import ReminderModal from "./ReminderModal.vue"
  import { get, Delete } from "@/utils/http"
  import { mapMutations } from "vuex"
  export default {
    //    mixins:[breadCrumb],
    components: { BreadCrumb, ReminderModal },
    data() {
      return {
        tableData: [],
        loading: false,
        total: 0,
        select: "",
        params: {
          searchValue: "",
          page: 1,
          pageSize: 10
        },
        visible: false,
        value:"",
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      async loadData() {
        this.loading = true
        const res = await get('/reminder/list', this.params)
        this.tableData = res.data
        this.total = res.total
        this.loading = false
      },
      handleSizeChange(pageSize) {
        this.params.pageSize = pageSize;
        this.loadData()
      },
      handleCurrentChange(page) {
        this.params.page = page;
        this.loadData()
      },
      handleSelectionChange(selection) {
        this.select = selection
      },
      operate(type) {
        let nos = this.select.map(item => item.id);
        this.$notify({
          title: '操作成功',
          message: [nos, type],
          type: 'success'
        });
      },
      deletes(id) {
        Delete(`/reminders/delete/${id}`).then(() => {
          this.$message({
            message: '操作成功',
            type: 'success'
          }).then(() => {
            this.loadData()
          })
        })
      },
      ...mapMutations(["setRow"]),
      edit(row) { 
        this.setRow(row);
        this.visible = true;
      },
    }
  }
  </script>
  
  <style lang="less" scoped>
  .operate {
    text-align: right;
  }
  </style>