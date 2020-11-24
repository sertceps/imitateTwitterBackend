# 仿 Twitter 后端
- Koa2 + mongoose + JWT
- RESTful API 
  - 接口地址
  - https://documenter.getpostman.com/view/13564068/TVev4QPM
- 功能
  - 登录、注册用户
  - 关注、取关用户
  - 发表、评论推文
  - 点赞、转发推文
  - 获取、编辑资料
- 目录结构
> app/
> - controllers
>   - 包含主要逻辑
> - middlewares
>   - 参数校验和 jwt 授权
> - models
>   - 包含 mongoose Schema 文件
> - routes
>   - 包含路由文件
> - app.js
>   - 入口文件

- ToDo
  - 图片、视频资源上传 
  - 消息推送
  - 信息流推送
  - 统一配置
  - 细节完善

