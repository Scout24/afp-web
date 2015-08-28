# Makefile for generating SRPM files

TOPLEVEL := css js templates default-logo.png favicon.png index.html afp-web.spec

GITREV := HEAD

REVISION := "$(shell git rev-list $(GITREV) -- $(TOPLEVEL) 2>/dev/null| wc -l)"
VERSION := $(shell cat VERSION 2>/dev/null).$(REVISION)
PV = afp-web-$(VERSION)

.PHONY: all srpm clean info rpminfo

all: srpm
	ls -l dist/*.rpm

srpm: clean
	mkdir -p dist build/$(PV) build/BUILD
	cp -r $(TOPLEVEL) Makefile build/$(PV)
	mv build/$(PV)/*.spec build/
	sed -i -e s/VERSION/$(VERSION)/ build/*.spec
	tar -czf build/$(PV).tar.gz -C build $(PV)
	rpmbuild --define="_topdir $(CURDIR)/build" --define="_sourcedir $(CURDIR)/build" --define="_srcrpmdir $(CURDIR)/dist" --nodeps -bs build/*.spec

clean:
	rm -Rf dist build
