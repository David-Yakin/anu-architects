import React, { Component } from 'react';
import Titles from '../common/titles';
import ALink from '../common/a-link';

class Process extends Component {
    state = { 
        counter: 0,
        sliders: [
            { 
                id: 0,
                dotText: ' א',
                video: "/videos/theProcess/1.mp4",
                title: "מילוי טופס צור קשר",
                content: "על מנת שהשיחה הראשונית תהה פרודוקטיבית נשמח לדעת כמה שיותר פרטים על הפרויקט. מה סוג הנכס? מיקומו?  דד ליין לסיומו? אם יש דברים ספציפיים שרוצים להתעכב עליהם בתכנון או בעיצוב הנכס. כמו כן, אם יש לכם שאלה כללית עלינו או על תהליך העבודה או כל שאלה אחרת מלאו את טופס יצירת הקשר ונחזור אליכם עם תשובות בהקדם. ",
                link: "לטופס יצירת קשר",
                to: "/#contact"
            },
            {
                id: 1,
                dotText: ' ב',
                video: "2",
                title: "פגישת ייעוץ",
                content: "בפגישת הייעוץ הראשונית ננסה להבין את הצרכים שלך כלקוח, אענה על כך שאלה שתהיה לך וביחד נחליט על חבילת הצילום המתאימה, בהתאם לגודל הפרויקט ומגבלות התקציב. כמו כן אתן נדבר על מספר נקודות שיעזרו לייעל את יום הצילום, יחסכו זמן ויאפשרו את התנאים הדרושים ליצירת צילום מקצועי של הנכס. נקבע ביחד תאריך ליום הצילום ולאחר מכן הלקוח יעביר מקדמה שתשמש בין היתר לשכירת ציוד צילום מיוחד במקרה ויידרש",
                link: "לטופס יצירת קשר",
                to: "/#contact"
            },
            {
                id: 2,
                dotText: ' ג',
                video: "/videos/theProcess/3.mp4",
                title: "תוכניות וסקיצות",
                content: "על מנת שפגישת הייעוץ תהה פרודקטיבית נשמח לדעת כמה פרטים ראשוניים",
                link: "לטופס יצירת קשר",
                to: "/#contact"
            },
            {
                id: 3,
                dotText: ' ד',
                video: "4",
                title: "בנייה ושיפוץ",
                content: "על מנת שפגישת הייעוץ תהה פרודקטיבית נשמח לדעת כמה פרטים ראשוניים",
                link: "לטופס יצירת קשר",
                to: "/#contact"
            },
            {
                id: 4,
                dotText: ' ה',
                video: "5",
                title: "עיצוב",
                content: "על מנת שפגישת הייעוץ תהה פרודקטיבית נשמח לדעת כמה פרטים ראשוניים",
                link: "לטופס יצירת קשר",
                to: "/#contact"
            },
        ]

     }

     onArrowClick(symbol) {
            const { sliders } = this.state;       
            let { counter } = this.state;       

        if(symbol === '+') {
            counter !== sliders.length - 1 &&  counter ++; 
            } else if( symbol === '-' ) {
                counter !== 0 && counter --;
            } else counter = symbol;

            this.setState({ counter }); 
    }

    renderDot(){
        const { sliders } = this.state;
        return sliders.map( slider => <span key={slider.id} className="dot d-none d-lg-block mx-5 mb-3 px-4 shadow" onClick={ ()=> this.onArrowClick(slider.id)}> {slider.dotText}</span>)
    }


    renderHtml(){
        const { counter, sliders } = this.state;
        return (
           
            <div className='row px-3 border-0'>
                <div className="col-6 center d-none d-lg-block">
                    <video 
                           autoPlay loop muted 
                           className=" w-100 border border-dark"
                           src={sliders[counter].video}>
                    </video>
                </div>

                <article className="col-12 col-lg-6 text-rtl">
                    <h3 id="id_process_title" className="slideTitle display-4">{sliders[counter].title}</h3>
                    <hr/>
                    <p id="id_process_p" className="">{sliders[counter].content}</p>
                    <div className="mt-2">

                    <ALink to={sliders[counter].to} text={sliders[counter].link} />

                    </div>
                </article>

                <i className="fa fa-chevron-right next" onClick={()=>this.onArrowClick('-')}></i>
                <i className="fa fa-chevron-left prev" onClick={()=>this.onArrowClick('+')}></i>
                
            </div>
        )
    }

    render() { 
        return ( 
            <div id="theProcess" className="theProcess container-fluid">

                <div className="container px-0">

                <Titles titleBold='התהליך'
                        title= ''
                        subTitle='הסבר כללי על התהליך העבודה, ממילוי טופס יצירת הקשר ועד עיצוב הפרויקט המוגמר'
                        />

                        <div className="d-none d-lg-flex flex-row-reverse slideNav center py-3">
                            {this.renderDot()}
                        </div>

                        <div className="slideShow_container pb-5">
                            <div className="center shadow-lg">
                                <div className="row col-12 p-4">
                                    {this.renderHtml()}
                                </div>
                            </div>
                        </div>

                    
                </div>
            </div>
         );
    }
}
 
export default Process;