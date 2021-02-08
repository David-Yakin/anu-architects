import { toast } from 'react-toastify';
import { changProjectLike } from '../../services/projectService'

export const handleLike = ({project}) => {
    if(!project.isLiked) {
        this.setState({ project: project.isLiked = true })
        toast('הפרוייטק נבחר לרשימת המועדפים שלך');
        return changProjectLike(project._id);
    } 
    this.setState({ project: project.isLiked = false })
    toast('הפרוייטק הוצא מרשימת המועדפים שלך');
    return changProjectLike(project._id);
}

export default handleLike;

/*
state = {
    projects:[] ,
}

     async componentDidMount(){
        const { data } = await getProjects();
        this.setState({ projects : data});
        }
*/