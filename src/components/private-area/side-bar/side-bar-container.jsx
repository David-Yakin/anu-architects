import React, { Component } from 'react';
import SideRow from './side-bar-row';
import { getCurrentUser } from '../../../services/userService';
class SideBar extends Component {
    
    state = { 
        sideItemes: [
            {
                row: {text:  'משתמשים', icon: 'center far fa-address-card'},
                navs: [
                    {
                        text: 'נהל הרשאות',
                        page:'/private-area/users',
                        icon:'side-nav center fas fa-wrench'
                    }
                ],
                open: false
        },
            {
                row: {text:  'אנשי צוות', icon: 'center fas fa-user'},
                navs: [
                    {
                        text: 'צור איש צוות',
                        page:'/private-area/create-resume-card',
                        icon:'side-nav center fas fa-user-plus'
                    },
                    {
                        text: 'ערוך איש צוות',
                        page:'/private-area/resume-search-page',
                        icon:'side-nav center fas fa-user-edit'
                    },

                ],
                open: false
        },
            {
                row: {text:  'פרויקטים', icon: 'center far fa-building po'},
                navs: [
                    {
                        text: 'צור פרויקט',
                        page:'/private-area/create-project-card',
                        icon:'side-nav center fas fa-building'
                    },
                    {
                        text: 'ערוך פרויקט',
                        page:'/private-area/projects-search-page',
                        icon:'side-nav center far fa-edit'
                    },

                ],
                open: false
        },
            {
                row: {text:  'שאלות ותשובות', icon: 'center fas fa-question'},
                navs: [
                    {
                        text: 'צור שאלה',
                        page:'/private-area/create-qna-card',
                        icon:'side-nav center fas fa-question-circle'
                    },
                    {
                        text: 'ערוך שאלה',
                        page:'/private-area/qna-search-page',
                        icon:'side-nav center far fa-question-circle'
                    },

                ],
                open: false
        },
            {
                row: {text:  'מאמרים', icon: 'center fas fa-pencil-alt'},
                navs: [
                    {
                        text: 'צור מאמר',
                        page:'/private-area/create-blog-card',
                        icon:'side-nav center fas fa-feather-alt'
                    },
                    {
                        text: 'ערוך מאמר',
                        page:'/private-area/blogs-search-page',
                        icon:'side-nav center far fa-paper-plane'
                    },


                ],
                open: false
        },

    ]
     }

     toggleSideNav = (index) => {
        const { sideItemes } = this.state;
        sideItemes.map( (item, i) => {
         if (i === index) return this.setState({ item: item.open = true });  
         return this.setState({ item: item.open = false })})}

    //  toggleSideNav = (index) => {
    //     let changeStatus = this.state.sideItemes[index];
    //     changeStatus.open = !changeStatus.open ;
    //     this.setState({ changeStatus })
    //  }

     render() { 
        const user = getCurrentUser()
        const { sideItemes } = this.state;
        return ( 
            sideItemes.length &&
                <div className="d-flex justify-content-end ">
                    <div className="accordion col-1 col-xl-2 side-bar position-fixed text-rtl">

                        { user.admin && <SideRow toggleSideNav={this.toggleSideNav} key={0} item={sideItemes[0]} index={0}/> }
                        { user.admin && <SideRow toggleSideNav={this.toggleSideNav} key={1} item={sideItemes[1]} index={1}/> }
                        { user.admin && <SideRow toggleSideNav={this.toggleSideNav} key={2} item={sideItemes[2]} index={2}/> }
                        { user.admin && <SideRow toggleSideNav={this.toggleSideNav} key={3} item={sideItemes[3]} index={3}/> }
                        { user.isBloger && <SideRow toggleSideNav={this.toggleSideNav} key={4} item={sideItemes[4]} index={4}/> }

                    </div>
                </div>
         );
    }
}
 
export default SideBar;