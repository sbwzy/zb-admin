<template>
  <div style="margin-top: 10px">
    <div v-for="(item, index) in bzList" :key="item.id" class="uni-list-cell" hover-class="uni-list-cell-hover" @click="goProDetail(item)">
      <div style="display: flex">
        <div class="topTitleV">{{ item.standardName }}</div>
        <div
          :style="{
            marginLeft: (4 - item.standardState.length) * 10 + 'px',
            width: item.standardState.length * 10.5 + 'px !important',
            color: item.standardState == '即将实施' ? '#1890FF' : '#39b54a',
            'border-color': item.standardState == '即将实施' ? '#1890FF' : '#39b54a',
          }"
          class="rigFlagV"
        >
          {{ item.standardState }}
        </div>
      </div>
      <div style="display: flex; flex: 1; flex-wrap: wrap; margin-top: 0px; margin-left: -8px; height: 38px; width: calc(100vw-62px)">
        <!-- 自定义了一个data-id的属性,可以通过js获取到它的值!  hover-class 指定按下去的样式类-->
        <div v-for="(tagItem, index) in bindTag(item)" :key="index" class="celldiv">
          {{ tagItem }}
        </div>
      </div>
      <div style="display: flex">
        <div class="titleV">标准号:</div>
        <div class="detailV">{{ item.standardNo }}</div>
      </div>
      <div style="display: flex">
        <div class="titleV">起草单位:</div>
        <div class="detailV" style="color: #1890ff; margin-top: 2px; line-height: 22px; align-self: center">
          {{ item.createUnit }}
          <span style="color: #333333; margin-left: 2px"></span>
        </div>
      </div>
      <div style="display: flex">
        <div class="titleV">发布日期:</div>
        <div class="detailV">{{ item.publishTime }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'

  let props = defineProps({
    bzList: {
      type: Array,
      default() {
        return []
      },
    },
  })
  const goProDetail = (item) => {}

  const bindTag = (item) => {
    return [item.standardType, item.recommended]
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
    width: auto !important;
  }

  .detailV {
    margin-left: 4px;
    color: #333333;
    font-size: 13px;
    height: auto;
    line-height: 26px;
    width: calc(100vw - 108px);
  }
</style>
