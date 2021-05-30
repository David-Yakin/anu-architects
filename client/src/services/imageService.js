import http from "./httpService";
import { apiUrl } from "../config.json";


export function uploadImages( folder, projectName ) {
    return http.post(`${apiUrl}/uploads/images/${folder}`, projectName);
  }

// export function uploadImages(arrayOfImages, folder, projectName ) {
//     return http.post(`${apiUrl}/uploads/images/${folder}`, arrayOfImages, projectName);
//   }

