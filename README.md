# 初步 API 接口设计
- 注册
  - POST
  - /users
```json
  {
      "user_id":"Zhang san",
      "email":"example@gamil.com",
  }
```
- 登录
  - POST
  - /login
  - request & response
```json 
  {
      "id":"exampleID",
      "password":"***"
  }

  {
    "token":""
  }
```

- 首页
- 用户资料
  - GET
  - /users/:userid
  - rsponse   
```json
{
  "_id": ObjectId,
  "userid": "zhangsan",
  "username": "zhan san",
  "email": "zhangsan@foxmail.com",
  "type": "USER",
  "detail_info":{
    "avatar_url": "/images/avatars/default.jpg",
    "background_url":"/images/backgrounds/default.jpg",
    "description":"",
    "location": "San Francisco",
    "website":"",
    "birthday":"",
  },
  "tweets_url":"api.example.com/tweets/:t_tweet_r_id",
  "liked_url": "api.example.com/liked/:t_liked_id",
  "followers":0,
  "following":20,
  "followers_url": "https://api.example.com/followers/:t_followers_id",
  "following_url": "https://api.example.com/following/:t_following_id",
  "blocking__url": "https://api.exmaple.com/blocking/:t_blocking_id",
  "url": "api.example.com/users/zhangsan",
  "html_url": "example.com/zhangsan",
  "created_at": "2008-01-14T04:33:35Z",
  "updated_at": "2008-01-14T04:33:35Z"
}
```
- 关注
  - POST
  - /following/:userid
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
  "_id":ObjectId,
  "author":ObjectId,
  "content":{
    "text":"hahah",
    "images":"["images/tweet/url"]",
    "video":"/videos/url",
    "retweet":ObjectId,
    },
    "likers":20,
    "retweeters":10,
    "comments":5,
    "likers_url":"api.example.com/likers/:t_likers_id",
    "reweeters_url":"api.example.com/retweets/:t_retweers_id",
    "comments_url":"api.example.com/comments/:t_comments_id",
    "is_comment":false,
    "is_del":false
}
```
- 获取推文
  - GET 
  - /tweets
    - author_id & tweet_id
```json
{
  "_id":ObjectId,
  "author":ObjectId,
  "content":{
    "text":"hahah",
    "images":"["images/tweet/url"]",
    "video":"/videos/url",
    "retweet":ObjectId,
    },
    "likers":20,
    "retweeters":10,
    "comments":5,
    "likers_url":"",
    "reweeters_url":"",
    "comments_url":"",
    "is_comment":false,
    "is_del":false
}
```
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

