# Node Employee Managment System

### Available Methods

URL = https://employees-management-server.herokuapp.com/

### Public routes:
| METHOD | ENDPOINT | REQ | DESCRIPTION
| :---:  | :---     | :---:   | :---:
| `GET` | `/filename.ext` | - | filename.ext (static)  
| `GET` | `/` | - | index.html
| `POST` | `/register` | `{body:{user,pwd}}` | persists `user` and `pwd` in DB
| `POST` | `/auth` | `{body:{user,pwd}}` | returns access token =  `{UserInfo:{username,roles}}`, returns via cookie/persists refresh token = `{username}`
| `GET` | `/refresh` | `{cookies:{jwt:refreshtoken}}` | returns new access token = `{UserInfo:{username,roles}}`
| `GET` | `/logout` | `{cookies:{jwt:refreshtoken}}` | removes refresh token from user on DB, clears refresh token in cookie


