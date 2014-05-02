# Web Modules

This folder contains modularized components. They can live:

* A `web_modules` folder committed into the application repo.
* Within `node_modules` if using npm to manage web dependencies.
* Within `bower_components` if using Bower to manage web dependencies.
* Or any other named folder or combination of the above.

> Why modules?

Modules are awesome. They have significant advantages over code embedded into an application:

* Easier for new developers to digest and contribute.
* Decoupled. Changes don't cascade breaking the application everywhere.
* Individually tested. Leading to better unit tests.
* Independently versioned. Update pieces of your application incrementally.
* Extend and swap out pieces of your application with ease.

