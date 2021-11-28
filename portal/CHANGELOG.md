# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.1.0](https://bitbucket.org/truechoicesolutions/portal-webservice/compare/@truechoice/portal@1.0.0...@truechoice/portal@1.1.0) (2021-06-24)


### Bug Fixes

* fixed switch bug ([185cb91](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/185cb91d00ca3306e495482d185985dce75aa9ba))





# [1.0.0](https://bitbucket.org/truechoicesolutions/portal-webservice/compare/@truechoice/portal@1.0.0-alpha.0...@truechoice/portal@1.0.0) (2020-12-18)


### Features

* **portal:** changed some content ([b5a7c6c](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/b5a7c6c20de14efac62dff85ac1c9c375130971f))





# 0.0.0 (2020-07-22)


### Bug Fixes

* added reset loading state properties to catch block in main handler ([6c1af5f](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/6c1af5ff8d03f61a78ba5dcbbb8d2e96d3140144))
* added text-truncate class to the file name element, which was overflowing and going over progress bar ([74eb341](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/74eb341adb0d10ae47f02627aba23ef08f6e60a3))
* fix merge conflicts ([76b6fbb](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/76b6fbb12c5deed261e110cf1250d7d75eff201d))
* update prop names in svg icon to remove warnings ([d1059c3](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/d1059c3f55fe98ed68a31eb5a6eb4e6b955b62ed))
* updated API to reference file object on line 108 ([7f8a769](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/7f8a769072cfb8154da7b9bc35867c9da3ef0cc9))
* updated code to vertically align the content within the rows that contain the xml files to be uploaded ([d8a2c4a](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/d8a2c4a7ad0209e0ddaf873a66ed14dfe4705516))
* updated event handler for when a user selects an xml file; previously hitting cancel would cause type error, given that hitting cancel means file object is undefined ([edaa22c](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/edaa22c2c520e6cbd69b00d46d18c3ea04a485e5))
* updated form to only accept xml files ([cc1bc57](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/cc1bc57456fb251e3e7c984207239049af928954))
* updated new button, for removing xml, to be small ([481c515](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/481c515359b6c5695022b83b96f8c32a56a773b4))
* updated removeXml to correctly compare files ([9aaed4e](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/9aaed4eba563488d00626a5370dc0794acdd4d43))
* updated switch's id and name to actually be unique ([cb079e5](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/cb079e5c9c5bab5e84846a7a59495200b0d1c18e))
* updated the default value for this.state.targetServer; it was causing a bug when it was an empty string, meanwhile, the default value in UI was not empty ([ed28845](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/ed2884521b698cb9f78c387e7fbac98616269df1))
* **activity:** adjust number of displayed notifications to handle any applied filters ([a06de35](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/a06de35bd1a9862d8b492daa63a32fa6d5fe1760))
* **activity:** correct calculation of displayed notifications ([a52db92](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/a52db92669db7d0961783a2d1ef8ea60f5a3a652))
* updated when navbar is expanded from collapsed to be on large devices as opposed to md, since the layout was breaking given the amount of links ([0999812](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/0999812fc8c2b4040baa09d5b44e5723a1fc1faa))


### Features

* add activity page to navigation ([66c383c](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/66c383cb6e1e2f3c5925b1e883102978826bc822))
* add badge to display notification type ([36b4d75](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/36b4d7529c19da8312e8463a272f02f8068a4428))
* add filter form component ([1db19a3](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/1db19a38cd51723e2ce499aa620cba96322e44fa))
* add notification pop up with pusher pub/sub api ([1cc5f5d](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/1cc5f5d1a8d399b95ed83fbe68d055642991168b))
* added accept attribute to xmlFile input in order to restrict input to just xml ([2c62a1e](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/2c62a1e59598f75476fedf40c0599631e81e06dd))
* added activity feed page ([6956d43](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/6956d431e93dd6f62af7cbdcf3ae9af0f36ec53d))
* added code that adds a margin-top to the remove-all button ([87cda32](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/87cda3239741d468bbd565f1df044a1af53de23e))
* added code that updates the selector for the background of the button ([bd39e08](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/bd39e08965a20635c05e1748350368a098a85f4a))
* added code to support overflow-x scroll whenever the result is a failure, given the long error messages ([ce5dacd](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/ce5dacd26029ba9b5558d1d9930bb3876e447ec8))
* added code to support the toast, which contains the success/error message from uploading ([5f268ec](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/5f268ec6111cd4bc75df3a563c47a28c21f3d3ba))
* added controlId attributes to the Form.Group for accessibility consistency ([154e7cd](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/154e7cdaa4428f037d341eeafc58663f653121af))
* added declaration block for submit button ([07f8d16](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/07f8d1623c48ae979229fdb8a44fdc8b7c52de30))
* added description text below submit button to help guide users ([1efaf1a](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/1efaf1a959a1c53e475167915dcc74d7e19ca7e4))
* added functionality to reset all progress bars once all files have been uploaded ([41d1e2c](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/41d1e2c1b7e1b5519cdbf8203ed45ff83f8f136b))
* added generic xml-upload selector for containers, in order to have appropriate vertical space between components ([dff18e9](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/dff18e91da3ff8dc1cddb4451b0da90a1c03649c))
* added icons to go along with the message; red icon for failure and green for success ([507f4f9](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/507f4f9215333cafd8c2cb81ec3609942b5de781))
* added input-field-label selector to the label elements, in order to display them as block elements ([0850d2a](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/0850d2ad7fea2a96501de9e001a17e4fa39cdb43))
* added key property to the options generated within targetServerOptions variable declaration ([199632b](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/199632b4f6ec2aeaf979388d037d18592834ee6c))
* added load state for submit button ([b5ad155](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/b5ad155560d6404e3a9ca8681172d1aefc7eacd3))
* added muted text labels to two input controls, in order to mirror mockup ([52a63aa](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/52a63aa045dd7c0f4c7d6214d3c017a85d07fa26))
* added new button for removing XML; the button contains the text 'remove' and is displayed for small devices and up, while the x is still used for xs devices ([b7ffa1f](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/b7ffa1fbca9279bf69f37908a2da87f833a177d1))
* added new declaration block for the submit button container and the input field containers, which controls vertical spacing between components ([3215e5e](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/3215e5eee8d4d78d3a04c18bfa7e890302757406))
* added new declaration block, vertically-center-form-elements ([d1a5bc1](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/d1a5bc1fe896b1a03305e7d7dc61f3496f782df9))
* added new declaration blocks for delete xml button and target server input ([1a831d8](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/1a831d8022a845a991ae68e2d4244e6e20d2a0ef))
* added new page, XML Upload Feature ([c151409](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/c1514090723130a3f027d6a31cd840a82f41e0d7))
* added new selector the third form.row, in order to vertically center its contents ([bf75d84](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/bf75d8452bfd2c5cca71fbc6c9a76e20bf6ecc0c))
* added overwriting declaration blocks for the nav bar's links ([3ef57ef](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/3ef57ef19872c26f20bd7daaedd9d9f94dac4451))
* added react-icons ([6815619](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/681561929115208d1d2e859e378eae6b78d6c8e9))
* added scss file and also updated Col to be 12 in xs and 8 in md machines ([4c80739](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/4c807391475fc7d84939bebfd35af69caf5205d9))
* added selector for the input/select field ([827e8a1](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/827e8a18e7b90673e178e5a5cca4daebe29fafbc))
* added selector to the submit button ([3f9ebf2](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/3f9ebf220285fba3a2bf71b2dabab461350a4120))
* added sizes for the columns that contain the target server and delete xml input ([65f72eb](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/65f72eb13a953198e40a3bbd610a489a2efc12ee))
* added style sheet and also, update file type accepted ([ee19c8b](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/ee19c8bf723dff961ae6bbdb4482b2b4424b8ce3))
* added support for removing/appending files; this extends behavior of react-dropzone as its default behavior is not to allow either removing or appending ([5e886ed](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/5e886edcd9d8150cc9090911f1d317ee5c522368))
* added support for sending the XML file to the backend via new method, uploadXmlFile ([fb1dc28](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/fb1dc28e4fd1dc40fee254e3e722b6ff5cfe7719))
* added support for showing toasts after files upload ([50d2c9a](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/50d2c9a9d6ab185ca286450b121b63ff07b2adf3))
* added support for turning the progress bar green, for whenever an upload is successful ([07d6a78](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/07d6a78d6e16a1da829df6322fd689a31bacb7d2))
* added support for updating the progress bar associated to a specific file being uploaded ([a178465](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/a1784659786a0ee3e2cfac8e879defe704feefc6))
* added support for updating the state associated to whether or not a file will be deleted ([f80dc32](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/f80dc32dadfa412e1f1ddcd53e73ffbca7b59030))
* **@truechoice/access-token-expiration-check:** component for renewing authTokens when expired ([1cae5eb](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/1cae5eba36efa4fe2570d8bab44978f952370343))
* **@truechoice/auth-service:** add user's full name as apart for accessToken ([9868fff](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/9868fffa317bf37980c0fc37d98ce556140e2b5b))
* **@truechoice/portal-access-token-expiration-check:** implemented refresh tokens and users state ([ccf124d](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/ccf124d7ab4734481bb257fad07e392fd7af2aa7))
* **@truechoice/portal-admin:** uI for creating user accounts ([763b753](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/763b753a594d822f01aded76b6a20adf43abe207))
* **@truechoice/portal-auth:** added login, logout and role based authorization ([056d0c1](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/056d0c1647e43e3b246d938aae55c923dfd16c02))
* **@truechoice/portal-auth:** added useContext hook for user and roles management ([3b7f246](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/3b7f246c85e61bdf420508c60841f7d329f9bfc8))
* **@truechoice/portal-examples:** example page, component, and sub-components for role-based access ([0f7afc5](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/0f7afc5f53b4fb5566a0cb0ad9ed1480e36aaea2))
* **@truechoice/portal-examples:** example protected page and components using auth system ([9f366f7](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/9f366f7ae684b9f4b6c686162fe26b0763fc689e))
* **@truechoice/portal-login:** added login page with username and password UI ([6f9ea39](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/6f9ea3933674560fc92d32b913f2bb3e4cdde398))
* updated the width for the column that contains the file control to be smaller and centered and the same as submit button ([f6391b4](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/f6391b42473db052c3ca6dcd33cfcb1664ae01b6))
* **@truechoice/portal-login:** intergrated portal 2.0 login UI with API auth/jwt login webservice ([452623d](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/452623d25efceb64b6d74b0d5705e53a468448f6))
* **@truechoice/portal-server:** intergrated install UI to api call ([fc3a231](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/fc3a231c1b7be5b7a10244757e93dfdec517c481))
* added support for uploading multiple files to the server ([bb429f9](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/bb429f9d5548d881e1fd2dfcad79998cba1244be))
* added support for uploading multiple files to the server ([c8a2d03](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/c8a2d03790b70ef6982924351035de7587166f06))
* added switch to the delete xml column ([8e15880](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/8e15880ca5f25065aca4a9c6e6b5bd32d5abf23e))
* added validation for the required xml field ([80c7ff4](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/80c7ff4115fc6e4bfd64f11b221cf42f7f1fabb7))
* convert date into human readable format ([e80595a](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/e80595aa2783875a27ad7ae76405bb5622d24458))
* create notification class ([084a7e6](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/084a7e68c35f0f0fe21f65d8d4fdd3f6c06611e1))
* initial commit for filter list ([9d3a8d9](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/9d3a8d9a7dab8296ec8329ef06fc3520173558bb))
* initial commit of activity page to display all notifications ([c3e54b7](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/c3e54b75f829291f8fe3f57cde47528e4a100a3e))
* move notification pop ups to App.js ([56aca5c](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/56aca5c7375f7348f77cc49e9a732084f1d0f35f))
* replaced old file upload input with new drag and drop widget that accepts multiple xml files at once ([189bf03](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/189bf03af4547d8598ad3e95d605cdf99efce4d0))
* **@truechoice/portal-user:** completed change password and generate new api-key ([d997d36](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/d997d36e8d2bf0c7b6a692176c9a215ef9dbfa58))
* simple file upload example ([e9b3ff9](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/e9b3ff9c47ec8a4e58dee3ffba8b2c1a7c520d2f))
* simple file upload example ([9801342](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/9801342ebeedca2e0a88149f69709cd9b63de222))
* sort notifications by newest ([c9ae62b](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/c9ae62bb0584301f157c5c6731b06924c8473120))
* update notification pop up ([4a87dde](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/4a87dde4b4cefb4f44396968945a96e077602e71))
* update user icon to reference icons folder, wrap activity page in jumbotron ([1a2fc51](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/1a2fc5103563e68ee873c17528c6985e1818a689))
* updated default value of the server dropdown in order to comply with requirements laid out at beginning of project ([f883c65](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/f883c65d301ef563afceb9e73b3238a7d21d32f4))
* updated markupso that all elements/components are a direct child of a Col component, which is going to help in layout ([ce04d82](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/ce04d82c5e299b716dfd87cf48c22d0870dcdb0e))
* updated styles by targeting all buttons to have no border as opposed to just submit ([f2d4481](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/f2d448113f29f317cb392b5f022e1f772728d3d4))
* updated submit handler to also reset validated when successful upload, so that the validation styles are removed ([408e75a](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/408e75a2f8c1712ca2b230b388e6ef737eab6b77))
* updated the validation of the upload file/submit handler to only run when required controls (i.e. xml file) have been filled out ([83e5c8e](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/83e5c8e2a431669fba493e2b3701f017e471cdac))
* updated the width for the column that contains the submit button to be smaller and centered ([26993e5](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/26993e5ff0381d1d320f71b3e371f98eab552e59))
* updating sizing for all columns, except for one in first row, in order to correctly size elements and keep symmetry across all viewports ([e36c562](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/e36c5629f061b76bf82564b5b6c0f4df304915d9))
* working filter form by topic and user ([067f918](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/067f918501e6dab06b8c8b8eb58826719bd9a7bc))
* **activity:** only display last 50 notifications ([32c0e51](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/32c0e5188a2653668d90bbe20e00844ec42a5c91))
* wrapped all input controls with From.Group component, to apply proper spacing ([b60119d](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/b60119d3afec3768302eda4e59affc7d6c239658))
* **@truechoice/portal-servers:** added server size to describe and server listing portal UI ([736a83b](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/736a83bdf57b93eb5b97d3235ab0cf24fd4ba1ec))
* **@truechoice/portal-servers:** discover servers by stackname ([81a3e79](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/81a3e792f673cb11405fbd2f4fefe4eab2b14cc3))
* **@truechoice/portal-servers:** page to list all servers and stacks ([9b4c163](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/9b4c163f70da40b7597f8afdc9618849c5b67bb2))
* **@truechoice/portal-servers:** uI for editing shortname and alta shortname ([71308de](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/71308dee83e5f6c80ff9b8d624de1cda1befa036))
* **@truechoice/portal-servers:** update and add server short name/alias while ensuring uniqueness ([66ffe59](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/66ffe59ff37f498f35a9a0bbfbb52c5e85ce1c84))
* **@truechoice/portal-user:** see all users and edit their accout detail using react-hook-from!! ([f9151f5](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/f9151f5de6436562a369e0a28bc968a3a7a00bd6))
* **@truechoice/portal-user:** user manager UI to edit a user account ([bc35b6b](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/bc35b6b604c0717366fb4e4cd7845b29d1090d7e))
* **@truechoice/service-auth:** added suport for a person's full name in the accessToken ([06a73ed](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/06a73edbc7a948293e2e5253ad5731ecce64ec2a))
* **@truechoice/webservice-auth:** added JWT role-base authorization ([092e718](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/092e718bd0415fac7cc8b8c98319e29293236e1c))
* **@truechoice/webservice-user:** endpoints for user delete, update password, new/update api-key ([5a3b9ff](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/5a3b9ffac46ace49897629a8141b02f8cad239ff))
* **activity:** replace getAllActivity with protected route ([09cd1e7](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/09cd1e77884b9003ac5c0d2289e4565d8a152f83))
* **notification:** add date range calendar to filters ([ec470ec](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/ec470ec89761bae3ff28f992d3979224d2c76ef5))


### Performance Improvements

* **@truechoice/example-get-request:** optized request to use try catch and better error handling ([77e91b4](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/77e91b4c02db134d0cfb0427115b03f90e44f4d9))
* **@truechoice/portal-auth:** retry feature on XMLHttpRequest(s) in the accessToken has expired ([edb7acc](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/edb7accc3d816f45d2e113beb2aafc9142fa4fb7))


### Reverts

* Revert "Revert "Merge branch 'master' of https://bitbucket.org/truechoicesolutions/portal-webservice into feature/activity-notifications"" ([51149cb](https://bitbucket.org/truechoicesolutions/portal-webservice/commits/51149cb80bbd62af5d981784c841856968da71c4))
