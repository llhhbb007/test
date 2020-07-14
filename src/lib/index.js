import calender from './calender' // 导入组件
calender.install = function (Vue) {
  Vue.component('calender',calender)
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(calender);
  }
}

export default calender
