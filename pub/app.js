$(function() {
  console.log('this is the client!');

  $('button#submit').click(function() {
    var payload = {
      user: $('input#user').val(),
      msg: $('textarea#message').val()
    };

    console.log('the submit thing happened');
    console.log(payload);

    axios.post('/posts', payload).then(function() {
      window.location = '/posts';
    }).catch(function() {
      console.error('A bad thing happened submitting a post');
    })
  })

  $('button.delete-post').click(function(e) {
    var postId = $(e.target).data('post-id');
    var postUrl = '/posts/' + postId;
    console.log(postUrl);
    axios.delete(postUrl).then(function() {
      window.location.reload();
    }).catch(function() {
      console.error('A bad thing happened submitting a post');
    })
  });
});
