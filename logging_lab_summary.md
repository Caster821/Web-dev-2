
# Logging Lab Summary

## Why Logging Matters

- Logging is essential in backend systems for monitoring, debugging, and tracking application behavior.
- Helps identify issues in production and development environments.
- Useful for audits, performance analysis, and ensuring system reliability.

## Logging Levels

| Level  | Description |
|--------|-------------|
| DEBUG  | Detailed information, used for debugging during development. |
| INFO   | General information about application events (e.g., startup, shutdown, user actions). |
| WARN   | Indicates potential problems or unusual situations that aren't immediately critical. |
| ERROR  | Represents significant problems that require attention. |
| FATAL  | Severe issues that may cause the application to terminate. |

## Console Logging (Part 1)

### Observations

- `console.log` and `console.info` were used for normal operations and process updates.
- `console.warn` highlighted unusually large quantities.
- `console.error` flagged invalid prices and simulated critical failures.
- `console.debug` attempted to print a development message (not shown by default in most environments).

### Limitations of Console Logging

- No structured format or timestamps.
- Hard to filter logs based on severity.
- Logs are not persisted to files or external systems.
- Limited customization and configuration options.

## Winston Logging (Part 2)

### Improvements with Winston

- Logs included timestamps, structured JSON format, and support for multiple levels.
- Logs were written to both the console and log files (`combined.log` and `error.log`).
- Able to filter logs and include error stack traces.

### Observations

- With default level set to `info`, debug messages were not shown.
- Changing level to `debug` displayed all messages.
- Different formats like `simple` or `cli` provided readable outputs for local dev.
- Conceptually explored logging to external services (e.g., Papertrail, Loggly) using additional transports.

## Deliverables Summary

- Console logs were plain and mixed together, making them harder to parse.
- Winston logs were neatly formatted (JSON), timestamped, and separated by severity.
- `error.log` only captured errors, while `combined.log` captured all logs.
- Changing Winston's logging level to `debug` revealed more detailed messages.
- Different Winston formats (`cli`, `simple`) offered tailored outputs for development readability.

