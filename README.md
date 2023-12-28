# Assignment 4 - Course Review System With Auth

- technologies: TypeScript, Node.js, Express.js, MongoDB, Mongoose, Zod

## How to run

- First, clone the repo and install the dependencies using `npm install` command.
- then, build the project using `npm run build` command.
- at last, run the project using `npm run start:dev` command.

### live link

- https://course-review-system-with-auth.vercel.app

### DEMO LOGIN DETAILS

- (user) :
  username: xpawal
  password: awal123

- (admin) :
  username: babulakterfsd
  password: babul123

### API Documentation

1.  Register a user
    - Endpoint: `/api/auth/register`
      - Method: `POST`
2.  Login a user

    - Endpoint: `/api/auth/login`
      - Method: `POST`

3.  Change password

    -       Endpoint: `/api/auth/change-password`
    -       Method: `POST`

4.  create a course

    - Endpoint: `/api/courses`
      - Method: `POST`

5.  get all courses

    - Endpoint: `/api/courses`
      - Method: `GET`

6.  create a category

    - Endpoint: `/api/categories`
      - Method: `POST`

7.  get all categories

    - Endpoint: `/api/categories`
      - Method: `GET`

8.  create a review

    - Endpoint: `/api/reviews`
      - Method: `POST`

9.  update a course

    - Endpoint: `/api/courses/:courseId`
      - Method: `PUT`

10. get single course with reviews

    - Endpoint: `/api/courses/:courseId/reviews`
      - Method: `GET`

11. get the best course
    - Endpoint: `/api/course/best`
      - Method: `GET`
