# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.4.1](https://github.com/llamajs/llama/compare/v0.4.0...v0.4.1) (2021-06-23)

## [0.4.0](https://github.com/llamajs/llama/compare/v0.3.3...v0.4.0) (2021-06-23)


### ⚠ BREAKING CHANGES

* change severities from enum based to array based

* change severities from enum based to array based ([330317a](https://github.com/llamajs/llama/commit/330317aef77c736ef04138609f4cfb0c1b934d88))

### [0.3.3](https://github.com/llamajs/llama/compare/v0.3.2...v0.3.3) (2021-03-12)

### [0.3.2](https://github.com/llamajs/llama/compare/v0.3.1...v0.3.2) (2020-03-22)

### [0.3.1](https://github.com/llamajs/llama/compare/v0.3.0...v0.3.1) (2020-03-19)

## [0.3.0](https://github.com/llamajs/llama/compare/v0.2.1...v0.3.0) (2020-03-19)


### ⚠ BREAKING CHANGES

* **RabbitMQ Transport:** change rabbitMQ config to support all features of amqp exchange, furthermore, change name and type of exchange location in config

* **RabbitMQ Transport:** change config format ([26d3712](https://github.com/llamajs/llama/commit/26d3712bfe478d8d6b97d22ac6b04d6b28161236))

### [0.2.1](https://github.com/llamajs/llama/compare/v0.2.0...v0.2.1) (2020-03-19)


### Features

* add default transport ([1083bad](https://github.com/llamajs/llama/commit/1083bad3c6667741d45793aff9d23d4c7e642a7a))

<a name="0.2.0"></a>
# [0.2.0](https://github.com/llamajs/llama/compare/v0.1.0...v0.2.0) (2018-09-04)


### Bug Fixes

* Add new severity type to transport config ([d2f2418](https://github.com/llamajs/llama/commit/d2f2418))
* Change severity from string to SeverityLevel type ([4cc09b6](https://github.com/llamajs/llama/commit/4cc09b6))


### Features

* **Severity levels:** Add syslog and ibm tivolid severity levels ([2bafad2](https://github.com/llamajs/llama/commit/2bafad2))



<a name="0.1.0"></a>
# 0.1.0 (2018-08-30)


### Features

* **Formats:** Add CsvFormat ([21e9e16](https://github.com/llamajs/llama/commit/21e9e16))
* **Formats:** Add JsonFormat and LineFormat for default formats ([2109be3](https://github.com/llamajs/llama/commit/2109be3))
* **Logger:** Add close() function ([2c15b8b](https://github.com/llamajs/llama/commit/2c15b8b))
* **Logger Configs:** Add default logger config ([a3bde26](https://github.com/llamajs/llama/commit/a3bde26))
* **Severities:** Add 2 default severity types, syslog and default ([5950a2b](https://github.com/llamajs/llama/commit/5950a2b))
* **Transports:** Add console transport ([07c83fe](https://github.com/llamajs/llama/commit/07c83fe))
* **Transports:** Add default transport config and rabbitMQ config ([cd6cda2](https://github.com/llamajs/llama/commit/cd6cda2))
* **Transports:** Add file transport ([4f4bf1a](https://github.com/llamajs/llama/commit/4f4bf1a))
* **Transports:** Add new line option to fileTransport ([28dbfad](https://github.com/llamajs/llama/commit/28dbfad))
* **Transports:** Add rabbitMQ transport ([ff6a206](https://github.com/llamajs/llama/commit/ff6a206))
