import React, { Component } from 'react';
import SearchInput from '../common/search-input';
import Titles from '../common/titles';
import { getUsers, deleteUser, changUserStatus } from '../../services/userService';
import { getDate } from '../../services/timeService';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

class Users extends Component {
    state = { 
        categories: [
            { value: '', text: 'כולם'},
            { value: true , text: 'בלוגרים' },
            { value: false , text: 'לא בלוגרים' },
        ],
        users: [ ],
     }

     async componentDidMount(){
        const { data } = await getUsers();
       if( data.length ) this.setState({ users: data })
    }

    async handleChange(e){
        const { data } = await getUsers();
        let users = data;
        const searchTerm = e.target.value; 
        const filertUsers = users.filter( user =>
            ( user.name.toLowerCase().includes(searchTerm.toLowerCase())) 
            || (user.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
            || (user.isBloger.toString().includes(searchTerm))); 
        this.setState({ users: filertUsers });
    }

    changeStatus = async (userId) => {
        let users = [...this.state.users];
        let user = users.find( user => user._id === userId);
        if(!user.isBloger){
            return (
                Swal.fire({
                    title: '?האם אתה בטוח',
                    text: "!המשתמש יוכל לשנות למחוק או ליצור מאמרים",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'שנה הרשאה לבלוגר',
                    cancelButtonText:'בטל'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        this.setState({ user: user.isBloger = true })
                        toast('ההרשאה עודכנה');
                        changUserStatus(userId);
                    }
                }))}
        toast('ההרשאה עודכנה');
        this.setState({ user: user.isBloger = false });
        changUserStatus(userId); 
    }

    handleUserDelete = async (userId, e) => {
        e.preventDefault();
         Swal.fire({
             title: '?האם אתה בטוח',
             text: "!המשתמש יימחק ממאגר המידע",
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: 'כן, אני רוצה למחוק!',
             cancelButtonText:'בטל'
           }).then((result) => {
             if (result.isConfirmed) {
                 let users = [...this.state.users];
                 users = users.filter( user => user._id !== userId );
                 this.setState({ users });
                 deleteUser(userId);
                 toast('המשתמש נמחק');
             }})}

     renderTable(){
        const { users } = this.state;
        if(users.length){
            return (
            <table className="table text-rtl">
                <thead>
                  <tr>
                    <th scope="col">מס'</th>
                    <th scope="col">שם פרטי</th>
                    <th scope="col">שם משפחה</th>
                    <th scope="col">ת.ז</th>
                    <th scope="col">כתובת מייל</th>
                    <th scope="col">טלפון</th>
                    <th scope="col">בלוגר</th>
                    <th scope="col">נוצר בתאריך</th>
                    <th scope="col">מחק</th>
                  </tr>
                </thead>

                <tbody>
                   { users.map( (user, index) =>  ( 
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.lastName}</td>
                        <td>{user.userID}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td> <button className={ user.isBloger ? "btn btn-danger" : "btn btn-outline-dark"}
                                     onClick={ () => this.changeStatus(user._id) }disabled={user.admin ? true : false}>
                            {user.isBloger ? "חיובי" : "שלילי"}
                            </button> 
                        </td>
                        <td>{getDate(user.createdAt)}</td>
                        <td>
                            {!user.admin && <a href="/" onClick={ e => { this.handleUserDelete(user._id, e) } } className='fas fa-user-slash text-dark text-decoration-none'> </a> }
                        </td>
                    </tr>
                    ) )}
                </tbody>
            </table>
            )} 
        return (
            <div className="center">
                <div className="row col-8 text-rtl pt-4">
                    <h4>מצטערים לא נמצאו משתמשים במאגר המידע</h4>
                </div>
            </div> )}

    render() { 
        const { categories } = this.state;
        return ( 
            <div>
                <Titles titleBold='ניהול'
                        title= 'הרשאות'
                        subTitle='כאן תוכל לחפש משתמשים לשנות את ההרשאות שניתנו להם או למחוק אותם ממאגר המידע ' />

                    <div className="container">
                        <div className="center">
                            <div className="col-10">
                                <SearchInput categories={categories}  
                                             placeholder='חפש משתמש' 
                                             handleChange={(e)=>{this.handleChange(e)}}/>  
                            </div>
                        </div>
                       { this.renderTable() }
                    </div>
            </div>
            );}
}
 
export default Users;