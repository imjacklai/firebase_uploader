"use strict";

const fs = require("fs");
const firebase = require("firebase");
const config = require("./config");

const gcloud = require("google-cloud")({
  projectId: config.firebase.projectId,
  keyFilename: config.firebase.keyFilename
});

const storages = gcloud.storage().bucket(config.firebase.storageBucket);

firebase.initializeApp(config.firebase);
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    readFiles(config.dirname);
  } else {
    signInFirebase();
  }
});

function signInFirebase() {
  firebase.auth().signInWithEmailAndPassword(config.user.email, config.user.password).catch(function(err) {
    console.log(`Failed to sign in: ${err.message}`);
  });
}

function readFiles(dirname) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      console.log(`Failed to read directory: ${err}`);
      return;
    }

    for (const [index, filename] of filenames.entries()) {
      uploadFile(dirname, filename, index == filenames.length - 1);
    }
  });
}

function uploadFile(dirname, filename, isLast) {
  storages.upload(`${dirname}/${filename}`, function(err, file) {
    if (err) {
      console.log(`Failed to upload file: ${err}`);
      return;
    }

    file.getSignedUrl({ action: "read", expires: "03-17-2025" }, function(err, url) {
      if (err) {
        console.error(`Failed to get signed url: ${err}`);
        return;
      }

      const name = filename.split(".")[0];
      firebase.database().ref(`${config.root_node}/${name}`).set({ imageUrl: url }, function(err) {
        if (err) {
          console.log(`Failed to write database: ${err}`);
          return;
        }

        if (isLast) {
          console.log("Finished!");
        }
      });
    });
  });
}