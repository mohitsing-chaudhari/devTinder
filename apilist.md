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
- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId
- POST /request/received/accepted/:requestId
- POST /request/received/rejected/:requestId

# userRouter
- GET /user/connection
- GET /user/requests
- GET /user/feed