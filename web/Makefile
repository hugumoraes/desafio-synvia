down:
	docker-compose down

build: down
	docker-compose run --rm --service-ports frontend yarn build

dev: down
	docker-compose run --rm --service-ports frontend yarn dev

setup: down
	docker-compose run --rm --service-ports frontend yarn install

logs:
	docker-compose logs -f --tail=100 frontend