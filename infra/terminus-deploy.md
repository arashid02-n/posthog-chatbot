# Terminus Server Deployment

## Build & Start
docker compose up -d --build

## View Logs
docker compose logs -f web
docker compose logs -f server
docker compose logs -f nginx

## Restart
docker compose restart

## Stop
docker compose down
