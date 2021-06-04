import React from 'react';
import { Link } from 'react-router-dom'
import { getCurrentUser } from "../../../services/userService";

const QnaCard = ({  item, toggleQna, index, handleQnaDelete  }) => {
    const { question, answer } = item;
    const user = getCurrentUser();
    return ( 

                <div className="accordion">
                    <div className="card-header"
                         onClick={()=> toggleQna(index)}>

                        <h2 className="mb-0 text-right display-4">
                            {question}
                        </h2>
                    </div>

                    <div className={ item.open ? "qna-open m-0" : 'qna-close m-0'}>  
                        <div className="card-body row">

                            <div className="card-text col-12  text-right">
                                <h2 className="card-title h2Title">
                                    {answer.title}
                                </h2>

                                <hr/>
                                <p>{answer.text}</p>
                                {user && user.isAdmin && 
                                    <span>
                                        <Link to={`/private-area/edit-qna-card/${item._id}`} 
                                              className='far fa-edit text-dark   text-decoration-none'></Link> 
                                        <span> | </span>
                                        <a href="/" onClick={ e => { handleQnaDelete(item._id, e) } } 
                                                    className='fas fa-trash-alt text-dark text-decoration-none'> </a>  
                                    </span>}
                            </div>

                        </div>
                    </div>
            </div>
     );
}
 
export default QnaCard;

/*
qnas : [
        {
            question: '',
            answer: 
                {
                    title: '',
                    text: 'צור מאמר',
                    to:'/private-area/create-blog-card',
                    img:'side-nav center fas fa-feather-alt',
                    alt: 'bla bla'
                },
            open: false
        },
],



<QnaCard toggleQna={this.toggleQna} item={} index={} handleQnaDelete={this.handleQnaDelete}/>

*/