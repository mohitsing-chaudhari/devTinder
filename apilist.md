## DevTinder Api List

# authRouter
- post /signup
- post /login
- post /logout

# profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

# connectionRequestRouter
- POST /request/send/:status/:userId  status can be interested or ignored
- 
- POST /request/received/accepted/:requestId
- POST /request/received/rejected/:requestId

# userRouter
- GET /user/connection
- GET /user/requests
- GET /user/feed