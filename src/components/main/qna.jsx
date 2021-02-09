import React, { Component } from 'react';
import Titles from '../common/titles';
// import ALink from '../common/a-link';
import { Link } from 'react-scroll';

class Qna extends Component {
    state = { 
        a: {
            to: '/other-pages/blogs',
            text: 'למידע נוסף'
        },

        data : {
        firstImgUrl: '/images/qna/1.jpg',
        firstImgAlt: 'תמונה ראשונה של שאלות ותשובות',
        firstQ: "שאלה ראשונה בנושא שיפוץ וארכיטקטורה",
        firstAnswerHeadline: "כותרת התשובה",
        firstAanswer: "תשובה מפורטת עם קישור למאמר בנושא",
        
        secondImgUrl: '/images/qna/1.jpg',
        secondImgAlt: 'תמונה שנייה של שאלות ותשובות',
        secondQ: "שאלה שנייה בנושא שיפוץ וארכיטקטורה",
        secondAnswerHeadline: "כותרת התשובה",
        secondAanswer: "תשובה מפורטת עם קישור למאמר בנושא",
        
        thirdImgUrl: '/images/qna/1.jpg',
        thirdImgAlt: 'תמונה שלישית של שאלות ותשובות',
        thirdQ: "שאלה שלישית בנושא שיפוץ וארכיטקטורה",
        thirdAnswerHeadline: "כותרת התשובה",
        thirdAanswer: "תשובה מפורטת עם קישור למאמר בנושא",
    }
     }

    render() { 
        const { data } = this.state;
        return ( 
            <div id="faq" className="faq container-fluid">
                <div className="container px-0">

                    <Titles titleBold='שאלות'
                            title= 'ותשובות'
                            subTitle='יש לכם שאלה? כאן תוכלו לקבל תשובות על מגוון שאלות נפוצות שהופנו לאנו אדריכלים'
                            />

                    <div className="accordion pb-4" id="accordionExample">

                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h2 className="mb-0 text-right">

                                    <button className="btn btn-link font-weight-light" 
                                            type="button" 
                                            data-toggle="collapse"
                                            data-target="#collapseOne" 
                                            aria-expanded="true" 
                                            aria-controls="collapseOne">
                                        {data.firstQ}
                                    </button>

                                </h2>
                            </div>

                            <div id="collapseOne" 
                                className="collapse show" 
                                aria-labelledby="headingOne"
                                data-parent="#accordionExample">  
                                <div className="card-body row">

                                    <div className="accordionImage d-none d-md-block col-4 p-0">
                                        <img className="img-fluid border"
                                             src={data.firstImgUrl} 
                                             alt={data.firstImgAlt}/>
                                    </div>

                                    <div className="card-text col-12 col-md-8  text-right">
                                        <h2 className="card-title h2Title">{data.firstAnswerHeadline}</h2>
                                        <hr/>
                                        <p>{data.firstAanswer}</p>
                                        {/* <ALink to='/#contact' text='פרטים נוספים' /> */}
                                        <Link className='btn btn-outline-dark' to='contact' smooth={true} duration={1000} >פרטים נוספים</Link>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header" id="headingTwo">
                                <h2 className="mb-0 text-right">
                                    <button className="btn btn-link collapsed font-weight-light" 
                                            type="button" 
                                            data-toggle="collapse"
                                            data-target="#collapseTwo" 
                                            aria-expanded="false" 
                                            aria-controls="collapseTwo">
                                        {data.secondQ} 
                                    </button>
                                </h2>
                            </div>

                            <div id="collapseTwo" 
                                 className="collapse" 
                                 aria-labelledby="headingTwo" 
                                 data-parent="#accordionExample">

                                <div className="card-body row">

                                    <div className="accordionImage col-4 border p-0">
                                        <img className="img-fluid" 
                                             src={data.secondImgUrl} 
                                             alt={data.secondImgAlt}/>
                                    </div>

                                    <div className="card-text col-8  text-right">
                                        <h2 className="card-title display-4">{data.secondAnswerHeadline}</h2>
                                        <hr/>
                                        <p>{data.secondAanswer}</p>
                                        {/* <ALink to='/#contact' text='פרטים נוספים' /> */}
                                        <Link className='btn btn-outline-dark' to='contact' smooth={true} duration={1000} >פרטים נוספים</Link>
                                    </div>

                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header" id="headingThree">
                                    <h2 className="mb-0 text-right">
                                        <button className="btn btn-link collapsed font-weight-light" 
                                                type="button"
                                                data-toggle="collapse" 
                                                data-target="#collapseThree" 
                                                aria-expanded="false"
                                                aria-controls="collapseThree">
                                            {data.thirdQ}
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseThree" 
                                     className="collapse" 
                                     aria-labelledby="headingThree"
                                     data-parent="#accordionExample">

                                    <div className="card-body row">

                                        <div className="accordionImage col-4 border p-0">
                                            <img className="img-fluid"
                                                 src={data.thirdImgUrl} 
                                                 alt={data.thirdImgAlt}/>
                                        </div>

                                        <div className="card-text col-8  text-right">
                                            <h2 className="card-title display-4">{data.thirdAnswerHeadline}</h2>
                                            <hr/>
                                            <p>{data.thirdAanswer}</p>
                                            {/* <ALink to='/#contact' text='פרטים נוספים' /> */}
                                            <Link className='btn btn-outline-dark' to='contact' smooth={true} duration={1000} >פרטים נוספים</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="center pb-4">
                         {/* <ALink to='/#contact'  text='לפרטים נוספים' /> */}
                         <Link className='btn btn-outline-dark' to='contact' smooth={true} duration={1000} >פרטים נוספים</Link>
                    </div>

                </div>
            </div>

         );
    }
}
 
export default Qna;