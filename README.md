# Learn Express

## How to Use

Install dependencies:

```sh
yarn
```

Start server with `node`:

```sh
node index.js
```

Start with `nodemon`:

```sh
nodemon index.js
```

Access the endpoints via browser, httpie, or Postman.

## API Endpoints

Furnitures:

| Route                        | HTTP Verb | Description                |
| ---------------------------- | --------- | -------------------------- |
| `/animals`                   | `GET`     | Get all the animals        |
| `/animals/:id`               | `GET`     | Get a single animal        |
| `/animals/search?name=:name` | `GET`     | Search animal by name      |
| `/animals`                   | `POST`    | Save a new animal          |
| `/animals/delete/`           | `DELETE`  | Remove all the animals     |
| `/animals/delete/:id`        | `DELETE`  | Remove an animal           |
| `/animals/update/:id`        | `PATCH`   | Update Info from an animal |
