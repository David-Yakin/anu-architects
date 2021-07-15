import React from "react";
import Titles from "../../common/titles";
import Form from "../../common/form";
import Joi from "joi-browser";
import { createBlog } from "../../../services/blogService";
import { toast } from "react-toastify";

class CeateBlog extends Form {
  state = {
    data: {
      title: "",
      subTitle: "",
      author: "",
      category: "",

      cardUrl: "",
      cardAlt: "",

      titleImgUrl: "",
      titleImgAlt: "",
      titleImgCredit: "",

      endImgUrl: "",
      endImgAlt: "",
      endImgCredit: "",

      firstInnerTitle: "",
      firstP: "",
      secondP: "",
      thirdP: "",

      landscapeImgUrl: "",
      landscapeImgAlt: "",
      landscapeImgCredit: "",
      secondInnerTitle: "",
      foruthP: "",
      fifthP: "",
      sixthP: "",

      profileImgUrl: "",
      profileImgAlt: "",
      profileImgCredit: "",
      thirdInnerTitle: "",
      seventhP: "",
      eighthP: "",
      ninthP: "",
    },
    errors: {},
    images: [],
  };

  schema = {
    title: Joi.string().required().min(2).max(255).label("title"),
    subTitle: Joi.string().required().min(2).max(255).label("subTitle"),
    author: Joi.string().required().min(2).max(255).label("author"),
    category: Joi.string().required().min(2).max(255).label("category"),

    cardUrl: Joi.string().required().min(2).max(255).label("cardUrl"),
    cardAlt: Joi.string().required().min(2).max(255).label("cardAlt"),

    titleImgUrl: Joi.string().required().min(2).max(255).label("titleImgUrl"),
    titleImgAlt: Joi.string().required().min(2).max(255).label("titleImgAlt"),
    titleImgCredit: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label("titleImgCredit"),

    endImgUrl: Joi.string().required().min(2).max(255).label("endImgUrl"),
    endImgAlt: Joi.string().required().min(2).max(255).label("endImgAlt"),
    endImgCredit: Joi.string().required().min(2).max(255).label("endImgCredit"),

    firstInnerTitle: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label("firstInnerTitle"),
    firstP: Joi.string().required().min(2).max(1024).label("firstP"),
    secondP: Joi.string().required().min(2).max(1024).label("secondP"),
    thirdP: Joi.string().required().min(2).max(1024).label("thirdP"),

    landscapeImgUrl: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label("landscapeImgUrl"),
    landscapeImgAlt: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label("landscapeImgAlt"),
    landscapeImgCredit: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label("landscapeImgCredit"),
    secondInnerTitle: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label("secondInnerTitle"),
    foruthP: Joi.string().required().min(2).max(1024).label("foruthP"),
    fifthP: Joi.string().required().min(2).max(1024).label("fifthP"),
    sixthP: Joi.string().required().min(2).max(1024).label("sixthP"),

    profileImgUrl: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label("profileImgUrl"),
    profileImgAlt: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label("profileImgAlt"),
    profileImgCredit: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label("profileImgCredit"),
    thirdInnerTitle: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label("thirdInnerTitle"),
    seventhP: Joi.string().required().min(2).max(1024).label("seventhP"),
    eighthP: Joi.string().required().min(2).max(1024).label("eighthP"),
    ninthP: Joi.string().required().min(2).max(1024).label("ninthP"),
  };

  checkTitle = title => {
    return title.replace(/\s/g, "-");
  };

  categoryCheck = value => {
    if (value === "urban-renewal") return "התחדשות עירונית";
    if (value === "mixing-uses") return "עירוב שימושים";
    if (value === "residencet-ways") return "צורות מגורים";
    if (value === "interior-design") return "עיצוב פנים";
    if (value === "space-dressing") return "הלבשת החלל";
    if (value === "do-it-yourself") return "עשה זאת בעצמך";
    if (value === "society-community") return "חברה וקהילה";
    if (value === "micro-unit") return "מיקרו יוניט";
    if (value === "structural-engineering") return "הנדסת בניין";
    if (value === "plumbing") return "אינסטלציה";
    if (value === "electricity") return "חשמל";
    if (value === "lighting") return "תאורה";
    if (value === "concept") return "קונספט";
    if (value === "we-live") return "We live";
    if (value === "urban-planning") return "תכנון עירוני";
    if (value === "construction-evacuation") return "פינוי בינוי";
    if (value === "tenants") return "דיירים";
    if (value === "house-committee") return "ועד בית";
    if (value === "sealing") return "איטום";
    if (value === "insulation") return "בידוד";
    if (value === "cover") return "חיפוי";
    if (value === "tourism-architecture") return "תיירות וארכיטקטורה";
    if (value === "construction-methods") return "שיטות בניה";
    if (value === "timeless-architecture") return "אדריכלות אל זמנית";
    if (value === "architecture-music") return "אדריכלות ומוסיקה";
    if (value === "engineering-innovations") return "חידושים הנדסיים";
    if (value === "materials") return "חומרים";
    if (value === "planning-flexibility") return "גמישות תכנונית";
    if (value === "construction-law") return "חוקים ובניה";
  };

  upload = () => {
    const {
      title,
      subTitle,
      author,
      category,
      cardUrl,
      cardAlt,
      titleImgUrl,
      titleImgAlt,
      titleImgCredit,
      endImgUrl,
      endImgAlt,
      endImgCredit,
      firstInnerTitle,
      firstP,
      secondP,
      thirdP,
      landscapeImgUrl,
      landscapeImgAlt,
      landscapeImgCredit,
      secondInnerTitle,
      foruthP,
      fifthP,
      sixthP,
      profileImgUrl,
      profileImgAlt,
      profileImgCredit,
      thirdInnerTitle,
      seventhP,
      eighthP,
      ninthP,
    } = this.state.data;
    const { images } = this.state;
    const titleChecked = this.checkTitle(title.trim());

    const formData = new FormData();
    formData.append("title", titleChecked);
    formData.append("subTitle", subTitle.trim());
    formData.append("author", author.trim());
    formData.append("category", category.trim());
    formData.append("categoryAlt", this.categoryCheck(category));
    formData.append("cardUrl", cardUrl.trim());
    formData.append("cardAlt", cardAlt.trim());
    formData.append("titleImgUrl", titleImgUrl.trim());
    formData.append("titleImgAlt", titleImgAlt.trim());
    formData.append("titleImgCredit", titleImgCredit.trim());
    formData.append("endImgUrl", endImgUrl.trim());
    formData.append("endImgAlt", endImgAlt.trim());
    formData.append("endImgCredit", endImgCredit.trim());
    formData.append("firstInnerTitle", firstInnerTitle.trim());
    formData.append("firstP", firstP.trim());
    formData.append("secondP", secondP.trim());
    formData.append("thirdP", thirdP.trim());
    formData.append("landscapeImgUrl", landscapeImgUrl.trim());
    formData.append("landscapeImgAlt", landscapeImgAlt.trim());
    formData.append("landscapeImgCredit", landscapeImgCredit.trim());
    formData.append("secondInnerTitle", secondInnerTitle.trim());
    formData.append("foruthP", foruthP.trim());
    formData.append("fifthP", fifthP.trim());
    formData.append("sixthP", sixthP.trim());
    formData.append("profileImgUrl", profileImgUrl.trim());
    formData.append("profileImgAlt", profileImgAlt.trim());
    formData.append("profileImgCredit", profileImgCredit.trim());
    formData.append("thirdInnerTitle", thirdInnerTitle.trim());
    formData.append("seventhP", seventhP.trim());
    formData.append("eighthP", eighthP.trim());
    formData.append("ninthP", ninthP.trim());

    for (let x = 0; x < images.length; x++) {
      for (let i of images[x]) {
        formData.append("images", i);
      }
    }
    return formData;
  };

  doSubmit = async e => {
    const formData = this.upload();
    try {
      await createBlog(formData);
      toast("המאמר נוצר בהצלחה");
      this.props.history.replace("/private-area/blogs-search-page");
    } catch (err) {
      toast("ארעה שגיאה - הפרויקט לא נשמר");
      this.setState({
        errors: { title: "error.message" },
      });
    }
  };

  render() {
    return (
      <div className="create-blog">
        <Titles
          titleBold="צור"
          title="מאמר חדש"
          subTitle="כאן תוכל ליצור מאמר חדש, את השדות שמסומנים בכוכבית חובה למלא"
          subColor="white"
          BoldColor="white"
          titleColor="white"
        />

        <div className="container">
          <div className="center">
            <form
              className="col-10 bg-light rounded mb-4 pt-2"
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST">
              {this.renderInput("title", "שם המאמר *")}
              {this.renderInput("subTitle", " כותרת משנה של המאמר *")}
              {this.renderInput("author", "כותב המאמר *")}
              {this.renderSelectBox("category", "בחר קטגוריה", [
                { text: "התחדשות עירונית", value: "urban-renewal" },
                { text: "עירוב שימושים", value: "mixing-uses" },
                { text: "צורות מגורים", value: "residencet-ways" },
                { text: "עיצוב פנים", value: "interior-design" },
                { text: "הלבשת החלל", value: "space-dressing" },
                { text: "עשה זאת בעצמך", value: "do-it-yourself" },
                { text: "חברה וקהילה", value: "society-community" },
                { text: "מיקרו יוניט", value: "micro-unit" },
                { text: "הנדסת בניין", value: "structural-engineering" },
                { text: "אינסטלציה", value: "plumbing" },
                { text: "חשמל", value: "electricity" },
                { text: "תאורה", value: "lighting" },
                { text: "קונספט", value: "concept" },
                { text: "We live", value: "we-live" },
                { text: "תכנון עירוני", value: "urban-planning" },
                { text: "פינוי בינוי", value: "construction-evacuation" },
                { text: "דיירים", value: "tenants" },
                { text: "ועד בית", value: "house-committee" },
                { text: "איטום", value: "sealing" },
                { text: "בידוד", value: "insulation" },
                { text: "חיפוי", value: "cover" },
                { text: "תיירות וארכיטקטורה", value: "tourism-architecture" },
                { text: "שיטות בניה", value: "construction-methods" },
                { text: "אדריכלות אל זמנית", value: "timeless-architecture" },
                { text: "אדריכלות ומוסיקה", value: "architecture-music" },
                { text: "חידושים הנדסיים", value: "engineering-innovations" },
                { text: "חומרים", value: "materials" },
                { text: "גמישות תכנונית", value: "planning-flexibility" },
                { text: "חוקים ובניה", value: "construction-law" },
                "col-4 mb-2 px-2",
              ])}
              {this.renderFileInput(
                "cardUrl",
                "העלה תמונה לכרטיס המאמר ביחס של 16:9 *"
              )}
              {this.renderInput(
                "cardAlt",
                "תיאור התמונה לכרטיס המאמר לצורך נגישות"
              )}
              {this.renderFileInput(
                "titleImgUrl",
                "העלה התמונה ראשית ביחס של - 1920X650 *"
              )}
              {this.renderInput("titleImgAlt", "תיאור התמונה הראשית *")}
              {this.renderInput(
                "titleImgCredit",
                "קרדיט לצלם של התמונה הראשית"
              )}
              {this.renderFileInput(
                "endImgUrl",
                "העלה התמונה סופית ביחס של - 1920X800 *"
              )}
              {this.renderInput("endImgAlt", "תיאור התמונה סופית *")}
              {this.renderInput("endImgCredit", "קרדיט לצלם של התמונה סופית")}
              {this.renderInput("firstInnerTitle", "כותרת ראשונה בגוף המאמר")}
              {this.renderTextarea("firstP", "פיסקה ראשונה")}
              {this.renderTextarea("secondP", "פיסקה שנייה")}
              {this.renderTextarea("thirdP", "פיסקה שלישית")}
              {this.renderFileInput("landscapeImgUrl", "העלה התמונה שנייה")}
              {this.renderInput("landscapeImgAlt", "תיאור התמונה שנייה")}
              {this.renderInput(
                "landscapeImgCredit",
                "קרדיט לצלם של התמונה שנייה"
              )}
              {this.renderInput("secondInnerTitle", "כותרת שנייה בגוף המאמר")}
              {this.renderTextarea("foruthP", "פיסקה רביעית")}
              {this.renderTextarea("fifthP", "פיסקה חמישית")}
              {this.renderTextarea("sixthP", "פיסקה שישית")}
              {this.renderFileInput("profileImgUrl", "העלה התמונה השלישית")}
              {this.renderInput("profileImgAlt", "תיאור התמונה השלישית")}
              {this.renderInput(
                "profileImgCredit",
                "קרדיט לצלם של התמונה השלישית"
              )}
              {this.renderInput("thirdInnerTitle", "כותרת שלישית בגוף המאמר")}
              {this.renderTextarea("seventhP", "פיסקה שביעית")}
              {this.renderTextarea("eighthP", "פיסקה שמינית")}
              {this.renderTextarea("ninthP", "פיסקה תשיעית")}
              {this.renderButton(
                "צור מאמר",
                "btn btn-lg btn-outline-dark btn-block my-3"
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CeateBlog;
