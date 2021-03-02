import dayjs from 'dayjs'
import Vue from 'vue'

// 表达式，过滤器
Vue.filter('date',(value,format = 'YYYY-MM-DD')=>{
  return dayjs(value).format(format)
})