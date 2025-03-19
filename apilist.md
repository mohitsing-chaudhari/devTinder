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
- POST /request/received/:status/:requestId  status can be accepted or rejected

# userRouter
- GET /user/requests/received
- GET /user/connection
- GET /user/feed