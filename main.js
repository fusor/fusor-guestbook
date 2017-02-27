////////////////////////////////////////////////////////////
// CONFIG
////////////////////////////////////////////////////////////
const GUESTBOOK_HOST = "0.0.0.0"
const GUESTBOOK_PORT = 1337
const POST_COLLECTION = "posts"
////////////////////////////////////////////////////////////

const cxObj = mongoCx();
if(!cxObj) {
  console.error('ERROR: Must provide mongo connection environment vars!')
  console.error('MONGO_HOST')
  console.error('MONGO_DB')
  console.error('MONGO_USER')
  console.error('MONGO_PASS')
  process.exit(1);
}

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello world.')
})

app.listen(GUESTBOOK_PORT, GUESTBOOK_HOST, () => {
  console.log(`Example app listening at ${GUESTBOOK_HOST}:${GUESTBOOK_PORT}`)
})

function mongoCx() {
  const env = process.env
  const isValid =
    env.hasOwnProperty('MONGO_HOST') &&
    env.hasOwnProperty('MONGO_DB') &&
    env.hasOwnProperty('MONGO_USER') &&
    env.hasOwnProperty('MONGO_PASS');

  if(!isValid) {
    return null
  }

  return {
    host: env['MONGO_HOST'],
    port: env['MONGO_DB'],
    port: env['MONGO_PORT'] || 27017,
    user: env['MONGO_USER'],
    pass: env['MONGO_PASS']
  }
}
