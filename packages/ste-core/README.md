# Strongly Typed Events - Core
Core package for the Strongly Typed Events projects. This
project adds events to your projecs. Because events can have
multiple flavours, we've created multiple packages.

[![Build Status](https://travis-ci.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript.svg?branch=master)](https://travis-ci.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript)
[![npm version](https://badge.fury.io/js/ste-core.svg)](https://badge.fury.io/js/ste-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Packages
The project is separated into multiple packages, so you only need
to include what you need. We have the following packages:

|Package|Description|
|-------|-----------|
|<a href="https://www.npmjs.com/package/ste-core">`ste-core`</a>|Package that contains all the building blocks for the creation of events. The dispatcher implementation is its main hero.|
|<a href="https://www.npmjs.com/package/ste-events">`ste-events`</a>|Events that are modeled after .Net with a `sender` and `argument`. If you use typescript, you can leverage the support for generics and get strongly typed code.|
|<a href="https://www.npmjs.com/package/ste-simple-events">`ste-simple-events`</a>|A simpler version of the `ste-event`-event. No sender, just an argument.|
|<a href="https://www.npmjs.com/package/ste-signals">`ste-signals`</a>|A signal is even simpler, it is just a callback for when you need to be alerted without any scope.|
|<a href="https://www.npmjs.com/package/strongly-typed-events">`strongly-typed-events`</a>|This package includes everything.|
|<a href="https://www.npmjs.com/package/ste-browser">`ste-browser`</a>|Helps to host events in the browser.|
<br/>

## Maintenance
This project is maintained by <a href="https://keestalkstech.com/">Kees C. Bakker</a>.