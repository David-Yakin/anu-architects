import Titles from "../../../../common/titles";
import { url } from "../../../../../config.json";
import React, { useState, useEffect } from "react";
import {
  getProject,
  deleteImage,
} from "../../../../../services/projectService";
import { useParams } from "react-router-dom";
import WebViewer from "@pdftron/webviewer";
import { getCurrentUser } from "../../../../../services/userService";
import { Link, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyLicensing = () => {
  const [project, setProject] = useState({});
  const [counter, setCounter] = useState(0);
  const [files, setFiles] = useState([]);
  const { id } = useParams();
  const user = getCurrentUser();
  const [viewerUrl, setViewerUrl] = useState(`${url}/files/testing.pdf`);
  const reverseFiles = files.concat().reverse();

  useEffect(() => {
    getProject(id)
      .then(res => {
        setProject(res.data);
        setFiles(res.data.files.licensing);
      })
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      // setCounter(files.length - 1);
      WebViewer(
        {
          path: `${url}/lib`,
          initialDoc: `${url}${reverseFiles[counter].url}`,
        },
        document.getElementById("viewer")
      )
        .then(async instance => {
          const { docViewer } = instance;
          docViewer.getDocument(viewerUrl);
        })
        .catch(error => console.log(error));
    }
  }, [files, viewerUrl, counter, reverseFiles]);

  const handleImageDelete = async fileID => {
    Swal.fire({
      title: "?האם אתה בטוח",
      text: "!טופס הרישוי ימחק באופן סופי ממאגר המידע",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "כן, אני רוצה למחוק!",
      cancelButtonText: "בטל",
    }).then(result => {
      if (result.isConfirmed) {
        const filter = files.filter(file => file._id !== fileID);
        setFiles(filter);
        setCounter(filter.length - 1);
        deleteImage(filter, id, "delete-licensing");
        toast("הקובץ נמחק בהצלחה!");
      }
    });
  };

  if (!user) return <Redirect to="/private-area/sign-in" />;
  if (user && user.isAdmin | (user._id === project.userID))
    return (
      <div className="container">
        <Titles
          titleBold="טופסי"
          title="רישוי"
          subTitle={`כאן תוכל לראות ${
            user.isAdmin && "להוסיף ולמחוק "
          }את טופסי הרישוי של הפרויקט ${project.name}`}
        />

        {/********** PDF upload Link ************/}
        <div className="center pb-3">
          <Link
            to={`/private-area/project/uploadLicensing/${id}`}
            className="btn btn-outline-success border border-dark col-12 col-md-6 ">
            &#10133; העלה טופס רישוי חדש
          </Link>
        </div>

        {/********** PDF VIEWER ************/}
        <div className="web-viewer" id="viewer"></div>

        {/********** DELETE BUTTON ************/}
        <div className="center">
          <button
            className="btn btn-outline-danger col-12 col-md-6 my-4"
            onClick={() => handleImageDelete(reverseFiles[counter]._id)}>
            <i className="fas fa-trash-alt mr-2"></i> מחק את טופס הרישוי ממאגר
            המידע
          </button>
        </div>

        {/********** PDF Select Box ************/}
        {files !== undefined && (
          <div className="d-flex flex-row-reverse">
            <div className="col-12 col-md-6">
              <h2 className="text-rtl h3Title ">בחר קובץ</h2>
              <select
                id="select"
                className="col-12 text-rtl px-0 mb-2 "
                onChange={e => {
                  setCounter(e.target.value);
                  setViewerUrl(`${url}${files[counter].url}`);
                }}>
                {reverseFiles.map((file, index) => (
                  <option value={index} key={index}>
                    {file.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/********** Link to Prev Page ************/}
        <div className="center pb-3">
          <Link
            to={`/private-area/user/${project.userID}`}
            className="btn btn-outline-dark border border-dark mt-2 ">
            חזור לכרטיס המשתמש
          </Link>
        </div>
      </div>
    );
};

export default MyLicensing;
