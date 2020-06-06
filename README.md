# How to run locally

## Backend

To install dependencies, run:

```
cd backend
yarn install
```

#### Environtment Variables

The project needs the following environment variables:

`MONGODB_URI`: MongoDB URI String

`JWT_SECRET`: Secret string used to sign JWTs

#### Development

To run the backend project in development, run:

```
yarn watch
```

#### Production

To run the backend project in production, run:

```
yarn build
yarn serve
```

---

## Frontend

To install dependencies run:

```
cd frontend
yarn install
```

### Development

To run the frontend project in development, run:

```
yarn start
```

### Production

To build the frontend project for production, run:

```
yarn build
```

# How to run with Docker

#### Environment Variables
Add the environment variables values to the docker-compose:

`MONGODB_URI`: MongoDB URI String

`JWT_SECRET`: Secret string used to sign JWTs

---

To run both the backend and frontend, just build each image with:

```
docker build -t condo-app-backend ./backend
docker build -t condo-app-frontend ./frontend
```


Then run `docker-compose up` to run everything.

Alternativelly, just run the shell script `build-run.compose.sh` and it will do everything automatically.

