import React from 'react';
import Titles from '../../common/titles';
import Form from '../../common/form';
import Joi from "joi-browser";
import { getBlog, editBlog, editBlogWithPics } from '../../../services/blogService';
import { toast } from 'react-toastify';

class EditBlog extends Form {
    state = { 
        data: { 
            title:'', 
            subTitle: '',
            author:'',
            category:'',
            cardUrl:'',
            cardAlt: '',
            titleImgUrl:'',
            titleImgAlt:'',
            titleImgCredit:'',
            endImgUrl: "",
            endImgAlt: "",
            endImgCredit: "",
            firstInnerTitle:'',
            firstP:'',
            secondP:'',
            thirdP:'',
            landscapeImgUrl:'',
            landscapeImgAlt:'',
            landscapeImgCredit:'',
            secondInnerTitle:'',
            foruthP:'',
            fifthP:'',
            sixthP:'',
            profileImgUrl:'',
            profileImgAlt:'',
            profileImgCredit:'',
            thirdInnerTitle:'',
            seventhP:'',
            eighthP:'',
            ninthP:'',
         },
        errors: {},
        images: [] 
     }

     schema = { 
        _id: Joi.string(),
        title: Joi.string().required().min(2).max(255).label('title'),
        subTitle: Joi.string().required().min(2).max(255).label('subTitle'),
        author: Joi.string().required().min(2).max(255).label('author'),
        category: Joi.string().required().min(2).max(255).label('category'),
        cardUrl: Joi.string().min(2).max(255).label('cardUrl'),
        cardAlt: Joi.string().required().min(2).max(255).label('cardAlt'),
        titleImgUrl: Joi.string().min(2).max(255).label('titleImgUrl'),
        titleImgAlt: Joi.string().required().min(2).max(255).label('titleImgAlt'),
        titleImgCredit: Joi.string().required().min(2).max(255).label('titleImgCredit'),
        endImgUrl: Joi.string().min(2).max(255).label('endImgUrl'),
        endImgAlt: Joi.string().required().min(2).max(255).label('endImgAlt'),
        endImgCredit: Joi.string().required().min(2).max(255).label('endImgCredit'),
        firstInnerTitle: Joi.string().required().min(2).max(255).label('firstInnerTitle'),
        firstP: Joi.string().required().min(2).max(1024).label('firstP'),
        secondP: Joi.string().required().min(2).max(1024).label('secondP'),
        thirdP: Joi.string().required().min(2).max(1024).label('thirdP'),
        landscapeImgUrl: Joi.string().min(2).max(255).label('landscapeImgUrl'),
        landscapeImgAlt: Joi.string().required().min(2).max(255).label('landscapeImgAlt'),
        landscapeImgCredit: Joi.string().required().min(2).max(255).label('landscapeImgCredit'),
        secondInnerTitle: Joi.string().required().min(2).max(255).label('secondInnerTitle'),
        foruthP: Joi.string().required().min(2).max(1024).label('foruthP'),
        fifthP: Joi.string().required().min(2).max(1024).label('fifthP'),
        sixthP: Joi.string().required().min(2).max(1024).label('sixthP'),
        profileImgUrl: Joi.string().min(2).max(255).label('profileImgUrl'),
        profileImgAlt: Joi.string().required().min(2).max(255).label('profileImgAlt'),
        profileImgCredit: Joi.string().required().min(2).max(255).label('profileImgCredit'),
        thirdInnerTitle: Joi.string().required().min(2).max(255).label('thirdInnerTitle'),
        seventhP: Joi.string().required().min(2).max(1024).label('seventhP'),
        eighthP: Joi.string().required().min(2).max(1024).label('eighthP'),
        ninthP: Joi.string().required().min(2).max(1024).label('ninthP'),
     }

     async componentDidMount(){
        const blogId = this.props.match.params.id; 
        const { data } = await getBlog(blogId);
        this.setState({ data: this.mapToNewModel(data)});
     }

    mapToNewModel(blog){
    return {
        _id: blog._id,
        title:blog.title, 
        subTitle: blog.subTitle,
        author:blog.author,
        category:blog.category,
        // cardUrl:blog.cardUrl,
        cardAlt: blog.cardAlt,
        // titleImgUrl:blog.titleImgUrl,
        titleImgAlt:blog.titleImgAlt,
        titleImgCredit:blog.titleImgCredit,
        // endImgUrl: blog.endImgUrl,
        endImgAlt: blog.endImgAlt,
        endImgCredit: blog.endImgCredit,
        firstInnerTitle:blog.firstInnerTitle,
        firstP:blog.firstP,
        secondP:blog.secondP,
        thirdP:blog.thirdP,
        // landscapeImgUrl:blog.landscapeImgUrl,
        landscapeImgAlt:blog.landscapeImgAlt,
        landscapeImgCredit:blog.landscapeImgCredit,
        secondInnerTitle:blog.secondInnerTitle,
        foruthP:blog.foruthP,
        fifthP:blog.fifthP,
        sixthP:blog.sixthP,
        // profileImgUrl:blog.profileImgUrl,
        profileImgAlt:blog.profileImgAlt,
        profileImgCredit:blog.profileImgCredit,
        thirdInnerTitle:blog.thirdInnerTitle,
        seventhP:blog.seventhP,
        eighthP:blog.eighthP,
        ninthP:blog.ninthP,
    }
}

checkTitle = (title) => {
    return title.replace(/\s/g, "-")
 }

 upload = (data) => {
    const blogId = this.props.match.params.id 
    const {title, subTitle,author, category, cardUrl, cardAlt, titleImgUrl, titleImgAlt, titleImgCredit, endImgUrl, endImgAlt, endImgCredit, firstInnerTitle, firstP, secondP, thirdP, landscapeImgUrl, landscapeImgAlt, landscapeImgCredit, secondInnerTitle, foruthP, fifthP, sixthP, profileImgUrl, profileImgAlt, profileImgCredit, thirdInnerTitle, seventhP, eighthP, ninthP} = this.state.data;
    const {images} = this.state;
    const titleChecked = this.checkTitle(title.trim());

    const formData = new FormData();
    formData.append("title", titleChecked);
    formData.append("subTitle", subTitle.trim());
    formData.append("author", author.trim());
    formData.append("category", category.trim());
    formData.append("cardAlt", cardAlt.trim());
    formData.append("titleImgAlt", titleImgAlt.trim());
    formData.append("titleImgCredit", titleImgCredit.trim());
    formData.append("endImgAlt", endImgAlt.trim());
    formData.append("endImgCredit", endImgCredit.trim());
    formData.append("firstInnerTitle", firstInnerTitle.trim());
    formData.append("firstP", firstP.trim());
    formData.append("secondP", secondP.trim());
    formData.append("thirdP", thirdP.trim());
    formData.append("landscapeImgAlt", landscapeImgAlt.trim());
    formData.append("landscapeImgCredit", landscapeImgCredit.trim());
    formData.append("secondInnerTitle", secondInnerTitle.trim());
    formData.append("foruthP", foruthP.trim());
    formData.append("fifthP", fifthP.trim());
    formData.append("sixthP", sixthP.trim());
    formData.append("profileImgAlt", profileImgAlt.trim());
    formData.append("profileImgCredit", profileImgCredit.trim());
    formData.append("thirdInnerTitle", thirdInnerTitle.trim());
    formData.append("seventhP", seventhP.trim());
    formData.append("eighthP", eighthP.trim());
    formData.append("ninthP", ninthP.trim());
    formData.append("id", blogId );
    
    if(cardUrl === undefined) formData.append("cardUrl", data.cardUrl);
    else formData.append("cardUrl", cardUrl.trim());
    if(titleImgUrl === undefined) formData.append("titleImgUrl", data.titleImgUrl);
    else formData.append("titleImgUrl", titleImgUrl.trim());
    if(endImgUrl === undefined) formData.append("endImgUrl", data.endImgUrl);
    else formData.append("endImgUrl", endImgUrl.trim());
    if(landscapeImgUrl === undefined) formData.append("landscapeImgUrl", data.landscapeImgUrl);
    else formData.append("landscapeImgUrl", landscapeImgUrl.trim());
    if(profileImgUrl === undefined) formData.append("profileImgUrl", data.profileImgUrl);
    else formData.append("profileImgUrl", profileImgUrl.trim());
    
    for(let x = 0; x < images.length; x++){
        for (let i of images[x]) {
            formData.append("images", i);
        }
    }
    return formData
  }

  doSubmit = async ()=>{
    const  dataFromState  = {...this.state.data};
    const blogId = this.props.match.params.id; 
    const { data } = await getBlog(blogId);
    const {cardUrl, titleImgUrl, endImgUrl, landscapeImgUrl, profileImgUrl} = dataFromState
  
    try{
        if(cardUrl === undefined && titleImgUrl === undefined &&  endImgUrl === undefined &&  landscapeImgUrl === undefined && profileImgUrl === undefined ){
            dataFromState.cardUrl = data.cardUrl
            dataFromState.titleImgUrl = data.titleImgUrl
            dataFromState.endImgUrl = data.endImgUrl
            dataFromState.landscapeImgUrl = data.landscapeImgUrl
            dataFromState.profileImgUrl = data.profileImgUrl
            await editBlog(dataFromState);
            toast('הפרויקט עודכן בהצלחה!');
            return this.props.history.replace('/private-area/blogs-search-page')
        }
        const formData = this.upload( data)
        await editBlogWithPics(formData);
        toast('הפרויקט עודכן בהצלחה!');
        return this.props.history.replace('/private-area/blogs-search-page')    
        }catch(err){
            console.log(err.message);
    }
 };

    render() { 
        return (               
            <div className="edit-blog">

                <Titles titleBold='ערוך'
                        title= 'מאמר'
                        subTitle='כאן תוכל לערוך את המאמר, את השדות שמסומנים בכוכבית חובה למלא'
                         />
               
                <div className="container">
                    <div className="center">
                        <form className='col-10 bg-light rounded mb-4 pt-2' 
                         onSubmit={ this.handleSubmit } 
                         autoComplete='off' 
                         method='POST'>
                            { this.renderInput('title', 'שם המאמר *', true ) }
                            { this.renderInput('subTitle', ' כותרת משנה של המאמר *' ) }
                            { this.renderInput('author', 'כותב המאמר *') }
                            { this.renderSelectBox('category', 'בחר קטגוריה', [
                                    {text:'ארכיטקטורה', value:'architecture' },
                                    {text:'עיצוב פנים', value:'exterior-design' }, 
                                    {text:'ניהול פרויקטים', value:'Projects-Management' }]) }

                            { this.renderFileInput('cardUrl', 'העלה תמונה לכרטיס המאמר ביחס של 16:9 *') }
                            { this.renderInput('cardAlt', 'תיאור התמונה לכרטיס המאמר לצורך נגישות') }

                            { this.renderFileInput('titleImgUrl', 'העלה התמונה ראשית בגודל - 1920X650 *') }
                            { this.renderInput('titleImgAlt', 'תיאור התמונה הראשית *') }
                            { this.renderInput('titleImgCredit', 'קרדיט לצלם של התמונה הראשית') }
                            
                            { this.renderFileInput('endImgUrl', 'העלה התמונה סופית בגודל - 1920X800 *') }
                            { this.renderInput('endImgAlt', 'תיאור התמונה סופית *') }
                            { this.renderInput('endImgCredit', 'קרדיט לצלם של התמונה סופית') }

                            { this.renderInput('firstInnerTitle', 'כותרת ראשונה בגוף המאמר') }
                            { this.renderTextarea('firstP', 'פיסקה ראשונה') }
                            { this.renderTextarea('secondP', 'פיסקה שנייה') }
                            { this.renderTextarea('thirdP', 'פיסקה שלישית') }

                            { this.renderFileInput('landscapeImgUrl', 'העלה התמונה שנייה') }
                            { this.renderInput('landscapeImgAlt', 'תיאור התמונה שנייה') }
                            { this.renderInput('landscapeImgCredit', 'קרדיט לצלם של התמונה שנייה') }
                            { this.renderInput('secondInnerTitle', 'כותרת שנייה בגוף המאמר') }
                            { this.renderTextarea('foruthP', 'פיסקה רביעית') }
                            { this.renderTextarea('fifthP', 'פיסקה חמישית') }
                            { this.renderTextarea('sixthP', 'פיסקה שישית') }

                            { this.renderFileInput('profileImgUrl', 'העלה התמונה השלישית') }
                            { this.renderInput('profileImgAlt', 'תיאור התמונה השלישית') }
                            { this.renderInput('profileImgCredit', 'קרדיט לצלם של התמונה השלישית') }
                            { this.renderInput('thirdInnerTitle', 'כותרת שלישית בגוף המאמר') }
                            { this.renderTextarea('seventhP', 'פיסקה שביעית') }
                            { this.renderTextarea('eighthP', 'פיסקה שמינית') }
                            { this.renderTextarea('ninthP', 'פיסקה תשיעית') }

                            { this.renderButton('שלח', 'btn btn-lg btn-outline-dark btn-block my-3') }
                        </form>
                    </div>
                </div>                    
            </div>
        );
    }
}
 
export default EditBlog;