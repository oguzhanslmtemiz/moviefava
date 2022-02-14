# Moviefava

This project developed by [Oğuzhan Selim Temiz](https://github.com/oguzhanslmtemiz) for Gusto & RemoteTeam NodeJs Bootcamp Final Project

# [Live demo](https://moviefava.herokuapp.com/)

## Tech Stack

**Client:** React, React Router, Mui, axios

**Server:** Node, Express, Mysql, TypeORM, JWT, joi, bcrypt, CORS, Helmet, Boom, Dotenv, ts-node-dev

## Features
For some reasons, all the requested features in the project could not be completed.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

> `Copy the .env.example file and call it .env and edit the variables as you need`

## Run Locally

Clone the project

```bash
  git clone https://github.com/Kodluyoruz-NodeJs-Bootcamp/final-project-oguzhanslmtemiz.git
```

Go to the project directory

```bash
  cd final-project-oguzhanslmtemiz
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
