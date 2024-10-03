<template>
  <div class="app-container">
    <!-- <el-segmented v-if="listType == 'build'" v-model="initvalue" :options="cjZt" @change="changeValue"> </el-segmented> -->
    <!-- <filterView
      :filterss="dynamicFilters"
      :filters="filters"
      :allSelect="false"
      :listtype="listType"
      :parent-type-method="filterMethod"
    ></filterView> -->
    <div style="color: #1890ff; margin-top: 2px; line-height: 22px; align-self: center">{{ xiaoQumsg }}</div>
    <div class="mui-content-padded">
      <!-- 信息列表组件 seniorList:高管数组信息 -->
      <spListView :bz-list="dataList" :listtype="listType" :parent-type-method="filterMethod"></spListView>
    </div>
    <!--分页列表-->
    <div class="pagination">
      <el-pagination
        v-model:currentPage="pagination.currentPage"
        :page-size="10"
        background
        layout="total"
        :total="dataList.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import filterView from '@/components/Table/ListTable/FilterView.vue'
  import spListView from '@/components/Table/ListTable/ListView.vue'
  import { buildListinfo } from '@/api/user'
  import { onMounted, reactive, computed, ref, onBeforeMount } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  //
  import { useSettingStore } from '@/store/modules/setting'
  import { useUserStore } from '@/store/modules/user'
  import { da } from 'element-plus/es/locale'
  import { storeToRefs } from 'pinia'
  import { buildOperation, buildListinfo1 } from '@/api/user'
  import { getYouliList, youliCJXQGet } from '@/api/user'
  import { ElMessage, ElMessageBox, ElNotification, imageEmits } from 'element-plus'
  import { MoreFilled } from '@element-plus/icons-vue'

  //import { useTagsViewStore } from '@/store/modules/tagsView'

  //const TagsViewStore = useTagsViewStore()
  // const visitedViews = computed(() => TagsViewStore.visitedViews)

  const router = useRouter()
  // const route = useRoute()
  // const xcId = route.query.xcId as string
  const SettingStore = useSettingStore()

  const UserStore = useUserStore()

  // 获取数据
  const { XiaoQuList, xiaoQumsg } = storeToRefs(SettingStore)
  // 配置全局组件大小
  const size = computed((): string => SettingStore.themeConfig.globalComSize)

  const loading = ref(true)

  const listType = 'xiaoqu'

  const xcId = computed(() => {
    return SettingStore.xcrwId
  })

  const dataList = SettingStore.XiaoQuList

  const pagination = computed(() => {
    return SettingStore.pagination
  })

  onMounted(() => {})

  const handleSizeChange = (val: number) => {
    pagination.value.pageSize = val
  }
  const handleCurrentChange = (val: number) => {
    pagination.value.currentPage = val
  }

  //子组件方法 根据条件触发事件
  const filterMethod = (e1, e2) => {
    console.log('操作方法', e1, e2)

    if (e2 == '详情') {
      SettingStore.setXcrwXQId(e1.XQID)
      buildListinfo1(e1.XQID, '待检查', '').then((res) => {
        if (res.data.result === 1) {
          let jzList = []
          res.data.MPZInfo.data.forEach((item) => {
            jzList.push(item)
          })
          SettingStore.setJzList(jzList)
          SettingStore.setXcrwId(0)
          //router.push({ path: '/xc/xcInfo', query: { xcId: e1.id } })
          //延迟跳转
          setTimeout(async () => {
            router.push('/form/task')
          }, 200)
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .app-container {
    height: 100%;
  }

  .pagination {
    background-color: aliceblue;
    height: 30px;
    //opacity: 1	;
    left: 0;
    /* 左对齐 */
    right: 0;
    /* 右对齐，保证水平居中 */
    width: 100%;
    position: fixed;
    bottom: 0px;
    /* 固定在底部 */
    display: flex;
    justify-content: center;
    padding-top: 0px;
    box-sizing: border-box;
  }
</style>
