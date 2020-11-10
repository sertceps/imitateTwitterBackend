# 初步 API 接口设计
- 注册
  - POST
  - /register
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
  - /user
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
- 发表推文
  - POST
  - /tweet
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
  - /comment
  ```json
  {
    "text":"",
    "images":"",
    "video":""
  }
  ```
- 获取评论
  - GET
  - /comment
    - author & tweet_id & comment_id=y
- 点赞
  - POST
  - /likes
    - author_id & post_id | comment_id
- 获取点赞
  - GET
  - /likes
    - author_id & post_id | comment_id
    ```json
    {
      "likes_count":""
    }
    ```
- 进行转发
  - POST
  - /retweets
    - author_id & post_id | comment_id
    ```json
    {
      "text":""
    }
    ```
- 获取转发
  - GET
  - /retweets
    - author_id & post_id | comment_id
- 关注
  - POST
  - /follows
    - user_id
- 获取关注者
  - GET
  - /fans
    - user_id
- 获取朋友
  - GET
  - /friends
    - user_id

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

