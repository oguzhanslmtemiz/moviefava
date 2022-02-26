# Moviefava

This project developed by [Oğuzhan Selim Temiz](https://github.com/oguzhanslmtemiz) for Gusto & RemoteTeam NodeJs Bootcamp Final Project

# [Live demo](https://moviefava.herokuapp.com/)

## About

> Users can register or login via Google / Facebook then they can add their favorite movies or actors and they can make them shareable. Other members can only access, like or comment on these shared posts. Users can also delete, edit their own posts.

## Tech Stack

**Client:** React, React Router, Mui, axios, notistack, moment

**Server:** Node, Express, Mysql, TypeORM, JWT, joi, bcrypt, CORS, Boom, Dotenv, ts-node-dev

## Features

- Sign in / up System
- Login via Google / Facebook
- JWT for Auth
- CRUD Movie or Actor
- Share & Like & Comment System
- User Public / Private Profile Page

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

> `Copy the .env.example file and call it .env and edit the variables as you need`

## Entity Relationship Diagram

![ER](https://user-images.githubusercontent.com/71596269/155852002-769f58ef-b3b0-44c0-8351-f372a0fac4d4.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/oguzhanslmtemiz/moviefava.git
```

Go to the project directory

```bash
  cd moviefava/client & cd moviefava/server
```

Install dependencies

```bash
  yarn
```

Copy the .env.example file and call it .env and edit the variables as you need.

```bash
  cp .env.example .env
```

Set your database credentials and create a MySQL database based on the variables in the .env file

```bash
  > Create a user with all permissions. username: test, password: test

  mysql> CREATE DATABASE moviefavadev

  * All necessary tables will be created automatically
```

Start the server

```bash
  yarn start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
