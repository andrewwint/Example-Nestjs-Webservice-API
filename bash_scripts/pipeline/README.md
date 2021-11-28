# Pipeline Bash Shell Scripts

## Description

Set of bash shell scripts to pass xml files to a web service to be processed by the Java and Mysql Backend

## Stack List

- `staging`
- `dev-test`
- `dev`
- `acn-app-1`

## Batch XML file import

### Installation

- Place `batchimportxml.sh` and `base64xmls.sh` relative to the xml folder
- If needed change file permissons `chmod 775 batchimportxml.sh base64xmls.sh`

### Usage

`batchimport` takes 3 parameters

- **Platform Version Number**: example `4.3.2`
- **Target Server** example `dev-test`, `staging`, etc...
- **Delete XML Flag** options includes [`client`, `game`, `subgame` ]

### Basic Examples:

```
./batchimportxml.sh 4.3.2 dev-test client

/usr/bin/bash batchimportxml.sh 4.3.2 dev-test client

sh batchimportxml.sh 4.3.2 dev-test client
```

### Delete XML Examples:

```
./batchimportxml.sh 4.3.2 dev-test client

/usr/bin/bash batchimportxml.sh 4.3.2 dev-test game

sh batchimportxml.sh 4.3.2 dev-test subgame
```

## Single XML file import

### Installation

- Place `importxml.sh` relative to the xml files
- If needed change file permissons `chmod 775 importxml.sh`

### Usage

`importxml` takes 3 parameters

- **Xml file**: example `PwCTRAADNOCUidUR_Director.xml`
- **Target Server** example `dev-test`, `staging`, etc...
- **Delete XML Flag** options includes [`client`, `game`, `subgame` ]. If you don't want to generate
  a delete XML then leave it empty.

### Basic Examples:

```
./importxml.sh PwCTRAADNOCUidUR_Director.xml dev-test

/usr/bin/bash importxml.sh app.xml dev-test

sh importxml.sh app.xml dev-test

```

### Delete Flag Added Examples:

```
./importxml.sh app.xml dev-test client

/usr/bin/bash importxml.sh app.xml dev-test game

sh importxml.sh app.xml dev-test subgame
```
