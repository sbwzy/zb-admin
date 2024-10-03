import { useSettingStore } from '@/store/modules/setting'
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const { body } = document
console.log('我们打印一下这个document吧')
console.log('这个对象是官方的吗')
console.log(document)
const WIDTH = 1000 // refer to Bootstrap's responsive design
const MAX_WIDTH = 1400

export const useResizeHandler = () => {
  const SettingStore = useSettingStore()
  const route = useRoute()
  //computed 值发生变化后触发
  const device = computed(() => {
    return SettingStore.device
  })

  //判断此时页面大小是否小于800 则为mobile 否则desktop
  function $_isMobile() {
    //document.getBoundingClientRect 获取元素在页面的位置和大小等信息
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  //判断此时页面宽度是否大于1200 是否收缩
  function collapse() {
    const rect = body.getBoundingClientRect()
    if (rect.width - 1 > MAX_WIDTH) {
      return true
    } else {
      return false
    }
  }

  function $_resizeHandler() {
    if (!document.hidden) {
      // bool型，表示页面是否处于隐藏状态。页面隐藏包括页面在后台标签页或者浏览器最小化
      const isMobile = $_isMobile()
      const isCollapse = collapse()
      SettingStore.toggleDevice(isMobile ? 'mobile' : 'desktop')

      if (isMobile) {
        //关闭侧边栏
        SettingStore.closeSideBar({ withoutAnimation: true })
      }

      if (!isMobile) {
        //收缩
        SettingStore.setCollapse(isCollapse)
      }
    }
  }
  // 注册一个回调函数，在组件挂载完成后执行。
  onMounted(() => {
    const isMobile = $_isMobile()
    if (isMobile) {
      SettingStore.toggleDevice('mobile')
      SettingStore.closeSideBar({ withoutAnimation: true })
    }
    //添加窗口 缩放的监听事件
    window.addEventListener('resize', $_resizeHandler)

    //侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数
    //监听路由
    watch(route, () => {
      if (device.value === 'mobile' && SettingStore.isCollapse) {
        SettingStore.closeSideBar({ withoutAnimation: false })
      }
    })
  })
  //注册一个回调函数，在组件实例被卸载之后调用。
  onUnmounted(() => {
    window.removeEventListener('resize', $_resizeHandler)
  })

  return { device }
}
