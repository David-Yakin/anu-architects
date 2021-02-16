import React, { Component } from 'react';
import Titles from '../../common/titles';
import QnaCard from './qna-card';
import ALink from '../../common/a-link';
import { getQnas, deleteQna  } from "../../../services/qnaService"
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'

class Qna extends Component {
    state = { 
        qnas : [],
     }

     handleQnaDelete = async (QnaId, e) => {
        e.preventDefault();
        console.log('delet works!');
        Swal.fire({
            title: '?האם אתה בטוח',
            text: "!הפרויקט יימחק ממאגר המידע",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'כן, אני רוצה למחוק!',
            cancelButtonText:'בטל'
          }).then((result) => {
            if (result.isConfirmed) {
                let qnas = [...this.state.qnas];
                qnas = qnas.filter( qna => qna._id !== QnaId );
                this.setState({ qnas });
                deleteQna(QnaId);
                toast('השאלה נמחקה');
            }
          })
      }
      
     async componentDidMount(){
        const { data } = await getQnas();
       if( data.length ) return this.setState({ qnas: data })
    }

     toggleQna = (index) => {
        const { qnas } = this.state;
        qnas.map( (item, i) => {
         if (i === index) return this.setState({ item: item.open = true });  
         return this.setState({ item: item.open = false })})}

render(){
    const { qnas } = this.state;

    return(
    <div className="faq container-fluid">
        <div className="container px-0">
            <Titles titleBold='שאלות'
                    title= 'ותשובות'
                    subTitle='יש לכם שאלה? כאן תוכלו לקבל תשובות על מגוון שאלות נפוצות שהופנו לאנו אדריכלים'/>

                    <div className="accordion mb-4">
                        {qnas.map( (item, index) => <QnaCard key={index} toggleQna={this.toggleQna} 
                        item={item} 
                        index={index}
                        handleQnaDelete={this.handleQnaDelete}/> )}
                    </div>

                    <div className="center pb-4">
                        <ALink to=''  text='לפרטים נוספים' />
                    </div>
        </div>
    </div>
    )
}
} 

export default Qna;