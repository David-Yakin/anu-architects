import Titles from "../../../../common/titles";
import { url } from "../../../../../config.json";
import React, { useState, useEffect } from "react";
import { getProject } from "../../../../../services/projectService";
import { useParams } from "react-router-dom";
import WebViewer from "@pdftron/webviewer";
import { getCurrentUser } from "../../../../../services/userService";
import { Link, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteImage } from "../../../../../services/projectService";
import { toast } from "react-toastify";

const MyContracts = () => {
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
        setFiles(res.data.files.contracts);
      })
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    if (files.length > 0) {
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
  }, [files, viewerUrl, counter]);

  const handleImageDelete = async fileID => {
    Swal.fire({
      title: "?האם אתה בטוח",
      text: "!החוזה ימחק באופן סופי ממאגר המידע",
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
        deleteImage(filter, id, "delete-contracts");
        toast("הקובץ נמחק בהצלחה!");
      }
    });
  };

  if (!user) return <Redirect to="/private-area/sign-in" />;
  if (user && user.isAdmin | (user._id === project.userID))
    return (
      <div className="container">
        <Titles
          titleBold="חוזים"
          title=" "
          subTitle={`כאן תוכל לראות ${
            user.isAdmin ? "להוסיף ולמחוק " : ""
          }את החוזים של הפרויקט ${project.name}`}
        />

        {/********** PDF upload Link ************/}
        {user.isAdmin && (
          <div className="center pb-3">
            <Link
              to={`/private-area/project/uploadContracts/${id}`}
              className="btn btn-outline-success border border-dark col-12 col-md-6 ">
              &#10133; העלה חוזה חדש
            </Link>
          </div>
        )}

        {/********** PDF VIEWER ************/}
        <div className="web-viewer" id="viewer"></div>

        {/********** DELETE BUTTON ************/}
        {user.isAdmin && (
          <div className="center">
            <button
              className="btn btn-outline-danger col-12 col-md-6 my-4"
              onClick={() => handleImageDelete(reverseFiles[counter]._id)}>
              <i className="fas fa-trash-alt mr-2"></i> מחק את החוזה ממאגר המידע
            </button>
          </div>
        )}

        {/********** PDF Select Box ************/}
        {files !== undefined && (
          <div className="d-flex flex-row-reverse mt-2">
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
  return "no contracts found";
};

export default MyContracts;
