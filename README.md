# Locker system for Electric Engineering

- Global Router
  / -> Home
  /join -> Join
  /login -> Log in
  /lockers -> Lockers layout

- User Router
  /user/logout -> Log out
  /user/edit -> Edit My Profile
  /user/return -> Return My present locker
  /user/remove -> Remove My Profile
  /user/:id -> See My Profile

- user's imformation

  1. student number
  2. password
  3. locker number
  4. period
  5. return : 정말로 반납하시겠습니까? 팝업 후 yes or no 로 대체
  6. qna : 문자 메세지 전송으로 대체

- Lock Router
  /lock/:id/application -> user applicate a locker
  /lock/:id/application/password -> user get PW of applicated lock

- Admon Router
  /admin/userData -> Data of user
  /admin/:id/qna -> q from user and a for user
  /admin/:id/changePw -> change password of returned locker

- Data of user
  1. student number
  2. password
  3. lock number
  4. period
