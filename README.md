<a href="https://opensource.newrelic.com/oss-category/#new-relic-experimental"><picture><source media="(prefers-color-scheme: dark)" srcset="https://github.com/newrelic/opensource-website/raw/main/src/images/categories/dark/Experimental.png"><source media="(prefers-color-scheme: light)" srcset="https://github.com/newrelic/opensource-website/raw/main/src/images/categories/Experimental.png"><img alt="New Relic Open Source experimental project banner." src="https://github.com/newrelic/opensource-website/raw/main/src/images/categories/Experimental.png"></picture></a>

# Logging Integrations Testing Library

This repo contains some common code that was originally used in multiple repositories used by the Logging Integrations team. We've extracted it for ease of keeping updates synchronized. We've also added docstrings to the exported functions.

## Installation

This is a standard npm package and can be directly `npm install`ed.

## Usage

This library exports several modules. Here's how to use them

### requireEnvironmentVariable

This function is used to require an environment variable and throws if it is not set

```js
const { requireEnvironmentVariable } = require('logging-integrations-test-lib');

const VAR_1 = requireEnvironmentVariable('ENV_VAR_1');
```

### nrdb

This module provides functionality that allows one to check for Logs using an NRDB query.

### logger

This module provides a (winston)[] logger in a standardized format.

### testUtils

This module provides some utility functions used in tests. Check the individual functions for explanations

### timeUtils

#### sleep

Accepts milliseconds, returns a promise.

```js
await sleep(1000); // waits for 1 second
```

#### currentTimeAsIso8601

Returns the current time in the form of an ISO string

## Contributing
We encourage your contributions to improve [project name]! Keep in mind when you submit your pull request, you'll need to sign the CLA via the click-through using CLA-Assistant. You only have to sign the CLA one time per project.
If you have any questions, or to execute our corporate CLA, required if your contribution is on behalf of a company,  please drop us an email at opensource@newrelic.com.

**A note about vulnerabilities**

As noted in our [security policy](../../security/policy), New Relic is committed to the privacy and security of our customers and their data. We believe that providing coordinated disclosure by security researchers and engaging with the security community are important means to achieve our security goals.

If you believe you have found a security vulnerability in this project or any of New Relic's products or websites, we welcome and greatly appreciate you reporting it to New Relic through [HackerOne](https://hackerone.com/newrelic).

## License
Logging Integrations Testing Library is licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License.
