////////////////////////////////////////////////////////////
// CONFIG
////////////////////////////////////////////////////////////
const GUESTBOOK_HOST = "0.0.0.0"
const GUESTBOOK_PORT = 1337
const POST_COLLECTION = "posts"
////////////////////////////////////////////////////////////

const cxStr= mongoCx();
if(!cxStr) {
  console.error('ERROR: Must provide mongo connection environment vars!')
  console.error('MONGO_HOST')
  console.error('MONGO_DB')
  console.error('MONGO_USER')
  console.error('MONGO_PASS')
  process.exit(1);
}

const exphbs = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use('/pub', express.static('pub'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const db = require('monk')(cxStr).get('posts');

const fiveHundredError = (res) => {
  return (err) => {
    console.error(err);
    return res.sendStatus(500);
  }
}

app.get('/', (req, res) => {
  res.redirect('/posts');
})

app.get('/posts', (req, res) => {
  db.find({}).then((posts) => {
    res.render('posts', { posts });
  }).catch(fiveHundredError(res));
});

app.delete('/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  db.remove({_id: postId}).then(() => {
    res.sendStatus(204);
  }).catch(fiveHundredError(res));
});

app.get('/posts/new', (req, res) => {
  res.render('posts_new');
});

app.post('/posts', (req, res) => {
  const body = req.body;
  db.insert({user: body.user, msg: body.msg}).then((post) => {
    console.log('id -> ' + post._id);
    res.sendStatus(201);
  }).catch(fiveHundredError(res));
});

app.listen(GUESTBOOK_PORT, GUESTBOOK_HOST, () => {
  console.log(`Example app listening at ${GUESTBOOK_HOST}:${GUESTBOOK_PORT}`)
})

function postStr(obj) {
  return `id: ${obj._id}, user: ${obj.user}, msg: ${obj.msg}`;
}

function mongoCx() {
  const env = process.env
  const isValid =
    env.hasOwnProperty('MONGO_HOST') &&
    env.hasOwnProperty('MONGO_DB') &&
    env.hasOwnProperty('MONGO_USER') &&
    env.hasOwnProperty('MONGO_PASS');

  const user = env['MONGO_USER']
  const pass = env['MONGO_PASS']
  const host = env['MONGO_HOST']
  const port = env['MONGO_PORT']
  const db = env['MONGO_DB']

  if(!isValid) {
    return null
  }

  const cxStr = `mongodb://${user}:${pass}@${host}:${port}/${db}`;
  return cxStr;
}
