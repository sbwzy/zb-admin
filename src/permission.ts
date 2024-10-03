import router from '@/routers/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/', '/auth-redirect'] // 设置白名单
// 记录路由
let hasRoles = true

router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start()
  // 设置标题
  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title || '优历公房采集系统'
  }
  console.log('退出的时候会触发吗')
  console.log('111', router, to)

  const UserStore = useUserStore()
  // 确定用户是否已登录过，存在Token
  const hasuser = UserStore.userInfo
  console.log(hasuser)
  console.log(Object.keys(hasuser).length)
  if (Object.keys(hasuser).length !== 0) {
    console.log('进来')
    if (to.query) {
      console.log('查询参数', to.query)
    }
    if (to.path === '/login') {
      // 如果已登录，请重定向到主页
      next({ path: '/' })
    } else {
      try {
        const PermissionStore = usePermissionStore()
        // 路由添加进去了没有及时更新 需要重新进去一次拦截
        if (!PermissionStore.routes.length) {
          // 获取权限列表进行接口访问 因为这里页面要切换权限
          const accessRoutes = await PermissionStore.generateRoutes(UserStore.roles)
          hasRoles = false
          accessRoutes.forEach((item) => router.addRoute(item)) // 动态添加访问路由表
          next({ ...to, replace: true }) // // 这里相当于push到一个页面 不在进入路由拦截
          console.log(444)
        } else {
          next() // // 如果不传参数就会重新执行路由拦截，重新进到这里
        }
      } catch (error) {
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    //next()
    console.log('第二个页面')
    // 没有登录 就重新 不显示任何页面 404 页面
    if (whiteList.indexOf(to.path) !== -1) {
      console.log(222)
      next()
    } else {
      console.log(333)
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
