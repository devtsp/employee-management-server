# Employee-managment API

`API_URL = https://employees-management-server.herokuapp.com/`

### User registration and login (public routes):
 
| Method | Endpoint | Request Body | Description
| :---:  | :---     | :---   | :---
| `GET` | `/filename.ext` |  | `filename.ext` (static files path)  
| `GET` | `/` |  | `index.html`
| `POST` | `/register` | `user, pwd` | persist user in DB
| `POST` | `/auth` | `user, pwd` | return jwt `accessToken`, set jwt `refreshToken` in cookie
| `GET` | `/refresh` |  | return new `acessToken` if `refreshToken` still alive
| `GET` | `/logout` |  | remove `refreshToken` from DB, clear cookie
 
<br/> 

### Employee API (protected and authorized routes):
All following routes will have to provide a fresh `acessToken` as `'Bearer [accessToken]'` in authorization header

<br/> 

| Method | Endpoint | Request Body | Allowed Roles | Description
| :---:  | ---     | ---   | --- | ---
| `GET` | `/employees` |  | all | return all employees 
| `GET` | `/employees/:id` |  | all | return single employee
| `POST` | `/employees` | `firstname, lastname` | Admin / Editor | create employee
| `PUT` | `/employees` | `id, firstname, lastname` | Admin / Editor | update employee 
| `DELETE` | `/employees` | `id` | Admin | remove employee






