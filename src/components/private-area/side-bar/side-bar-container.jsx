import React, { Component } from 'react';
import SideRow from './side-bar-row';
import { getCurrentUser } from '../../../services/userService';
class SideBar extends Component {
    user = getCurrentUser();
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
            {
                row: {text:  'הפרויקטים שלי', icon: 'center fas fa-folder-open'},
                navs: [
                    {
                        text: 'לוחות זמנים',
                        page:'/private-area/create-blog-card',
                        icon:'side-nav center far fa-clock'
                    },
                    {
                        text: 'תוכניות',
                        page:'/private-area/blogs-search-page',
                        icon:'side-nav center far fa-paper-plane'
                    },
                    {
                        text: 'סקיצות',
                        page:'/private-area/blogs-search-page',
                        icon:'side-nav center fas fa-pencil-alt'
                    },
                    {
                        text: 'חוזים',
                        page:'/private-area/blogs-search-page',
                        icon:'side-nav center fas fa-file-signature'
                    },
                ],
                open: false
        },
            {
                row: {text:  'ניהול משתמש', icon: 'center fas fa-wrench'},
                navs: [
                    {
                        text: 'עדכון פרטים',
                        page:`/private-area/update-user/${this.user._id}`,
                        icon:'side-nav center fas fa-user-edit'
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
        const { sideItemes } = this.state;
        return ( 
            sideItemes.length &&
                <div className="d-flex justify-content-end ">
                    <div className="accordion col-1 col-xl-2 side-bar position-fixed text-rtl">

                        { this.user.admin && <SideRow toggleSideNav={this.toggleSideNav} key={0} item={sideItemes[0]} index={0}/> }
                        { this.user.admin && <SideRow toggleSideNav={this.toggleSideNav} key={1} item={sideItemes[1]} index={1}/> }
                        { this.user.admin && <SideRow toggleSideNav={this.toggleSideNav} key={2} item={sideItemes[2]} index={2}/> }
                        { this.user.admin && <SideRow toggleSideNav={this.toggleSideNav} key={3} item={sideItemes[3]} index={3}/> }
                        { this.user.isBloger && <SideRow toggleSideNav={this.toggleSideNav} key={4} item={sideItemes[4]} index={4}/> }
                        { this.user && !this.user.admin && <SideRow toggleSideNav={this.toggleSideNav} key={6} item={sideItemes[6]} index={6}/> }
                        { this.user && !this.user.admin && <SideRow toggleSideNav={this.toggleSideNav} key={5} item={sideItemes[5]} index={5}/> }

                    </div>
                </div>
         );
    }
}
 
export default SideBar;