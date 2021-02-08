import React, { Component } from 'react';
import SideRow from './side-bar-row';

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
        let changeStatus = this.state.sideItemes[index];
        changeStatus.open = !changeStatus.open ;
        this.setState({ changeStatus })
     }

    render() { 
        const { sideItemes } = this.state;
        return ( 
            sideItemes.length &&
                <div className="d-flex justify-content-end ">
                    <div className="accordion col-1 col-xl-2 side-bar position-fixed text-rtl">
                        { sideItemes.map( (item, i) => { 
                            return ( <SideRow toggleSideNav={this.toggleSideNav} key={i} item={item} index={i}/> )
                            })}
                    </div>
                </div>
         );
    }
}
 
export default SideBar;