AUTHOR=cjose3

PROJECT_NAME := $(shell cat package.json \
  | grep name \
  | head -1 \
  | awk -F: '{ print $$2 }' \
  | sed 's/[", ]//g')

PROJECT_VERSION := $(shell cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $$2 }' \
  | sed 's/[", ]//g')

IMAGE=$(AUTHOR)/$(PROJECT_NAME):$(PROJECT_VERSION)

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

publish: ;@docker build --build-arg NODE_ENV=production -t $(IMAGE) .
  docker push $(IMAGE) &&  \
  git push

.PHONY: test
