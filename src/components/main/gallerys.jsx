import React, { Component } from 'react';
import Titles from '../common/titles';

class Gallery extends Component {

    state = { 
        counter: 0,
        lightBoxOn: false,

        smallImages: [
            {
                id: 0,
                url: '/images/gallery/small/1.jpg',
                alt: 'תמונה ראשונה בפרויקטים אחרונים', 
            },
            {
                id: 1,
                url: '/images/gallery/small/2.jpg',
                alt: 'תמונה שניה בפרויקטים אחרונים',                
            },
            {
                id: 2,
                url: '/images/gallery/small/3.jpg',
                alt: 'תמונה שלישית בפרויקטים אחרונים',
            },
            {
                id: 3,
                url: '/images/gallery/small/4.jpg',
                alt: 'תמונה רביעית בפרויקטים אחרונים',
            },
            {
                id: 4,
                url: '/images/gallery/small/5.jpg',
                alt: 'תמונה חמישית בפרויקטים אחרונים',
            },
        ],

        bigImage: [
            {
                url: '/images/gallery/big/1.jpg',
                alt: 'תמונה ראשונה בפרויקטים אחרונים', 
            },
            {
                url: '/images/gallery/big/2.jpg',
                alt: 'תמונה שניה בפרויקטים אחרונים',                
            },
            {
                url: '/images/gallery/big/3.jpg',
                alt: 'תמונה שלישית בפרויקטים אחרונים',
            },
            {
                url: '/images/gallery/big/4.jpg',
                alt: 'תמונה רביעית בפרויקטים אחרונים',
            },
            {
                url: '/images/gallery/big/5.jpg',
                alt: 'תמונה חמישית בפרויקטים אחרונים',
            },
            {
                url: '/images/gallery/big/6.jpg',
                alt: 'תמונה שישית בפרויקטים אחרונים', 
            },
            {
                url: '/images/gallery/big/7.jpg',
                alt: 'תמונה שביעית בפרויקטים אחרונים',                
            },
            {
                url: '/images/gallery/big/8.jpg',
                alt: 'תמונה שמינית בפרויקטים אחרונים',
            },
            {
                url: '/images/gallery/big/9.jpg',
                alt: 'תמונה תשיעית בפרויקטים אחרונים',
            },
            {
                url: '/images/gallery/big/10.jpg',
                alt: 'תמונה עשירית בפרויקטים אחרונים',
            },
        ]
     }

    gallery(num){
    const { smallImages } = this.state;
      return(
         <img 
             className="img-fluid" 
             src={smallImages[num].url} 
             alt={smallImages[num].alt}
             onClick={()=> this.isLightBoxOn(smallImages[num].id)}/> 
      )  
    }

    renderGallery(){
    return (
    <div className="center">
        <div className="row col-12 col-xl-10 pb-5 justify-content-between px-0">

            <div className="galleryProjectImage col-12 col-md-6 py-2">
                {this.gallery(0)}
            </div>

            <div className="col-12 col-md-6 px-2">

                <div className="row col-12 p-0 justify-content-between mx-0">
                    <div className="galleryProjectImage col-6 p-2">
                        {this.gallery(1)}
                    </div>

                    <div className="galleryProjectImage col-6 p-2">
                        {this.gallery(2)}
                    </div>
                </div>

                <div className="row col-12 p-0 justify-content-between mx-0">
                    <div className="galleryProjectImage col-6 p-2">
                        {this.gallery(3)}
                    </div>

                    <div className="galleryProjectImage col-6 p-2">
                            {this.gallery(4)}
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}

     onArrowClick(symbol) {     
        let { counter, bigImage } = this.state;   

        if (symbol === '+') counter !== bigImage.length - 1 ? counter ++ : counter = 0;
        else  counter !== 0 ? counter -- : counter = bigImage.length - 1;
        this.setState({ counter }); 
    }

    isLightBoxOn(num){
        const { lightBoxOn } = this.state;
        lightBoxOn ? this.setState({ lightBoxOn: false }) : this.setState({ lightBoxOn: true, counter: num });
        }
        
    renderLightBox(){
        let { bigImage, counter } = this.state;
        return (
            <React.Fragment>
            <div className="container px-0">
                <i id="id_x" className="fa fa-times position-fixed" onClick={()=>this.isLightBoxOn()}></i>
        
                
                <div className="center position-fixed ">
                    <div className="col-12 p-0">
                        <img className="img-fluid" 
                             src={ bigImage[counter].url } 
                             alt={ bigImage[counter].alt }
                             />
                    </div>
                </div>
               
                <button className="prev position-fixed" 
                        onClick={()=> this.onArrowClick('-')}
                        >&#10094;
                </button>
        
                <button className="next position-fixed" 
                        onClick={()=> this.onArrowClick('+')}
                        >&#10095;
                </button>
            </div>
        
            <div id="id_backgroun_mask" className="background_mask"></div>
            <div id="login-lightbox"></div>
        </React.Fragment>
        )

    }

    render() { 
        const { lightBoxOn } = this.state;

        return ( 
            <div id="gallery" className="gallery container-fluid px-0">
                <div className='px-2'>

                    <Titles titleBold='גלריית'
                        title= 'תמונות'
                        subTitle='ראיתם תמונה שאהבתם? לחצו עליה ותוכלו להתרשם ממנה ומתמונות נוספות מפרויקטים של אנו אדריכלים '
                        BoldColor='#BDC8CB'
                        titleColor='#BDC8CB'
                        subColor='#BDC8CB'
                        // className=''
                        />
                </div>

                {this.renderGallery()}

                {lightBoxOn&& this.renderLightBox(this.state.counter)}
                
            </div>
         );
    }
}
 
export default Gallery;