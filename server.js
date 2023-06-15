require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');

const errorHandler = require('_middleware/error-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
app.use('/users', require('./main/users/users.controller'));

app.use( '/admin' , require('./main/admin/admin.controller'))
app.use( '/blog' , require('./main/admin/blog/blog.controller'))

app.use('/fileUploads' , require('./main/fileUploads/fileUploads.controller'));

app.use('/twitter' , require('./main/twitter/twitter.controller'))
app.use('/feedback' , require('./main/feedback/feedback.controller'))
app.use(express.static('uploads'))

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));