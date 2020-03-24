const express = require('express');
const router = express.Router();
const firebase = require('firebase')

/* Fetch instances */ 
router.get('/', (req, res) => {
  const userReference = firebase.database().ref('/Users/');

  userReference.on('value', (snapshoot) => {
    console.log(snapshoot.val());
    res.json(snapshoot.val());
    userReference.off('value');
  }, (errorObject) => {
    console.log('the read failed: ' + errorObject.code);
    res.send('the read failed: ' + errorObject.code);
  })
})


/* Create new instance */
router.post('/', (req, res) => {
  const { userName, name, age } = req.body;
  
  const referencePath = '/Users/' + userName + '/';
  const userReference = firebase.database().ref(referencePath);
  userReference.set({Name: name, Age: age}, function(error) {
    if (error) {
      res.send("Data could not be saved." + error);
    } else {
      res.send("Data saved successfully.");
    }
  });
})

/* Update instance */
router.put('/:username', (req, res) => {
  const { userName, name, age } = req.body;

  const referencePath = '/Users/' + userName + '/';
  const userReference = firebase.database().ref(referencePath);
  userReference.update({Name: name, Age: age}, function(error) {
    if (error) {
      res.send("Data could not be updated." + error);
    } else {
      res.send("Data updated successfully.");
    }
  });
})

router.delete('/:username', (req, res) => {
  var username = req.params.username;
  var referencePath = '/Users' + username + '/';
  var userReference = firebase.database().ref(referencePath);
  userReference.remove(err => {
    if (err) {
      res.send('data could not be deleted. ' + err)
    } else {
      res.send('data deleted')
    }
  })
})

module.exports = router;
