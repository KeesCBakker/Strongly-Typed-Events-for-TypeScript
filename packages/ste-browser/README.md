# Strongly Typed Events - Browser
Why not use Strongly Typed Events in your browser? We got a special package for
you that already contains all the files you need. You can even serve them from
a CDN for extra speed (or easy prototyping).

[![Build Status](https://travis-ci.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript.svg?branch=master)](https://travis-ci.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript)
[![npm version](https://badge.fury.io/js/ste-browser.svg)](https://badge.fury.io/js/ste-core)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Usage
The package contains the following scripts:

- Events that are modeled after .Net with a `sender` and `argument`. 
    - dist/ste-events.js
    - dist/ste-events.min.js
    - dist/ste-events.min.js.map
- A simpler version of the `ste-event`-event. No sender, just an argument.
    - dist/ste-simple-events.js
    - dist/ste-simple-events.min.js
    - dist/ste-simple-events.min.js.map
- A signal is even simpler, it is just a callback for when you need to be alerted without any scope.
    - dist/ste-signals.js
    - dist/ste-signals.min.js
    - dist/ste-signals.min.js.map
- All objects to build and use events:
    - dist/strongly-typed-events.js
    - dist/strongly-typed-events.min.js
    - dist/strongly-typed-events.min.js.map
- Want to build your own style of events? You can use the dispatcher and other base classes for our core project:
    - dist/ste-core.js
    - dist/ste-core.min.js
    - dist/ste-core.min.js.map

## CDN
You want to use a CDN? Great!

|What|Link|
|----|----|
|All event types|https://cdn.jsdelivr.net/npm/ste-browser/dist/strongly-typed-events.min.js|
|Events|https://cdn.jsdelivr.net/npm/ste-browser/dist/strongly-typed-events.min.js|
|Simple Events|https://cdn.jsdelivr.net/npm/ste-browser/dist/strongly-typed-events.min.js|
|Signals|https://cdn.jsdelivr.net/npm/ste-browser/dist/strongly-typed-events.min.js|
|Core|https://cdn.jsdelivr.net/npm/ste-browser/dist/strongly-typed-events.min.js|

Every link comes with a `.map`. If you need a specific version, just include after
`ste-browser` (like `ste-browser@1.3` will serve you version 1.3 with the latest 
patches). Like a non-minified version, just remove `.min` from the link.

## Packages
The project is seperated into multiple packages, so you only need
to include what you need. We have the following packages:

|Package|Description|
|-------|-----------|
|`ste-core`|Package that contains all the building blocks for the creation of events. The dispatcher implementation is its main hero.|
|`ste-events`|Events that are modeled after .Net with a `sender` and `argument`. If you use typescript, you can leverage the support for generics and get strongly typed code.|
|`ste-simple-events`|A simpler version of the `ste-event`-event. No sender, just an argument.|
|`ste-signals`|A signal is even simpler, it is just a callback for when you need to be alerted without any scope.|
|`strongly-typed-events`|This package all the events.|
|`ste-browsers`|Compiled JavaScript for the browser.|