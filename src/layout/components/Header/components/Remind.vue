<template>
  <div class="m-info">
    <el-popover width="200px" placement="bottom">
      <template #reference>
        <el-badge :value="3" class="item-info-pop">
          <el-icon class="bell header-icon" style="font-size: 20px"><Bell /></el-icon>
        </el-badge>
      </template>
      <div>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="通知" name="first">
            <div class="item-child" v-for="(item, index) in meggs">
              <el-button type="primary" link @click="toGitHub(item.pain, item.id)">{{ item.label }}</el-button>
              <el-divider style="margin-bottom: 15px" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { TabsPaneContext } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { buildListinfo, xcrwXQ } from '@/api/user'
  import { useSettingStore } from '@/store/modules/setting'
  const router = useRouter()
  const SettingStore = useSettingStore()
  const activeName = ref('first')
  const toGitHub = (link, id) => {
    if (link == '/system/task') {
      buildListinfo(id).then((res) => {
        console.log(res)
        if (res.data.result == -11) {
          //赋值五个列表的值
          let wcjJzList = []
          let cjzJzList = []
          let dshJzList = []
          let shbhJzList = []
          let shtgJzList = []
          SettingStore.jzList.forEach((item) => {
            if (item.cjZt == '未采集') {
              wcjJzList.push(item)
            } else if (item.cjZt == '采集中') {
              cjzJzList.push(item)
            } else if (item.cjZt == '待审核') {
              dshJzList.push(item)
            } else if (item.cjZt == '审核驳回') {
              shbhJzList.push(item)
            } else if (item.cjZt == '审核通过') {
              shtgJzList.push(item)
            }
          })
          SettingStore.setWcjJzList(wcjJzList)
          SettingStore.setCjzJzList(cjzJzList)
          SettingStore.setDshJzList(dshJzList)
          SettingStore.setShbhJzList(shbhJzList)
          SettingStore.setShtgJzList(shtgJzList)
        }
      })
    } else {
      //
    }
    setTimeout(async () => {
      router.push({
        path: link,
      })
    }, 500)
    //window.open(link)
  }

  const meggs = ref([
    {
      label: '第三次季度xx集团巡查已经开始,查看详情',
      pain: '/form/task',
      id: 1,
    },
    {
      label: '第二次季度巡查已经结束,查看相关报表',
      pain: '/home',
      id: 1,
    },
    {
      label: 'xxx建筑巡查发现疑似拆除问题,请及时查看！',
      pain: '/function-page/collection',
      id: 1,
    },
  ])

  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
  }
</script>

<style lang="scss" scoped>
  .m-info {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    .item-info-pop {
      display: flex;
      align-items: center;
    }
    .bell {
      color: black;
    }
    .item-child {
      display: flex;
      align-items: center;
      font-size: 13px;
    }
  }
  ::v-deep(.el-divider--horizontal) {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .transverseMenu {
    .bell {
      color: white;
    }
  }
  .demo-tabs > .el-tabs__content {
    /* padding: 32px; */
    color: #6b778c;
    font-size: 12px;
    font-weight: 300;
  }
</style>
