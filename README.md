# Firebase Uploader

Upload files to firebase storage and write its' url to firebase database.

## Usage

`$ git clone`

`$ npm install`

### Follow **config.js.example** to create new **config.js** :

[Follow this website](https://firebase.google.com/docs/web/setup) to find your api key and project id.

[Follow this website](https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.56.0/guides/authentication) to generate **key.json** file.

```
var firebase = {
  apiKey: "<apiKey>",
  authDomain: "<projectId>.firebaseapp.com",
  databaseURL: "https://<projectId>.firebaseio.com",
  projectId: "<projectId>",
  storageBucket: "<projectId>.appspot.com",
  messagingSenderId: "<messagingSenderId>",
  keyFilename: "<keyFilename>"
};
```

If no user exists in firebase, you need to create one. Go to firebase console, choose authentication in left panel, create a new user.

```
var user = {
  email: "<email>",
  password: "<password>"
};
```

Setup your files directory.

```
var dirname = "<files directory path>";
```

`$ npm start` to upload files!