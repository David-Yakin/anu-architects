const auth = require('./routes/authRouter');
const users = require('./routes/usersRouter');
const projects = require('./routes/projectsRouter');
const blogs = require('./routes/blogsRouter');
const resumes = require('./routes/resumesRouter');
const qnas = require('./routes/qnasRouter');
const express = require('express');
const app = express();
const cors = require('cors'); // להוריד כשמעלים לשרת אמיתי!!!
const mongoose = require('mongoose');
const morgan = require('morgan');
const { primaryProjects, primaryResumes, primaryBlogs, primaryUsers, primaryQnas } = require('./primaryInfo/primaryData');
const {data} = require('./primaryInfo/data');

mongoose.connect('mongodb://localhost/anu-architects', {
  useNewUrlParser:true,
  useUnifiedTopology:true,
}).then(()=> console.log('connected to MongoDb!'))
.catch(error => console.error(`could not connect to mongoDb: ${error}`));

app.use(cors());// להוריד כשמעלים לשרת אמיתי!!!
app.use(express.json());

app.use(express.static('./public'));

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/projects', projects);
app.use('/api/blogs', blogs);
app.use('/api/resumes', resumes);
app.use('/api/qnas', qnas);

app.use(morgan('dev'));
// primaryProjects(data.projects[0]);
// primaryProjects(data.projects[1]);
// primaryProjects(data.projects[2]);
// primaryProjects(data.projects[3]);

// primaryResumes(data.resumes[0]);
// primaryResumes(data.resumes[1]);
// primaryResumes(data.resumes[2]);

// primaryBlogs(data.blogs[0]);
// primaryBlogs(data.blogs[1]);
// primaryBlogs(data.blogs[2]);

primaryUsers(data.users[0]);
primaryUsers(data.users[1]);

// primaryQnas(data.qnas[0]);
// primaryQnas(data.qnas[1]);

const PORT = 8181;
app.listen(PORT, () => console.log(`server run on: http://localhost:${PORT}`));