import './App.scss';
import React, { Component } from 'react';
import NavBar from "./components/layout/navBar";
import Footer from "./components/layout/footer"
import ProjectPage from './components/main/projects/project-page';
import ProjectsSearch from './components/main/projects/projects-search-page';
import BlogPage from './components/main/blogs/blog-page'
import BlogsSearch from './components/main/blogs/blogs-search-page'
import TeamMembersSearch from './components/main/resumes/resume-search-page';
import ResumePage from './components/main/resumes/resume-page';
import PrivateArea from './components/private-area/private-area';
import Main from "./components/main/main";
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUser } from "./services/userService";

class App extends Component {
  state = {  }

componentDidMount(){
  const user = getCurrentUser();
  this.setState({ user });
}  

  render() { 
    const { user } = this.state;
    return ( 
          <div className="App">

      <header> 
        <ToastContainer />
        <NavBar user={user}/>  
      </header>

      <main className='minh'>
        <Switch>
          <Route path='/project-page/:id' component={ProjectPage}/>
          <Route path='/projects/projects-search-page' component={ProjectsSearch}/>
          <Route path='/blogs/blogs-search-page' component={BlogsSearch}/>
          <Route path='/blog-page/:id' component={BlogPage}/>
          <Route path='/resumes/resume-search-page' component={TeamMembersSearch}/>
          <Route path='/resume-page/:id' component={ResumePage}/>
          <Route path='/private-area' component={PrivateArea} />
          <Route path='/' exact component={Main} user={user} />
        </Switch>
      </main>

      <footer>
        <Footer />  
      </footer>

    </div>
     );
  }
}
 
export default App;