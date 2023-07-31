<template>
    <div>
      <Bread-Crumb />
      <el-card >
        <el-row :gutter="16">
          <el-col :span="4">
            <el-input placeholder="请输入资产编号" v-model="params.waybillNo"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input placeholder="请输入使用人名称" v-model="params.name"></el-input>
          </el-col>
          <el-col :span="4">
            <el-date-picker v-model="value1" type="date" placeholder="选择入库时间日期"></el-date-picker>
          </el-col>
          <el-col :span="6">
            <el-date-picker v-model="value1" type="date" placeholder="选择出库时间日期"></el-date-picker>
          </el-col>
          <el-col :span="6" style="text-align: right">
            <el-button type="primary" @click="loadData">查询</el-button>
            <el-button type="primary">重置</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-card  class="mt_10 mb_10">
        <el-radio-group v-model="params.status" @change="loadData">
          <el-radio-button label="1">全部资产(300)</el-radio-button>
          <el-radio-button label="2">在仓库(120)</el-radio-button>
          <el-radio-button label="3">笔记本电脑(70)</el-radio-button>
          <el-radio-button label="4">打印机(100)</el-radio-button>
          <el-radio-button label="5">台式(10)</el-radio-button>
        </el-radio-group>
      </el-card>
      <el-card>
        <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
          <!-- <el-table-column type="index" width="50" label="序号" fixed="left"></el-table-column> -->
          <el-table-column prop="asset_number" label="资产编号" width="180" fixed="left"></el-table-column>
          <el-table-column prop="asset_type" label="资产类型" width="180"></el-table-column>
          <el-table-column prop="employee_id" label="使用人" width="180"></el-table-column>
          <el-table-column prop="entry_time" label="出/入库时间" width="180"></el-table-column>
          <!-- <el-table-column prop="exit_time" label="出库时间" width="180"></el-table-column> -->
          <el-table-column prop="exit_record" label="备注" width="180"></el-table-column>
          <el-table-column prop="brand" label="资产品牌"  width="180"></el-table-column>
          <el-table-column prop="model" label="资产型号" width="180"></el-table-column>
          <el-table-column prop="cpu" label="CPU" width="180"></el-table-column>
          <el-table-column prop="memory" label="内存" width="180"></el-table-column>
          <el-table-column prop="" label="显卡" width="180"></el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="danger">出入库</el-button>
              <el-button size="mini" @click="detail(scope.row.no)" >详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="fr mt mb" @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="pageData.page" :page-sizes="[10, 20, 30, 40]" :page-size="pageData.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-card>
    </div>
  </template>
  
  <script>
  import BreadCrumb from "@/components/BreadCrumb";
  // import moment from "moment"
  import { get } from "@/utils/http";
  import { mapMutations, mapState } from "vuex";
  export default {
    components: { BreadCrumb },
    data() {
      return {
        tableData: [],
        params: {
          waybillNo: "",
          name: "",
          status: 1,
        },
        date: [],
        pageData: {
          page: 1,
          pageSize: 10,
        },
        loading: false,
        total: 0,
      };
    },
    created() {
      this.loadData();
    },
    methods: {
      async loadData() {
        this.loading = true;
        // let startDate = this.date? moment(this.date[0]).format("YYYY-MM-DD") : ""
        // let endDate = this.date? moment(this.date[1]).format("YYYY-MM-DD") : ""
        // const res= await post('/assets',{...this.pageData,...this.params,startDate,endDate});
        const res = await get("/assets", this.pageData);
        this.tableData = res.data;
        this.total = res.total;
        this.loading = false;
      },
      handleSizeChange(pageSize) {
        this.pageData.pageSize = pageSize;
        this.loadData();
      },
      handleCurrentChange(page) {
        this.pageData.page = page;
        this.loadData();
      },
      detail(no) {
        this.$router.push("list/detail?no=" + no + "&this=" + this);
      },
      crearCache() {
        //在当前页面跳转到其他页面时，清除缓存方式
        let vnode = this.$vnode;
        let parentVnode = vnode && vnode.parent;
        if (
          parentVnode &&
          parentVnode.componentInstance &&
          parentVnode.componentInstance.cache
        ) {
          var key =
            vnode.key == null
              ? vnode.componentOptions.Ctor.cid +
              (vnode.componentOptions.tag
                ? `::${vnode.componentOptions.tag}`
                : "")
              : vnode.key;
          var cache = parentVnode.componentInstance.cache;
          var keys = parentVnode.componentInstance.keys;
          if (cache[key]) {
            this.$destroy();
            // remove key
            if (keys.length) {
              var index = keys.indexOf(key);
              if (index > -1) {
                keys.splice(index, 1);
              }
            }
            cache[key] = null;
          }
        }
      },
      ...mapMutations(["changeIsFromDetail"]),
    },
    //组件离开守卫
    beforeRouteLeave(to, from, next) {
      //去详情的时候，把路由配置项中的keepAlive改为true（默认也是true）
      if (to.path == "/waybill/list/detail") {
        from.meta.keepAlive = true;
      } else {
        // 去其他页面的，调用清除缓存方法
        this.crearCache();
      }
      next();
    },
    //当前组件重新激活时执行
    activated() {
      //如果store中的isFromDetail是true就执行
      if (this.isFromDetail) {
        //重新请求数据
        this.loadData();
        //调用store的方法把标记改为false
        this.changeIsFromDetail(false);
      }
    },
    computed: mapState(["isFromDetail"]),
  };
  </script>
  
  <style lang="less" scoped>
  
  </style>