# Consumer API

## What is this repository for? ###

This API allows to create, update, delete and list consumers. It allows search consumers by list API using search query param.

## APIs built

1. [Save consumer](./requirements/save-consumer.md)
2. [Load consumer by id](./requirements/load-consumer-by-id.md)
3. [List consumers](./requirements/list-consumers.md)
4. [Delete consumer by id](./requirements/delete-consumer-by-id.md)

## How do I get set up? ###

### How to run using docker?

Obs: You need to install Docker and Docker Compose

```bash
docker-compose up
```

or (You need to install Node.js LTS version)

```bash
npm run up
```
** Use `docker-compose down` or `npm run down` to stop the containers

### How to run using local machine?

```bash
npm install
npm run build:start
```

### How to debug? You can use Docker instructions above too.

```bash
npm run debug
```

### How to run tests? (You can see more test scripts on package.json)

```bash
npm install
npm run test:ci
```

## IDE

VSCode (https://code.visualstudio.com/)

### Plugins

ESLint (dbaeumer.vscode-eslint)

## Methodologies and Designs

* TDD
* Clean Architecture
* Conventional Commits
* GitFlow
* Use Cases

## Principles

* Single Responsibility Principle (SRP)
* Open Closed Principle (OCP)
* Liskov Substitution Principle (LSP)
* Interface Segregation Principle (ISP)
* Dependency Inversion Principle (DIP)
* Separation of Concerns (SOC)
* Don't Repeat Yourself (DRY)
* You Aren't Gonna Need It (YAGNI)
* Keep It Simple, Silly (KISS)
* Composition Over Inheritance
* Small Commits

## Who do I talk to? ###

Send an e-mail to **vinicius91carvalho@gmail.com**