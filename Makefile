install:
	npm ci

gendiff-help:
	node bin/gendiff.js -h

publish:
	npm publish --dry-run

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

.PHONY: tes
