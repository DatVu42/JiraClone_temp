
const stateDefault = {
    projectList: [ 
      ],
      arrProject: []
}





export const ProjectCyberBugsReducer= (state = stateDefault, action) => {
    switch(action.type) {
        
        case 'GET_LIST_PROJECT': {
            state.projectList = action.projectList;
            // console.log(action.projectList);
            return {...state}
        }

        case 'GET_ALL_PROJECT': {
          state.arrProject = action.arrProject;

          return {...state}
      }

        default : return {...state}
    }

}