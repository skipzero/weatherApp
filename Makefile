.PHONY: all build deploy dev-server server plop lint test test.only
NPM_BIN=./node_modules/.bin

all: build lint server

build: node_modules/
	npx webpack && cp -R src/images public/

deploy: test build

dev-server: build
	npx webpack-dev-server --open

server: build
	npx http-server --open

node_modules/: package.json
	npm install
	-touch node_modules/

lint: node_modules/
	npx eslint src/ test/

debug:
	$(NPM_BIN)/mocha --opts mocha.opts --inspect-brk

test: lint
	npx mocha --opts mocha.opts

test.only:
	npx mocha --opts mocha.opts

test.blink:
	# npx mocha --opts mocha.ops --require babel-register
	mocha -R @ripter/mocha-reporter-blink1

watch:
	$(NPM_BIN)/webpack --env.dev --progress --colors -d --watch

cover:
	$(NPM_BIN)/istanbul cover $(NPM_BIN)/_mocha test/*.js -- --require babel-register
