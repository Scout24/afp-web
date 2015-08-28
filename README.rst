AFP-WEB
=======

What it is?
-----------
This is a web frontend, which communicates with the aws federation proxy (afp)
via its rest api and displays the results:

* Give an overview of all available accounts and their usable
  roles for the logged in user
* Get and show temporary credentials for the selected account and role
* Automatic login to the aws management console for the desired account

Configuration & Setup
---------------------
Webserver
^^^^^^^^^
The files should be made accessible for your webserver. How is up to you.
For example in a vhost with:

.. code-block:: apache

  DocumentRoot '/var/www/afp-web'

API access
^^^^^^^^^^
The web UI should be used on the same machine where the api is located.
Therefore, no configuration is needed. Just make sure that the api is
listening on *https://myhost/api*

Logo configuration
^^^^^^^^^^^^^^^^^^
If you want to replace the default logo just put a image file called
**logo.png** into the **DocumentRoot**.

Copyrights
^^^^^^^^^^
* The CSS spinner (throbber.css) was taken from https://github.com/jlong/css-spinners.git
* AngularJS v1.4.3 (Licensed under MIT) http://angularjs.org
* Bootstrap v3.3.5 (Licensed under MIT) https://github.com/twbs/bootstrap/blob/master/LICENSE
