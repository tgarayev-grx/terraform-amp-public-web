IMAGE := public-web:local
PORT := 8080

.PHONY: build run

build:
	docker build -f Dockerfile -t $(IMAGE) .

run:
	docker run -p $(PORT):80 $(IMAGE)
