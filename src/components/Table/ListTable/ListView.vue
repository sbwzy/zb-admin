<template>
  <div style="margin-top: 2px">
    <div
      v-for="(item, index) in bzList"
      :key="item.MPZid"
      class="uni-list-cell"
      hover-class="uni-list-cell-hover"
      :style="
        listtype == 'xiaoqu'
          ? item.XQID == xcrwXQId
            ? 'border:2px solid blue;'
            : ''
          : item.youliId == xcrwId
          ? 'border:2px solid blue;'
          : ''
      "
    >
      <!--item?.jieZhen == '即将实施' ? '#1890FF' : '#39b54a',-->
      <div style="display: flex">
        <div v-if="listtype == 'build'" class="topTitleV" style="color: #1890ff; font-weight: bold">{{ item.XiaoQuMC }}</div>
        <div v-if="listtype == 'xiaoqu'" class="topTitleV">{{ item.XQMC }}</div>
        <!-- <div v-if="listtype == 'xiaoqu' " class="rigFlagV">
          共{{item.YLGFSL}}幢
        </div>  -->
        <!-- <div
          v-if="listtype == 'build' && item.zjZt == '待检查' && !UserStore.sfRole.includes('超级管理员')"
          :style="{
            display: 'flex',
          }"
          class="rigFlagV"
        >
          <el-button type="primary" size="small" @click="parentTypeMethod(item, '提交')">
            提交<el-icon class="el-icon--right"><Upload /></el-icon>
          </el-button>
        </div> -->

        <!-- <div
          v-if="listtype == 'build' && item.zjZt == '待审核' && !UserStore.sfRole.includes('超级管理员')"
          :style="{
            display: 'flex',
          }"
          class="rigFlagV"
        >
          <el-button type="primary" size="small" @click="parentTypeMethod(item, '撤回')">
            撤回<el-icon class="el-icon--right"><RefreshLeft /></el-icon>
          </el-button>
        </div> -->
        <!-- <div
          v-if="listtype == 'build' && item.zjZt == '审核驳回' && !UserStore.sfRole.includes('超级管理员')"
          :style="{
            display: 'flex',
          }"
          class="rigFlagV"
        >
          <el-button type="primary" size="small" @click="parentTypeMethod(item, '提交')">
            重新提交<el-icon class="el-icon--right"><RefreshLeft /></el-icon>
          </el-button>
        </div> -->
      </div>

      <!-- <div
        v-if="listtype == 'build'"
        style="display: flex; flex: 1; flex-wrap: wrap; margin-top: 0px; margin-left: -8px; height: 38px; width: calc(100vw-62px)"
        @click="parentTypeMethod(item, '详情')"
    -->
      <!-- 自定义了一个data-id的属性,可以通过js获取到它的值!  hover-class 指定按下去的样式类-->
      <!--div v-for="(tagItem, index) in bindTag(item)" :key="index" class="celldiv">
          {{ tagItem }}
        </div>
      </div> -->
      <div v-if="listtype == 'build'" style="display: flex" @click="parentTypeMethod(item, '详情')">
        <div class="titleV">授权地址:</div>
        <div class="detailV">{{ item.ShouQuanDZ }}</div>
      </div>
      <div v-if="listtype == 'xiaoqu'" style="display: flex" @click="parentTypeMethod(item, '详情')">
        <div class="titleV">小区地址:</div>
        <div class="detailV">{{ item.XQDZ }}</div>
      </div>
      <div v-if="listtype == 'xiaoqu'" style="display: flex" @click="parentTypeMethod(item, '详情')">
        <div class="titleV">排查建筑数:</div>
        <div class="detailV" style="color: red; margin-top: 2px; line-height: 22px; align-self: center">{{ item.cnt }}</div>
      </div>
      <div v-else-if="listtype == 'xcrw'" style="display: flex" @click="parentTypeMethod(item, '详情')">
        <div class="titleV">巡查时间:</div>
        <div class="detailV">{{ item.xcsjS }} - {{ item.xcsjE }}</div>
      </div>
      <div v-if="listtype == 'build'" style="display: flex" @click="parentTypeMethod(item, '详情')">
        <div class="titleV">房屋用途:</div>
        <div class="detailV" style="color: #1890ff; margin-top: 2px; line-height: 22px; align-self: center">
          {{ listtype == 'build' ? item.FWYT : item.type }}
          <span style="color: #333333; margin-left: 2px"></span>
        </div>
      </div>
      <!-- <div style="display: flex" @click="parentTypeMethod(item, '详情')">
        <div class="titleV">修缮状态:</div>
        <div class="detailV" :style="{ color: item.xsqk == '修缮中' ? '#B22222' : '#39b54a' }">
          {{ listtype == 'build' ? item.xsqk : item.xsqk }}
          <span style="color: #333333; margin-left: 2px"></span>
        </div>
      </div> -->
      <div v-if="listtype == 'xcrw'" style="display: flex" @click="parentTypeMethod(item, '详情')">
        <div class="titleV">任务状态:</div>
        <div class="detailV" style="color: #1890ff; margin-top: 2px; line-height: 22px; align-self: center">
          {{ item.progress }}
          <span style="color: #333333; margin-left: 2px"></span>
        </div>
      </div>
      <!-- <div v-if="listtype == 'build'" style="display: flex" @click="parentTypeMethod(item, '详情')">
        <div class="titleV">原房屋用途:</div>
        <div class="detailV">{{ item.fangWuYTOld }}</div>
      </div> -->
      <div v-else-if="listtype == 'xcrw'" style="display: flex" @click="parentTypeMethod(item, '详情')">
        <div class="titleV">创建单位:</div>
        <div class="detailV">{{ item.cjdw }}</div>
      </div>
      <div v-if="listtype == 'xcrw'" style="display: flex" @click="parentTypeMethod(item, '详情')">
        <div class="titleV">创建人:</div>
        <div class="detailV">{{ item.cjr }}</div>
      </div>
      <div class="titleV1" v-if="item.notemsg !== null" @click="parentTypeMethod(item, '详情')" v-html="item.notemsg"> </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { Connection, Upload, RefreshLeft, Pointer } from '@element-plus/icons-vue'
  import { useUserStore } from '@/store/modules/user'
  import { storeToRefs } from 'pinia'
  import { useSettingStore } from '@/store/modules/setting'
  const SettingStore = useSettingStore()
  const { MPZInfo, xcrwXQId, xcrwId } = storeToRefs(SettingStore)

  const UserStore = useUserStore()

  let props = defineProps({
    bzList: {
      type: Array,
      default() {
        return []
      },
    },
    listtype: {
      type: String,
      default() {
        return ''
      },
    },
    parentTypeMethod: {
      type: Function,
      default: () => {},
    },
  })

  //'/function-page/collection'
  const bindTag = (item) => {
    return item.FWYT.split(',') //item.standardType, item.fangWuYTOld
  }

  onMounted(() => {})
</script>

<style scoped>
  .uni-list-cell {
    flex-direction: column;
    margin-top: 10px;
    background-color: white;
    padding: 8px 12px;
  }
  .topTitleV {
    align-items: center;
    height: 36px;
    width: calc(100vw - 28px - 66px);
    align-self: center;

    color: #333333;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 500;
    font-size: 16px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 10px;
  }

  .rigFlagV {
    display: flex;
    border-radius: 2px;
    border: 1rpx solid #1890ff;
    color: #1890ff;
    text-align: center;
    align-self: center;
    margin-left: -20px;
    font-size: 15px;
  }

  .celldiv {
    margin-top: 8px;
    margin-left: 8px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 2px;
    padding: 0px 4px !important;
    font-size: 12px;

    color: #1890ff;
    background: #f3f4f6;
  }

  .titleV {
    color: #888888;
    font-size: 15px;
    height: 26px;
    line-height: 26px;
    width: 35%;
  }
  .titleV1 {
    font-size: 13px;
    height: 26px;
    line-height: 26px;
    width: 100%;
  }

  .detailV {
    margin-left: 1px;
    color: #333333;
    font-size: 15px;
    height: auto;
    line-height: 26px;
    width: calc(100vw - 100px);
  }

  .util {
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-end;
    flex-shrink: 0;
  }
</style>
