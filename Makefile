.PHONY: all build deploy dev-server server plop lint test test.only
NPM_BIN=.nvm/versions/node/$(node -v)/bin/node

all: build lint server

build: node_modules/
	npx webpack && cp -R src/images public/

clean:
	rm -rf public/*

deploy: test build

dev-server: build
	npx webpack-dev-server --open

server: build
	npx http-server --open

node_modules: clean
	npm install
	-touch node_modules/

lint: node_modules/
	npx eslint src/ test/

debug:
	node --inspect server.js

test: lint
	npx mocha --opts mocha.opts

test.only:
	npx mocha --opts mocha.opts

test.blink:
	# npx mocha --opts mocha.ops --require babel-register
	mocha -R @ripter/mocha-reporter-blink1

watch:
	webpack --env.dev --progress --colors -d --watch

cover:
	istanbul cover mocha test/*.js -- --require babel-register
