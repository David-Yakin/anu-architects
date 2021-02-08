const auth = require('./routes/authRouter');
const users = require('./routes/usersRouter');
const projects = require('./routes/projectsRouter');
const blogs = require('./routes/blogsRouter');
const resumes = require('./routes/resumesRouter');
const express = require('express');
const app = express();
const cors = require('cors'); // להוריד כשמעלים לשרת אמיתי!!!
const mongoose = require('mongoose');
const morgan = require('morgan');
const { primaryProjects, primaryResumes, primaryBlogs, primaryUsers } = require('./primaryInformation/primaryData');
const {data} = require('./primaryInformation/data');

mongoose.connect('mongodb://localhost/anu-architects', {
  useNewUrlParser:true,
  useUnifiedTopology:true,
}).then(()=> console.log('connected to MongoDb!'))
.catch(error => console.error(`could not connect to mongoDb: ${error}`));

app.use(express.static('server-public'));

app.use(cors());// להוריד כשמעלים לשרת אמיתי!!!
app.use(express.json());

primaryProjects(data.projects[0]);
primaryProjects(data.projects[1]);
primaryProjects(data.projects[2]);
primaryProjects(data.projects[3]);

primaryResumes(data.resumes[0]);
primaryResumes(data.resumes[1]);
primaryResumes(data.resumes[2]);

primaryBlogs(data.blogs[0]);
primaryBlogs(data.blogs[1]);
primaryBlogs(data.blogs[2]);

primaryUsers(data.users[0]);

app.use(morgan('dev'));

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/projects', projects);
app.use('/api/blogs', blogs);
app.use('/api/resumes', resumes);


const PORT = 8181;
app.listen(PORT, () => console.log(`server run on: http://localhost:${PORT}`));