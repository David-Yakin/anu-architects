import React, { Component } from "react";
import ALink from "../../common/a-link";
import { getProject } from "../../../services/projectService";
import { url } from "../../../config.json";

class Project extends Component {
  state = {
    data: undefined,
  };

  async componentDidMount() {
    const projectId = this.props.match.params.id;
    const { data } = await getProject(projectId);
    this.setState({ data });

    let { counter } = this.state.data;
    let { gallery } = this.state.data.images;
    setInterval(() => {
      counter = ++counter % gallery.length;
      this.setState({ data: { ...this.state.data, counter } });
    }, 4000);
  }

  render() {
    if (this.state.data !== undefined) {
      const { name, category, year, size, description, images, counter } =
        this.state.data;
      const { country, city } = this.state.data.address;

      return (
        <div className="container-fluid p-0">
          <img
            className="img-fluid"
            src={`${url}${images.panorama.url}`}
            alt={images.panorama.alt}
          />

          <div className="container pt-2">
            <h2 className="text-right font-weight-light">{name}</h2>
            <hr />
            <div className="row d-flex flex-row-reverse pb-3">
              <div className="col-12 col-md-6 text-right px-0">
                <div className="d-flex flex-row-reverse">
                  <div className="col-6 px-0">
                    <h6 className="text-right">
                      סוג הפרויקט:
                      <span className="font-weight-lighter"> {category}</span>
                    </h6>

                    <h6 className="text-right">
                      מיקום:
                      <span className="font-weight-lighter">
                        {" "}
                        {country} | {city}
                      </span>
                    </h6>
                  </div>

                  <div className="col-6 px-0">
                    <h6 className="text-right">
                      שנה:
                      <span className="font-weight-lighter"> {year}</span>
                    </h6>

                    <h6 className="text-right">
                      שטח:
                      <span className="font-weight-lighter"> {size} מ"ר</span>
                    </h6>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 text-right px-0">
                {description}
              </div>
            </div>

            <div className="row pb-2">
              <div className="col-12 col-md-6 px-1">
                <img
                  className="img-fluid"
                  src={`${url}${images.before[0].url}`}
                  alt={images.before[0].alt}
                />
                <p className="text-right">{images.before[0].description}</p>
              </div>

              <div className="col-12 col-md-6 px-1">
                <img
                  className="img-fluid"
                  src={`${url}${images.sketches[0].url}`}
                  alt={images.sketches[0].alt}
                />
                <p className="text-right">{images.sketches[0].description}</p>
              </div>

              <div className="col-12 col-md-6 px-1">
                <img
                  className="img-fluid"
                  src={`${url}${images.imaging[0].url}`}
                  alt={images.imaging[0].alt}
                />
                <p className="text-right">{images.imaging[0].description}</p>
              </div>

              <div className="col-12 col-md-6 px-1">
                <img
                  className="img-fluid"
                  src={`${url}${images.constraction[0].url}`}
                  alt={images.constraction[0].alt}
                />
                <p className="text-right">
                  {images.constraction[0].description}
                </p>
              </div>
            </div>

            <div className="row">
              {
                <img
                  className="img-fluid pb-3"
                  src={`${url}${images.gallery[counter]}`}
                  alt="תמונה מגלריית התמונות של הפרויקט"
                />
              }
            </div>
            <div className="center pb-3">
              <ALink
                to="/projects/projects-search-page"
                text="לפרויקטים נוספים"
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="center">
        <div>
          <h2>הפרויקט לא נמצא במאגר המידע</h2>
        </div>
      </div>
    );
  }
}

export default Project;
