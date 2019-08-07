# Overcomplicated fibonacci calculator using docker

Multi-Container application for calculation fibonacci numbers. It uses `nginx` for reverse proxy. `postgres` for storing seen indices of fibonacci numbers and `redis` for storing calculated values. Back-end is a simply `node.js` app with `express`. Front-end is a simply `vue.js` app. For calculating fibonacci number uses `worker` service which listen for the `insert` event from `api` service.

## Usage

Execute the following command to boot up the application.

```bash
docker-compose up
```

By default this will start application at `http://localhost:8000`. You can change port in `.env` file.

## Environment

You'd have to create a `.env` file in root directory to configure your environment variables. You should use `.env_example` as an example.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
