import Titles from "../../../../common/titles";
import { url } from "../../../../../config.json";
import React, { useState, useEffect } from "react";
import { getProject } from "../../../../../services/projectService";
import { useParams } from "react-router-dom";
import WebViewer from "@pdftron/webviewer";
import { getCurrentUser } from "../../../../../services/userService";
import { Link, Redirect } from "react-router-dom";

const ExpertInfo = () => {
  const { id, expertId } = useParams();
  const [project, setProject] = useState({});
  const [expert, setExpert] = useState();
  const user = getCurrentUser();
  // const [viewerUrl, setViewerUrl] = useState(`${url}/files/testing.pdf`);

  useEffect(() => {
    getProject(id)
      .then(res => {
        setProject(res.data);
      })
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    if (project.files !== undefined) {
      setExpert(() => {
        const { experts } = project.files;
        const expert = experts.filter(expert => {
          return (expert = expert._id === expertId);
        });
        return expert;
      });
    }
  }, [project]);

  useEffect(() => {
    if (expert !== undefined) {
      console.log(expert[0].file.url);

      WebViewer(
        {
          path: `${url}/lib`,
          initialDoc: `${url}${expert[0].file.url}`,
        },
        document.getElementById("viewer")
      )
        .then(async instance => {
          // const { docViewer } = instance;
          // docViewer.getDocument(viewerUrl);
        })
        .catch(error => console.log(error));
    }
  }, [expert]);
  // }, [expert, viewerUrl]);

  if (!user) return <Redirect to="/private-area/sign-in" />;
  if (user && user.isAdmin | (user._id === project.userID)) {
    if (expert !== undefined)
      return (
        <div className="container">
          <Titles
            titleBold="יועץ"
            title="או מומחה"
            subTitle={`כאן תוכל לראות את הטופס של היועץ ${expert[0].firstName} ${expert[0].lastName}`}
          />

          {/********** PDF VIEWER ************/}
          <div className="web-viewer" id="viewer"></div>

          {/********** PDF Select Box ************/}
          {expert.file !== undefined && (
            <div className="d-flex flex-row-reverse">
              <div className="col-12 col-md-6"></div>
            </div>
          )}

          {/********** Link to Prev Page ************/}
          <div className="center pb-3">
            <Link
              to={`/private-area/project/experts/${id}`}
              className="btn btn-outline-dark border border-dark mt-2 ">
              חזור ליועצים ומומחים
            </Link>
          </div>
        </div>
      );
    return "Loding Page";
  }
};

export default ExpertInfo;

// import React, { Component } from "react";

// class ExpertInfo extends Component {
//   state = {};
//   render() {
//     return <div>expert-info works!</div>;
//   }
// }

// export default ExpertInfo;
