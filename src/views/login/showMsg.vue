<template>
  <div v-if="resignPage" class="transition-page">
    <div class="content">
      <h1>当前跳转失败...</h1>
      <p>{{ route.query.msg }}</p>
      <el-button>返回</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { storeToRefs } from 'pinia'

  import { useRoute, useRouter } from 'vue-router'
  import { getQueryMPZInfo, buildListinfo } from '@/api/user'
  import { useSettingStore } from '@/store/modules/setting'
  const resignPage = ref(true)
  const router = useRouter()
  const route = useRoute()
  const targetPath = '/' // 目标页面路径
  const SettingStore = useSettingStore()
  // 获取数据
  const { XiaoQuList } = storeToRefs(SettingStore)

  // 定义定时器
  let timer: ReturnType<typeof setTimeout> | null = null

  onMounted(() => {
    console.log('进来')
    //console.log(route.query.msg)

    // 设置定时器，在指定时间后跳转
    getQueryMPZInfo().then((res) => {
      if (res.data.result === 1) {
      }
    })
  })

  onUnmounted(() => {
    // 清除定时器
    if (timer !== null) {
      clearTimeout(timer)
    }
  })

  // 示例函数，用于手动触发跳转
  function triggerRedirect() {
    if (timer !== null) {
      clearTimeout(timer)
    }
    router.push(targetPath)
    resignPage.value = false
  }

  // 导出函数，以便在其他地方触发跳转
  defineExpose({ triggerRedirect })
</script>

<style scoped>
  .transition-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }

  .content {
    text-align: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
  }
</style>
