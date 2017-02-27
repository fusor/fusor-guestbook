////////////////////////////////////////////////////////////
// CONFIG
////////////////////////////////////////////////////////////
const GUESTBOOK_HOST = "0.0.0.0"
const GUESTBOOK_PORT = 1337
const POST_COLLECTION = "posts"
////////////////////////////////////////////////////////////

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello world.')
})

app.listen(GUESTBOOK_PORT, GUESTBOOK_HOST, () => {
  console.log(`Example app listening at ${GUESTBOOK_HOST}:${GUESTBOOK_PORT}`)
})
