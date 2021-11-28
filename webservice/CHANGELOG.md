# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0](https://bitbucket.org/truechoicesolutions/portal-webservice/compare/@truechoice/webservice@2.0.0...@truechoice/webservice@2.1.0) (2021-06-24)


### Bug Fixes

* removed default value for deleteXml ([c4cb18d](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/c4cb18d451344943e6a49ea5f99dd3104a6e83b2))
* updated appEnv to development ([5bcdb36](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/5bcdb36f536b2cc79b0433834a15d8f107f445c8))
* updated functions to use getClientNameSaveFileToTmp ([115c411](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/115c4111b83283e809be04939b6043ac545bfda1))
* updated String type to string ([008536f](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/008536f9b65fba5d2a0fc41b776047233293bc5b))
* updated variable type ([21bc54a](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/21bc54a5da43b1ffd30e8c19d5eb37c0beeb5248))


### Code Refactoring

* **webservice:** using the APP_ENV env varible to switch db connection uri ([66e81e2](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/66e81e28ccc84f33845865274427b51117471e88))


### Features

* **webservice:** added status lib to ls folders running on Fargate container for /efs mount point ([b23cb13](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/b23cb13b8864c0be8b33a4f85b579b78d8ee64db))


### BREAKING CHANGES

* **webservice:** The default value for APP_ENV is local and will cause issues if not set properly





# [2.0.0](https://bitbucket.org/truechoicesolutions/portal-webservice/compare/@truechoice/webservice@1.1.0...@truechoice/webservice@2.0.0) (2020-12-18)


### Bug Fixes

* **webservice-stacks:** fixed unhandled promise issue and unknown top level operator $__ warning ([26b3bbf](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/26b3bbf55893015a202b2525f6bed2b7f19ffc5f))





# 1.0.0 (2020-07-22)


### Bug Fixes

* change server to server.name ([23b5963](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/23b5963583c4d21ed1bfe0f869f30211e4fba479))
* **@truechoice/artifact-content-store:** fixed type issue in schema ([d1e08de](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/d1e08de4396d6ea582b49254de1d9fbb220077ae))
* change type declaration of server interface from String to string ([4db1160](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/4db11605c8049801fb5d21eefffcd336a8827977))
* correct name passed in to notification model ([0989aa7](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/0989aa7c309867e5a5f0723e76253b022605990b))
* modify import of notification to reference local module ([bbf4184](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/bbf4184db79b20bbafa8c8614a43e5ba22065dce))
* **notification:** replace username with user full name in service ([f2709b8](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/f2709b8e78f3d48fb0bdc3634ec0280638a217d3))
* modify path to install script on server ([d689da8](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/d689da8baa39a54074f5f347d72fe3c3f13fb70d))
* remove extra [@module](https://bitbucket.org/module) declaration and add exports ([830b606](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/830b6061940450ae743a9f7fd1f603a1f5c58f4a))
* replace command with commandId to getCommandOutput ([8e8236e](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/8e8236e9506d6a5a71414e8ab86381edba4089cd))
* update command with absolute path of install.sh ([f4798c5](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/f4798c560aca448af9de8d86528d172195384029))


### Features

* add api tag decorators ([8edeb43](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/8edeb4350e0a6e1d10b0a785d23b1d54eac78f3d))
* add creation date to notification schema ([0f69acb](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/0f69acbb2a2427dd1b92de92f631a6bd60436d17))
* add get region to installApplicationByStackName ([28f160c](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/28f160c933203a81cd8c399f7f4bc1ef9862658c))
* add logger to service ([5d8e53e](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/5d8e53e3f9f129193c0721cb852d39502005643d))
* add method to execute ssm command, check status and return output ([0182824](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/0182824e6960fcaa20e3c944075d03dce18111ea))
* add notification integration into xml import ([71f7af7](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/71f7af7386427bced2b2441800a1fbff34a0142d))
* add notification interface ([885ce98](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/885ce98535a99c6424c173859dbfdfec336f5b6f))
* add notification module ([b7e6b59](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/b7e6b59f10f28501e38bce9ffbd1ecd85b39577f))
* add notification module to app module ([a4f518b](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/a4f518b4ac280971dea1c4c2e91abee9b44089a1))
* add notification service & schema ([09dd6f0](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/09dd6f05825144004c5a903253ddd4120de9c511))
* add notification service to server operations ([b501cc9](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/b501cc94db130a99e56b72ebb60713709d930c5e))
* add notification service to server operations ([a445b5f](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/a445b5f5284001592b5e1da38dafdffd95692a8c))
* add pusher pub sub into create notification ([e32ebcb](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/e32ebcbaf7c03c225f604923f0552ab30e45e6c7))
* add readonly prop to constructor ([819ad26](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/819ad268340463529866d71d427c44adb637faa5))
* add region field as parameter to installApplicationByInstanceId ([6bcd6c6](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/6bcd6c65931edafa13324f4f60e825db72bd05ab))
* added crud for content store ([cf4b462](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/cf4b4622cc70ab4041437d536f96a854edab217d))
* artifact content store feature ([a3931f6](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/a3931f695b9722080708814cea0db04971cde862))
* change POST to GET for ssm controller ([e60260f](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/e60260fd886a4606d5798ecc4a7ae16dde000efb))
* create ssm controller to test api ([f24dbb0](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/f24dbb04b86eed2eff40ccb5227c992c94e7aad3))
* init commit of notification controller ([9f995c6](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/9f995c6bb48449eb6fda64c177ab755d9fd85d98))
* init commit of ssm library ([3904b29](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/3904b2977f47e0863cb9e4ae12da8292dc6124cd))
* modifying schema keys ([fa58c51](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/fa58c5116f3fc35fb3ea4f3aea0f4dce0b15971c))
* overwrite changes made by merge with master ([fc861b5](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/fc861b509c7273a6fec4415110b61dd3c059513b))
* remove references to sshConnection ([1dd0553](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/1dd05535f9b5e064309e83495128bffd63f2e319))
* replace exec_sync ssh call with ssm.executeCommandOnServer ([44789b4](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/44789b4c99a39394ffee8dd5e95f8e7c3aba1203))
* started artifact service ([5c6131f](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/5c6131fed58294fc162830c8301cced3c95d06d2))
* **@truechoice/access-token-expiration-check:** component for renewing authTokens when expired ([1cae5eb](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/1cae5eba36efa4fe2570d8bab44978f952370343))
* **@truechoice/auth:** added generation of JWT access and refresh for a valid user ([6827887](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/682788700d819d28ec0741bed13ce28f86b1e574))
* **@truechoice/auth:** added guards and strageties for jwt and local (server to server) access ([5973944](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/59739443cebcb7bd6fe90e5f6a200f657af93c3b))
* **@truechoice/auth:** incorperated UserModule into AuthModule and added apikey or password login ([bac5f21](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/bac5f21214d38e772475cfdbc5a3b3d57134c9a3))
* **@truechoice/auth:** initial build of the authentication service ([4843da9](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/4843da9d7c2f4edfe0840bfbe8016d97298fcd13))
* **@truechoice/auth:** seperated local and jwt functionality into different controller files ([2e6e455](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/2e6e45514fdbcf419da59f70d7c024da6f8ac481))
* **@truechoice/auth-service:** add user's full name as apart for accessToken ([9868fff](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/9868fffa317bf37980c0fc37d98ce556140e2b5b))
* **@truechoice/portal-access-token-expiration-check:** implemented refresh tokens and users state ([ccf124d](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/ccf124d7ab4734481bb257fad07e392fd7af2aa7))
* **@truechoice/portal-auth:** added useContext hook for user and roles management ([3b7f246](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/3b7f246c85e61bdf420508c60841f7d329f9bfc8))
* **@truechoice/portal-examples:** example page, component, and sub-components for role-based access ([0f7afc5](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/0f7afc5f53b4fb5566a0cb0ad9ed1480e36aaea2))
* **@truechoice/portal-examples:** example protected page and components using auth system ([9f366f7](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/9f366f7ae684b9f4b6c686162fe26b0763fc689e))
* **@truechoice/portal-login:** added login page with username and password UI ([6f9ea39](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/6f9ea3933674560fc92d32b913f2bb3e4cdde398))
* **@truechoice/portal-login:** intergrated portal 2.0 login UI with API auth/jwt login webservice ([452623d](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/452623d25efceb64b6d74b0d5705e53a468448f6))
* **@truechoice/portal-server:** intergrated install UI to api call ([fc3a231](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/fc3a231c1b7be5b7a10244757e93dfdec517c481))
* **@truechoice/portal-servers:** added server size to describe and server listing portal UI ([736a83b](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/736a83bdf57b93eb5b97d3235ab0cf24fd4ba1ec))
* **@truechoice/portal-servers:** discover servers by stackname ([81a3e79](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/81a3e792f673cb11405fbd2f4fefe4eab2b14cc3))
* **@truechoice/portal-servers:** page to list all servers and stacks ([9b4c163](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/9b4c163f70da40b7597f8afdc9618849c5b67bb2))
* **@truechoice/portal-servers:** update and add server short name/alias while ensuring uniqueness ([66ffe59](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/66ffe59ff37f498f35a9a0bbfbb52c5e85ce1c84))
* **@truechoice/portal-user:** completed change password and generate new api-key ([d997d36](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/d997d36e8d2bf0c7b6a692176c9a215ef9dbfa58))
* **@truechoice/portal-user:** see all users and edit their accout detail using react-hook-from!! ([f9151f5](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/f9151f5de6436562a369e0a28bc968a3a7a00bd6))
* **@truechoice/portal-user:** user manager UI to edit a user account ([bc35b6b](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/bc35b6b604c0717366fb4e4cd7845b29d1090d7e))
* **@truechoice/user:** added feature to create a new users along with basic unit tests ([2e3ef59](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/2e3ef59ce3e3645812043837b085bf779329ad18))
* **@truechoice/users:** added last logged in timestamp and user account update ([6f3d884](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/6f3d88454bb9a2dc3fcd03302138ec6aafadfbcb))
* **@truechoice/users:** added new feature and fix failed tests ([3c6874a](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/3c6874a42e60b2120ad9ed3c6b43ceb42179548c))
* **@truechoice/users:** added password hashing and error handling for duplicate usernames ([3a2dd70](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/3a2dd703daff49ba4d3da471521bfc88d8673fcb))
* **@truechoice/users:** added username and password-salt validation ([582c9dd](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/582c9dd6e16f0f65b255d829889f7ff1ecdfce26))
* **@truechoice/webservice-auth:** added JWT role-base authorization ([092e718](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/092e718bd0415fac7cc8b8c98319e29293236e1c))
* **@truechoice/webservice-user:** endpoints for user delete, update password, new/update api-key ([5a3b9ff](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/5a3b9ffac46ace49897629a8141b02f8cad239ff))
* **server:** add notification service to installApplicationByInstanceId ([636590c](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/636590c12ea9bb86597e1f0d1adc68b382adeed3))
* **server:** update delete server methods to check if result exists ([62d5074](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/62d5074ffc5465266ac45280e075e908dc481a4f))
* started content store feature ([e1ae1ba](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/e1ae1bac2859aa2b69f61567e645940db01640fd))
* update notification service to read user from request object if it exists ([def418f](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/def418f62e53ae4c8e73615e4a6aa6a8cb04746e))
* update to reject if the status of the ssm command is failed ([fa81123](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/fa811239e33fc5b25b4f3f23691a6b9d2c7306a4))
* update user from test to anonymous ([6792f30](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/6792f303dabec18553b214b627a14eb11e5237f3))


### Performance Improvements

* **@truechoice/example-get-request:** optized request to use try catch and better error handling ([77e91b4](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/77e91b4c02db134d0cfb0427115b03f90e44f4d9))
* **@truechoice/portal-auth:** retry feature on XMLHttpRequest(s) in the accessToken has expired ([edb7acc](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/edb7accc3d816f45d2e113beb2aafc9142fa4fb7))


### Reverts

* Revert "Revert "Merge branch 'master' of https://bitbucket.org/truechoicesolutions/portal-webservice into feature/activity-notifications"" ([51149cb](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/51149cb80bbd62af5d981784c841856968da71c4))
