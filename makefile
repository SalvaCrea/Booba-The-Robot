install: npm install

update:
	git fetch
	git reset --hard origin/master

start: nodejs index.js