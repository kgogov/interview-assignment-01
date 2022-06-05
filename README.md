# Project description

### Available endpoints

| method | resource     | description        |
| :----- | :----------- | :----------------- |
| `GET`  | `/`          | Index page         |
| `POST` | `/subscribe` | Submit form data   |
| `POST` | `/validate`  | Validate form data |


## Pre-reqs

To build and run this app locally you will need:
- [Node.js](https://nodejs.org/en/)

## Included middleware:

* koa-bodyparser
* koa-router
* koa-static
* koa-views
* @koa-cors
* nunjucks

## Getting started

Clone the repository

```
git clone https://github.com/kgogov/modis-task.git
```

Install all dependencies

```
npm install
```

Run the project

```
npm run start
```

### devDependencies

* nodemon
