import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {connect} from 'react-redux'
import * as Yup from 'yup';
import { projectCategoryAction } from "../../../redux/action/ProjectCategoryAction";
import { updateProjectAction } from "../../../redux/action/ProjectCyberBugsAction";

function FormEditProject(props) {
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory) 
        // console.log('arrProjectCategory',arrProjectCategory)
    const dispatch = useDispatch();

    const {
        values,
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;


    const submitForm = (e) => {
        e.preventDefault();
        alert('submit edit')
    }

    //componentDidMount
    useEffect(() => {

        //Goi api load project category
        dispatch(projectCategoryAction())

        //Load su kien submit len drawer nut submit
        dispatch({ type: 'SET_SUBMIT_EDIT_PROJECT', submitFunction: handleSubmit });


    },[])


    const handleEditorChange = (content) => {
        setFieldValue('description', content)
    }

  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">

          <div className="form-group">
            <p className="font-weight-bold">Project id</p>
            <input value={values.id} disabled className="form-control" name="id" />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project name</p>
            <input value={values.projectName} className="form-control" name="projectName" onChange={handleChange} />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select className="form-control" name="categoryId" value={values.categoryId}>
                {arrProjectCategory?.map((item,index)=>{
                //   console.log(arrProjectCategory,'arrProjectCategory')
                   return <option key={index} value={item.id}>{item.projectCategoryName}</option>
                })}
            </select>

          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor

              name="description123"
              value={values.description}
              init={{
                selector: "textarea#myTextArea",
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor |  alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}





const EditProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues:(props) => {
        const {projectEdit} = props;

        return{
           id:projectEdit?.id,
           projectName:projectEdit.projectName,
           description:projectEdit.description,
           categoryId:projectEdit.categoryId
        }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmiting}) => {
        console.log('values',values);
        props.dispatch(updateProjectAction(values))

    },
    displayName: 'EditProjectForm',
})(FormEditProject);

const mapStateToProps = (state) => ({
    //ko d??ng selector v?? l???y ????a v??o formik ch??? ko ph???i l???y ????a v??o component tr???c ti???p
    projectEdit: state.ProjectReducer.projectEdit   

})


export default connect(mapStateToProps)(EditProjectForm)

