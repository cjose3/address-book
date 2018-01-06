up: ;@docker-compose up

start: ;@docker-compose run -d app \
	npm start && \
	docker-compose logs -f app

dev: ;@docker-compose run -d app \
	npm run dev && \
	docker-compose logs -f app

test: ;@docker-compose run -d app \
	npm run test && \
	docker-compose logs -f app

format: ;@docker-compose run --no-deps app \
	npm run format && \
	docker-compose stop

stop: ;@docker-compose stop

build: ;
.PHONY: test
