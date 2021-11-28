# Portal Webservice

## Description

This is an Lerna [independant](https://github.com/lerna/lerna/tree/master/commands/init#--independent) managed monorepository along with `commitizen`

## Usage

### Getting Started

`npm install --global lerna`

#### Installing Dependencies

`lerna bootstrap --hoist --nohoist=webpack*`

#### Uninstalling/Clean node_module Directory

`lerna clean`

Bootstrap the packages in the current Lerna repo. Installs all of their dependencies and links any cross-dependencies.

### Basic Usage

#### Listing Packages

View all packages versions and type `lerna ls -al`

Dependency graph `lerna ls -al --graph`

#### Conventional Commits

All commits in this project must conform to [Conventional Commits](https://conventionalcommits.org) Guide lines using commitizen

`npm install -g commitizen`

```shell
> git add .
> git cz
> git push
```

### Tag Creation/Cutting

To create `git tag` for a release and generate `CHANGELOG.md` from commits run the following `lerna` command

```shell
> lerna version major --conventional-commits
```

## Portal

React.js frontend for interacting with Webservice

### Portal Technologies

- [React 16](https://reactjs.org/docs/getting-started.html)
- [Boostrap 4](https://react-bootstrap.github.io/getting-started/why-react-bootstrap/)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- Sass

[Portal README](portal/)

## Webservice

Node.js API webservice for internally managing client experiences

### Web Service Technologies

- [Nest.js](https://docs.nestjs.com/)
- [Typescript](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- [Mongodb](https://www.mongodb.com/)
- [Mongoose ORM](https://mongoosejs.com/)
- [xmlbuilder-js](https://github.com/oozcitak/xmlbuilder-js/wiki)
- [Express for API Resources](https://bitbucket.org/truechoicesolutions/portal-webservice/wiki/API%20Endpoint%20Naming)

[Webservice README](webservice/)

```

```
