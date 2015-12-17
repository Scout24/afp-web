Summary: WebUI for using the amazon federation proxy api
Name: afp-web
Version: VERSION
Release: 1
Source0: %{name}-%{version}.tar.gz
BuildArch: noarch
License: Proprietary

%description
Provides a pure html/js web interface for interacting with the amazon
federation proxy api

%prep
%setup

%install
mkdir -p  %{buildroot}/var/www/afp-web/{js,css,templates}
install -m 0644 index.html -D %{buildroot}/var/www/afp-web/
install -m 0644 survey.html -D %{buildroot}/var/www/afp-web/
install -m 0644 favicon.png -D %{buildroot}/var/www/afp-web/
install -m 0644 default-logo.png -D %{buildroot}/var/www/afp-web/
cp -r js %{buildroot}/var/www/afp-web/
install -m 0644 css/* -D %{buildroot}/var/www/afp-web/css
install -m 0644 templates/* -D %{buildroot}/var/www/afp-web/templates

%files
%defattr(-,root,root,-)
/var/www/afp-web
