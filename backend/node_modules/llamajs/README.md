# Llama Logger

Llama is aspiring to be a dynamic logger that will be suitable for most javascript and typescript developers.

## Features

- Custom log messages - Log messages are user defined so each message can contain whatever properties the user chooses
- Outputs - Each logger can have several different outputs, where output is the destination of the log message (Console, File, RabbitMQ etc.)
- Formats - Different formats can be assigned to each output. A format is the structure of the message (csv, json, etc.)
- Severity Levels - Each logger instance can have different severity levels, and each output can accept different severity levels as well. Severity levels are the "importance classifier" of each message (Info, alert, fatal, warning, etc.). Every message has to have a severity level.
- Custom Severity levels - Users can define their own severity levels and assign them to the wanted logger.

## Formats

Formats are the structure of the log message.

The defined formats are:

1. `JSON Format` - The message will be structured as JSON.
2. `Line Format` - The message will be outputed as a single line of text, formated by the specified rowDelimiter and columnDelimiter. Default values match the _CSV Format_
3. `CSV Format` - A line format with a csv config (rowDelimiter of new-line and column delimiter of ',')

## Transports

Transports are the outputs of the logger.

Each transport needs to be defined with a **format** and accepted **severity levels**:

- The accepted severity levels are a list of severity levels the logger will be able to accept and log.

  - If the message's severity level is not specified in the transport's accepted severity levels, the message will not be logged.
  - The severity levels have to be of the same type as the logger's severity levels.

There are several transport types:

1. Console Transport (The default one) - will output the logs to the console (console.log).
2. RabbitMQ transport - will send the logs to an amqp broker.
3. File Transport - will output the logs into a specific file.

Each logger can be defined with multiple transports, even several transport of the same type.

This can be used for the following cases:

- Defining different transports for different severity levels.
- Saving logs in multiple locations.
- Having a backup location for logs if one of the transports is inaccessible.

## Usage

In order to defined a logger you will need to provide a config for it.
If no config is provided, a default config, with a ConsoleTransport and LineFormat will be used.

In the following example, no config is provided to the logger, therefore, the default config is being used.

```typescript
import * as llama from "llamajs";

const logger: llama.Logger = new llama.Logger();

logger.log({
  severity: llama.syslogSeverityLevels.Informational,
  name: "Test Message"
});
```

Output in console:

```
Test Message,INFO
```

The next example shows a Logger instance with a provided config

```typescript
import * as llama from "llamajs";

// Setting a config for the transport that will define:
// * The format that the transport will use.
// * The severity levels that the transport will "accept"
const consoleTransportConfig: llama.TransportConfig = {
  format: new llama.JsonFormat(),
  levels: [llama.syslogSeverityLevels.Informational]
};

// Defining a transport to use.
// The console transport will output the logs into the console (console.log).
const transport: llama.ConsoleTransport = new llama.ConsoleTransport(
  consoleTransportConfig
);

// Defining the logger config.
// The config will define the severity levels that the logger wil accept and a list of transports to use.
const config: llama.LoggerConfig = {
  levels: llama.syslogSeverityLevels,
  transports: [transport]
};

const logger: llama.Logger = new llama.Logger(config);

logger.log({
  severity: llama.syslogSeverityLevels.Informational,
  name: "Test Message"
});
```

Output in console:

```
{"name":"Test Message","severity":"INFO"}
```

This configuration will define a console transport with a JSON format that will only accept the `Informational` syslog severity level.
The logger will be initiated with this transport and the `syslogSeverityLevels`.

When the log function is called, it sends the specified message to the console transport. Because the message contains a severity level that the transport is set to accept, it will print it to the console.

### RabbitMQ Transport Example

```typescript
import * as llama from "llamajs";
import {
  JsonFormat,
  RabbitMqTransport,
  LoggerConfig,
  syslogSeverityLevels
} from "llamajs";

const transport: RabbitMqTransport = new RabbitMqTransport({
  username: "guest",
  password: "guest",
  exchange: {
    name: "application-logger",
    type: "topic"
  },
  format: new JsonFormat(),
  host: "localhost",
  levels: Object.values(llama.syslogSeverityLevels),
  persistent: true,
  port: 5672
});

const config: LoggerConfig = {
  levels: syslogSeverityLevels,
  transports: [transport]
};

const logger: llama.Logger = new llama.Logger(config);
logger.init().then(res => {
  logger.log(
    {
      severity: syslogSeverityLevels.Informational,
      name: "Test Message"
    },
    { routingKey: `testService.log.info` }
  );
});
```

### Using multiple transports

```typescript
import * as llama from "llamajs";
import {
  JsonFormat,
  RabbitMqTransport,
  LoggerConfig,
  syslogSeverityLevels,
  ConsoleTransport,
  LineFormat,
  CsvFormat
} from "llamajs";

const rabbitMqTransport: RabbitMqTransport = new RabbitMqTransport({
  username: "guest",
  password: "guest",
  exchange: {
    name: "application-logger",
    type: "topic"
  },
  format: new JsonFormat(),
  host: "localhost",
  levels: Object.values(llama.syslogSeverityLevels),
  persistent: true,
  port: 5672
});

const consoleTransport: ConsoleTransport = new ConsoleTransport({
  format: new CsvFormat(),
  levels: [syslogSeverityLevels.Debug]
});

const config: LoggerConfig = {
  levels: syslogSeverityLevels,
  transports: [rabbitMqTransport, consoleTransport]
};

const logger: llama.Logger = new llama.Logger(config);
logger.init().then(res => {
  logger.log(
    {
      severity: syslogSeverityLevels.Debug,
      name: "Test Message"
    },
    { routingKey: `testService.log.debug` }
  );
});
```
