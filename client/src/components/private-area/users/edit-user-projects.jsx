import React from 'react';
import { getCurrentUser } from '../../../services/userService';
// import Titles from '../../common/titles';
// import ALink from '../../common/a-link';
// // import { getUser  } from "../../../services/userService"
// // import Swal from 'sweetalert2';
// // import { toast } from 'react-toastify'

const EditUserProjects = ({project}) => {
    const user = getCurrentUser();
    if(user && user.isAdmin){
        return ( 
            <div>

                {/* <div className="accordion">
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
                            </div>
                        </div>
                    </div>

                </div> */}
            </div>
        )}
    return <p className='text-danger'> אתה לא מורשה להוסיף או לשנות פרויקטים!</p>
}
 
export default EditUserProjects;