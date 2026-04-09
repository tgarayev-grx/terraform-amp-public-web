IMAGE_WEB := public-web:local
IMAGE_DOCS := public-docs:local
PORT_WEB := 8080
PORT_DOCS := 8081

.PHONY: build build-web build-docs run run-web run-docs

# Default: marketing web (same as before)
build: build-web

run: run-web

build-web:
	docker build -f Dockerfile.web -t $(IMAGE_WEB) .

build-docs:
	docker build -f Dockerfile.docs -t $(IMAGE_DOCS) .

run-web:
	docker run -p $(PORT_WEB):80 $(IMAGE_WEB)

run-docs:
	docker run -p $(PORT_DOCS):80 $(IMAGE_DOCS)
