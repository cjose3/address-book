build: ;@docker-compose build

up: ;@docker-compose up

start: ;@docker-compose run app \
	npm start

dev: ;@docker-compose run app \
	npm run dev

test: ;@make build && \
  docker-compose run app \
	npm test

format: ;@docker-compose run --no-deps app \
	npm run format && \
	docker-compose stop

stop: ;@docker-compose stop

.PHONY: test
