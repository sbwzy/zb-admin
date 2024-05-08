<template>
  <view class="content">
    <div class="mui-content-padded">
      <menuView :tabs="bztabs"></menuView>
    </div>
    <div class="mui-content-padded">
      <!-- 信息列表组件 seniorList:高管数组信息 -->
      <spListView :bz-list="bzList"></spListView>
    </div>
  </view>
</template>

<script lang="ts" setup>
  import spListView from './components/ListView.vue'
  import menuView from './components/Menu.vue'

  const bztabs = [
    {
      name: '全部',
      label: '全部',
      content: '全部',
    },
    {
      name: '注册',
      label: '注册',
      content: '注册',
    },
    {
      name: '采集',
      label: '采集',
      content: '采集',
    },
    {
      name: '预警',
      label: '预警',
      content: '预警',
    },
  ]
  const bzList = [
    {
      id: '2',
      isNewRecord: false,
      comName: '123456',
      socialCode: '123456',
      comCode: '123456',
      standardName: '药品网络经营质量规范',
      standardType: '国家标准',
      standardNo: 'T/CAPC 010—2023',
      createUnit: '中国医药商业协会、国药控股股份有限公司、上药控股有限公司、华润医药商业集团有限公司 等更多18家单位',
      publishTime: '2021-01-03',
      standardState: '即将实施',
      recommended: '推荐',
    },
    {
      id: '1',
      isNewRecord: false,
      comName: '123456',
      socialCode: '123456',
      comCode: '123456',
      standardName: '益生菌食品',
      standardType: '团体标准',
      standardNo: 'T/CNFIA 131—2021',
      createUnit:
        '北京科拓恒通生物技术股份有限公司、中国食品发酵工业研究院、北京热心肠生物技术研究院有限公司、内蒙古蒙牛乳业(集团)股份有限公司 等更多30家单位',
      publishTime: '2021-01-02',
      standardState: '现行',
      recommended: '推荐',
    },
  ]
</script>

<style scoped lang="scss">
  //@import './index';
  page {
    background: #f3f4f6;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .mui-content-padded {
    margin: 0px 14px;
  }

  .bottomV {
    /* 设置视图置顶 */
    display: flex;
    flex-direction: row;
    position: fixed;
    margin-top: calc(100vh - 168px);
    height: 60px;
    z-index: 9999 !important;
    width: 100vw;
    background-color: white;
    padding-left: 0px;
    padding-bottom: 20px;
  }
</style>
