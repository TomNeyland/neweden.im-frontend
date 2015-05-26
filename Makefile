
dependencies:
	npm --loglevel error install

clean:
	rm -rf node_modules/
build:
	make clean
	make dependencies
	gulp build


.PHONY : build
