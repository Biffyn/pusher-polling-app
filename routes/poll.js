const express = require('express');
const router = express.Router();

const Pusher = require('pusher');
const { APP_ID, APP_KEY, APP_SECRET, APP_CLUSTER } = process.env;

router.get('/', (req, res) => {
  res.send("POLL")
});

router.post('/', (req, res) => {
  let pusher = new Pusher({
    appId: APP_ID,
    key: APP_KEY,
    secret: APP_SECRET,
    cluster: APP_CLUSTER,
    encrypted: true
  });

  pusher.trigger('os-poll', 'os-vote', {
    points: 1,
    os: req.body.os
  });

  return res.json({
    success: true,
    message: 'Thank you for voting'
  })
});

module.exports = router;