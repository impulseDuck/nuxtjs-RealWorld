// 基于axios模块的封装

import axios from "axios";

// 创建对象
export const request = axios.create({
  baseURL: "https://conduit.productionready.io",
});

// 输出上下文对象（query, params, req, res ,app, store...）
export default ({ store }) => {
  console.log(store, 1);

  // 请求拦截器
  request.interceptors.request.use(
    function(config) {
      const { user } = store.state;
      console.log(user);
      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`;
      }
      // 返回请求配置对象
      return config;
    },
    function(err) {
      // 如果请求失败（请求没有发出去）会进入到这里
      return Promise.reject(err);
    }
  );
};
