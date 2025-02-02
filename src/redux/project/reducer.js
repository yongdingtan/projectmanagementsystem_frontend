import { ACCEPT_INVITATION_REQUEST, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, FETCH_PROJECT_REQUEST, FETCH_PROJECT_SUCCESS, INVITE_TO_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS } from "./actionType";

const initialState = {
    project: [],
    loading: false,
    error: null,
    projectDetails: null,
    searchProjects: []
}

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECT_REQUEST:
        case CREATE_PROJECT_REQUEST:
        case DELETE_PROJECT_REQUEST:
        case FETCH_PROJECT_BY_ID_REQUEST:
        case ACCEPT_INVITATION_REQUEST:
        case INVITE_TO_PROJECT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_PROJECT_SUCCESS:
            return {
                ...state, loading: false, project: action.project,
                error: null
            }
        case SEARCH_PROJECT_SUCCESS:
            return {
                ...state,
                loading:false,
                searchProject: action.payload,
                error:null
            }
        case CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                loading:false,
                project: [...state.project, action.project],
                error:null
            }
        case FETCH_PROJECT_BY_ID_SUCCESS:
            return {
                ...state,
                loading:false,
                project: action.payload,
                error:null
            }
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                loading:false,
                project:state.project.filter(project => project.id !== action.projectId),
                error:null
            }

        default:
            return state;
    }
}
