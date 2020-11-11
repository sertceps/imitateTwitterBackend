# 初步 API 接口设计
- 注册
  - POST
  - /users
  ```json
  {
      "user_id":"Zhang san",
      "email":"example@gamil.com",
      "birthday":""
  }
  ```
- 登录
  - POST
  - /login
  ```json
  {
      "id":"exampleID",
      "password":"***"
  }
  ```
- 个人信息
  - GET
  - /users
    - userid
  ```json
  {
    "user_id":"",
    "name":"",
    "email":"",
    "birth":"",
    "location":"",
    "intro":"",
    "register_day":""
  }
  ```
- 关注
  - POST
  - /follows:useri
- 获取关注
  - GET
  - /follows
- 获取粉丝
  - GET
  - /fans
    - user_id
- 获取朋友
  - GET
  - /friends
    - user_id
- 发表推文
  - POST
  - /tweets
  ```json
  {
    "text":"",
    "images":"",
    "video":""
  }
  ```
- 获取推文
  - GET 
  - /tweets
    - author_id & tweet_id
- 发表评论
  - POST
  - /comments
  ```json
  {
    "text":"",
    "images":"",
    "video":""
  }
  ```
- 获取评论
  - GET
  - /comments
    - author & tweet_id & comment_id=y
- 点赞
  - POST
  - /likes
    - author_id & post_id | comment_id
    ```json
    {
      "likes_count":""
    }
    ```

# 初步 MongooDB 表结构设计
- t_user
  - userpk
  - userid
  - username
  - birthday
  - email
  - tweets
    - t: Tweet
  - followers
    - t: User
  - fans
    - t: Fans
  - friends
    - t: User
  - blocks

- Tweet
  - content
  - images
  - videos
  - like_count
  - retweet_count
  - comment
    - t: Comment
- Comment == Tweet

- Fans
  - 

