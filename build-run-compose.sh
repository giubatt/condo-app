docker build -t condo-app-backend ./backend
docker build -t condo-app-frontend ./frontend

docker-compose down
docker-compose up -d