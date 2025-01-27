import api from "../../config/api"
import { ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, FETCH_PROJECT_REQUEST, FETCH_PROJECT_SUCCESS, INVITE_TO_PROJECT_REQUEST, INVITE_TO_PROJECT_SUCCESS, SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS } from "./actionType"

export const fetchProjects = ({category, tag}) => async(dispatch) => {

    dispatch({type:FETCH_PROJECT_REQUEST})
    try {
        const {data} = await api.get("/api/project", {params:{category, tag}})
        console.log("All projects: ", data)
        dispatch({type:FETCH_PROJECT_SUCCESS, project:data})
    } catch (error) {
        console.log(error)
    }
}

export const searchProjects = ({keyword}) => async(dispatch) => {

    dispatch({type:SEARCH_PROJECT_REQUEST})
    try {
        const {data} = await api.get("/api/project/search?keyword=" + keyword)
        console.log("Searched projects: ", data)
        dispatch({type:SEARCH_PROJECT_SUCCESS, project:data})
    } catch (error) {
        console.log(error)
    }
}

export const createProject = (projectData) => async(dispatch) => {

    dispatch({type:CREATE_PROJECT_REQUEST})
    try {
        const {data} = await api.post("/api/project" + projectData)
        console.log("Searched projects: ", data)
        dispatch({type:CREATE_PROJECT_SUCCESS, project:data})
    } catch (error) {
        console.log(error)
    }
}

export const fetchProjectById = (projectId) => async(dispatch) => {

    dispatch({type:FETCH_PROJECT_BY_ID_REQUEST})
    try {
        const {data} = await api.get("/api/project/" + projectId)
        console.log("Project: ", data)
        dispatch({type:FETCH_PROJECT_BY_ID_SUCCESS, projectId})
    } catch (error) {
        console.log(error)
    }
}

export const deleteProject = (projectId) => async(dispatch) => {

    dispatch({type:DELETE_PROJECT_REQUEST})
    try {
        const {data} = await api.delete("/api/project/" + projectId)
        console.log("Project: ", data)
        dispatch({type:DELETE_PROJECT_SUCCESS, projectId})
    } catch (error) {
        console.log(error)
    }
}

export const inviteToProject = ({email, projectId}) => async(dispatch) => {

    dispatch({type:INVITE_TO_PROJECT_REQUEST})
    try {
        const {data} = await api.post("/api/project/invite" + {email, projectId})
        console.log("Invitation sent: ", data)
        dispatch({type:INVITE_TO_PROJECT_SUCCESS, payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const acceptInvitationToProject = ({invitationToken, navigate}) => async(dispatch) => {

    dispatch({type:ACCEPT_INVITATION_REQUEST})
    try {
        const {data} = await api.get("/api/project/accept_invitation" + {params: {token: invitationToken}})
        navigate("/project/"+data.projectId)
        console.log("Invitation accepted: ", data)
        dispatch({type:ACCEPT_INVITATION_SUCCESS, payload:data})
    } catch (error) {
        console.log(error)
    }
}