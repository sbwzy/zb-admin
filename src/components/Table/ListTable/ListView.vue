<template>
  <div style="margin-top: 2px">
    <div v-for="(item, index) in bzList" :key="item.id" class="uni-list-cell" hover-class="uni-list-cell-hover">
      <!--item?.jieZhen == '即将实施' ? '#1890FF' : '#39b54a',-->
      <div style="display: flex">
        <div class="topTitleV">{{ listtype == 'build' ? item.xiaoQu : item.renwuName }}</div>
        <div
          v-if="listtype != 'build'"
          :style="{
            marginLeft: item.progress.length * 1 + 'px',
            width: item.progress.length * 10 + 'px !important',
            color: item.progress == '进行中' ? '#1890FF' : '#aa0000',
          }"
          class="rigFlagV"
        >
          {{ item.progress }}
        </div>
        <div
          v-if="listtype == 'build' && item.cjZt == '采集中'"
          :style="{
            display: 'flex',
          }"
          class="rigFlagV"
        >
          <el-button type="primary" size="small" @click="parentTypeMethod(item, '提交')">
            提交<el-icon class="el-icon--right"><Upload /></el-icon>
          </el-button>
          <!-- <el-button type="primary" size="small" @click="OptionItem(item,2)">
            转派<el-icon class="el-icon--right"><Connection /></el-icon>
          </el-button> -->
        </div>

        <div
          v-if="listtype == 'build' && item.cjZt == '待审核'"
          :style="{
            display: 'flex',
          }"
          class="rigFlagV"
        >
          <el-button type="primary" size="small" @click="parentTypeMethod(item, '撤回')">
            撤回<el-icon class="el-icon--right"><RefreshLeft /></el-icon>
          </el-button>
        </div>
      </div>
      <div
        v-if="listtype == 'build'"
        style="display: flex; flex: 1; flex-wrap: wrap; margin-top: 0px; margin-left: -8px; height: 38px; width: calc(100vw-62px)"
        @click="parentTypeMethod(item, '详情')"
      >
        <!-- 自定义了一个data-id的属性,可以通过js获取到它的值!  hover-class 指定按下去的样式类-->
        <div v-for="(tagItem, index) in bindTag(item)" :key="index" class="celldiv">
          {{ tagItem }}
        </div>
      </div>
      <div v-if="listtype == 'build'" style="display: flex" @click="parentTypeMethod(item, '详情')">
        <div class="titleV">授权地址:</div>
        <div class="detailV">{{ item.shouQuanDZ }}</div>
      </div>
      <div v-else-if="listtype != 'build'" style="display: flex" @click="parentTypeMethod(item, '详情')">
        <div class="titleV">巡查时间:</div>
        <div class="detailV">{{ item.xcsjS }} - {{ item.xcsjE }}</div>
      </div>
      <div style="display: flex" @click="parentTypeMethod(item, '详情')">
        <div class="titleV">类型:</div>
        <div class="detailV" style="color: #1890ff; margin-top: 2px; line-height: 22px; align-self: center">
          {{ listtype == 'build' ? item.standardType : item.type }}
          <span style="color: #333333; margin-left: 2px"></span>
        </div>
      </div>
      <div v-if="listtype == 'build'" style="display: flex" @click="parentTypeMethod(item, '详情')">
        <div class="titleV">房屋用途:</div>
        <div class="detailV">{{ item.fangWuYTOld }}</div>
      </div>
      <div v-else-if="listtype != 'build'" style="display: flex" @click="parentTypeMethod(item, '详情')">
        <div class="titleV">创建单位:</div>
        <div class="detailV">{{ item.cjdw }}</div>
      </div>
      <div v-if="listtype != 'build'" style="display: flex" @click="parentTypeMethod(item, '详情')">
        <div class="titleV">创建人:</div>
        <div class="detailV">{{ item.cjr }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { Connection, Upload, RefreshLeft } from '@element-plus/icons-vue'

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
    return [item.standardType, item.fangWuYTOld]
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

    font-size: 10px;
    height: 22px;
    line-height: 22px;
    padding: 0px 3px;
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
    font-size: 12px;
    height: 26px;
    line-height: 26px;
    width: 30%;
  }

  .detailV {
    margin-left: 4px;
    color: #333333;
    font-size: 13px;
    height: auto;
    line-height: 26px;
    width: calc(100vw - 108px);
  }

  .util {
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-end;
    flex-shrink: 0;
  }
</style>
