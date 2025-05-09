# Event-driven PoC

Project: Online Streaming Platform

Flow: Media Transcoding

## Run the project

Start Kafka server and microservices: 

```bash
$ docker compose up -d
```

Stop Kafka server and microservices:

```bash
$ docker compose down
```

## Follow event logs

To follow docker logs of the microservices:

```bash
$ docker compose logs -f content-service transcoding-service
```

## Use API

Get all movies:

```http request
GET http://localhost:3000/movies
```

Upload (create) a movie:

```http request
POST https://localhost:3000/movies?name=<movie-name>
```

