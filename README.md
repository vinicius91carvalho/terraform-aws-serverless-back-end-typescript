# customer API

## What is this repository for? ###

This API allows to create, update, delete and list customers. It allows search customers by list API using search query param.

## APIs built

1. [Save customer](./requirements/save-customer.md)
2. [Load customer by id](./requirements/load-customer-by-id.md)
3. [List customers](./requirements/list-customers.md)
4. [Delete customer by id](./requirements/delete-customer-by-id.md)
4. [Search customers](./requirements/search-customers.md)

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
npm run debug
```

### How to debug? You can use Docker instructions above too.

```bash
npm run debug
```

After the command above was executed, you need to run "Attach to Node" debug configuration

### How to run tests? (You can see more test scripts on package.json)

```bash
npm install
npm run test:ci
```

## How can I get the tokens from API using AWS CLI?

```bash
aws cognito-idp admin-initiate-auth --cli-input-json file://creds.json
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