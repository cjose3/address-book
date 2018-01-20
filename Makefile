build: ;@docker-compose build

up: ;@make build && \
  docker-compose up

start: ;@make build && \
  docker-compose run app npm start

dev: ;@make build && \
  docker-compose run app npm run dev

test: ;@make build && \
  docker-compose run app npm test

format: ;@make build && \
  docker-compose run --no-deps app npm run format && \
	docker-compose stop

stop: ;@docker-compose stop

.PHONY: test
