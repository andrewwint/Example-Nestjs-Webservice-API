# Debain Linux Packages

## Description

This project is for managing the application distritubtion for Linux machines. For more detials on how to create Debian Linux package go to [Debian Linux Packages](https://wiki.debian.org/HowToPackageForDebian)

### Packages

#### XML Import Library

Package Includes:

- Database Clear Cache `clearcache.sh`
- Delete XML Generator `delete.xml.sh`

##### Installing `xmlloaderlib-ubuntu`

```shell
> wget https://[your s3 bucket].s3.amazonaws.com/xmlloaderlib-ubuntu_1.0-6.deb
> sudo apt install ./xmlloaderlib-ubuntu_1.0-6.deb
```

_The `postinst`/post install checks for `/home/ubuntu/execute.sh` and sets file permissons where needed_

##### Verify Installation `xmlloaderlib-ubuntu`

```shell
> apt search xmlloaderlib-ubuntu
```

##### Removing `xmlloaderlib-ubuntu`

```shell
> sudo apt remove xmlloaderlib-ubuntu
```
