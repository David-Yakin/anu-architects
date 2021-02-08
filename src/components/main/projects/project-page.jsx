import React, { Component } from 'react';
import ALink from '../../common/a-link';
import { getMyProject } from '../../../services/projectService'
class Project extends Component {

    state = {  
        project: []
     }

     async componentDidMount(){
        const projectId = this.props.match.params.id; 
        const { data } = await getMyProject(projectId);
        this.setState({ project: data })

        // let {  counter, gallerys } = this.state.project;   
        // setInterval(()=>{ 
        //     counter = (++counter) % gallerys.length;
        //     this.setState({project: {...this.state.project, counter}})
        // }  ,4000 ); 
     }

    render() { 
        const { project } = this.state;
        // let { gallerys, counter } = this.state.project;
  
        return ( 
            <div className="container-fluid p-0">

                <img className="img-fluid"
                     src={project.urlPamorama} 
                     alt={project.altPamorama} 
                     />

                <div className="container pt-2">
                    <h2 className="text-right font-weight-light">{project.name}</h2>
                    <hr/>
                    <div className="row d-flex flex-row-reverse pb-3">

                        <div className="col-12 col-md-6 text-right px-0">
                            <div className="d-flex flex-row-reverse">
                            <div className="col-6 px-0">
                            
                                <h6 className="text-right">סוג הפרויקט:  
                                    <span className="font-weight-lighter"> {project.category}</span>
                                </h6>

                                <h6 className="text-right">מיקום: 
                                    <span className="font-weight-lighter"> {project.country} | {project.city}</span>
                                </h6>  

                            </div>

                            <div className="col-6 px-0">

                                <h6 className="text-right">שנה: 
                                    <span className="font-weight-lighter"> {project.year}</span>
                                </h6>

                                <h6 className="text-right">שטח: 
                                    <span className="font-weight-lighter"> {project.size} מ"ר</span>
                                </h6>      
                                                         
                            </div>
                            </div>
                        </div>


                        <div className="col-12 col-md-6 text-right px-0">
                            { project.description }
                        </div>

                    </div>

                    <div className="row pb-2">

                            <div className="col-12 col-md-6 px-1">
                            <img className='img-fluid' 
                                     src={ project.urlBefore } 
                                     alt={ project.altBefore } 
                                />
                                <p className='text-right'>{ project.desBefore }</p>
                            </div>

                            <div className="col-12 col-md-6 px-1">
                            <img className='img-fluid' 
                                     src={ project.urlSketch} 
                                     alt={ project.altSketch } 
                                />
                                <p className='text-right'>{ project.desSketch }</p>
                            </div>

                            <div className="col-12 col-md-6 px-1">
                            <img className='img-fluid' 
                                     src={ project.urlImaging } 
                                     alt={ project.altImaging } 
                                />
                                <p className='text-right'>{ project.desImaging }</p>
                            </div>

                            <div className="col-12 col-md-6 px-1">
                            <img className='img-fluid' 
                                     src={ project.urlConstraction } 
                                     alt={ project.altConstraction } 
                                />
                                <p className='text-right'>{ project.desConstraction }</p>
                            </div>

                    </div>

                    <div className="row">
                            {  <img className='img-fluid pb-3'
                                 src={ project.urlGallery }
                                 alt={ project.altGallery } /> }
                            {/* {  <img className='img-fluid pb-3'
                                 src={ gallerys[counter].url }
                                 alt={ gallerys[counter].alt } /> } */}
                    </div>
                                <div className="center pb-3">
                                    <ALink to='/projects/projects-search-page'  text='לפרויקטים נוספים' />
                                </div>
                </div>
   
            </div>
          
         );
    }
}
 
export default Project;
 