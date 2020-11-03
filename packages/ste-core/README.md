# Strongly Typed Events - Core
Core package for the Strongly Typed Events projects. This
project adds events to your projecs. Because events can have
multiple flavours, we've created multiple packages.

[![Build Status](https://travis-ci.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript.svg?branch=master)](https://travis-ci.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript)
[![npm version](https://badge.fury.io/js/ste-core.svg)](https://badge.fury.io/js/ste-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Packages
The project is seperated into multiple packages, so you only need
to include what you need. We have the following packages:

|Package|Description|
|-------|-----------|
|`ste-core`|Package that contains all the building blocks for the creation of events. The dispatcher implementation is its main hero.|
|`ste-events`|Events that are modeled after .Net with a `sender` and `argument`. If you use typescript, you can leverage the support for generics and get strongly typed code.|
|`ste-simple-events`|A simpler version of the `ste-event`-event. No sender, just an argument.|
|`ste-signals`|A signal is even simpler, it is just a callback for when you need to be alerted without any scope.|
|`strongly-typed-events`|This package includes everything.|

## Maintenance
This project is maintained by <a href="https://keestalkstech.com/">Kees C. Bakker</a>.