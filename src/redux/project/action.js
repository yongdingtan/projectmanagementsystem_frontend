/* eslint-disable no-unused-vars */
import api from "../../config/api"
import { ACCEPT_INVITATION_FAILURE, ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, CREATE_PROJECT_FAILURE, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECT_BY_ID_FAILURE, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, FETCH_PROJECT_FAILURE, FETCH_PROJECT_REQUEST, FETCH_PROJECT_SUCCESS, FETCH_TEAM_BY_ID_FAILURE, FETCH_TEAM_BY_ID_REQUEST, FETCH_TEAM_BY_ID_SUCCESS, INVITE_TO_PROJECT_FAILURE, INVITE_TO_PROJECT_REQUEST, INVITE_TO_PROJECT_SUCCESS, SEARCH_PROJECT_FAILURE, SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS } from "./actionType"

export const fetchProjects = ({ category, tag }) => async (dispatch) => {

    dispatch({ type: FETCH_PROJECT_REQUEST });
    try {
        const params = {}; // Always include the tag
        if (category && category !== "all") {
            params.category = category; // Include category only if it's not "all"
        }
        if (tag && tag !== "all") {
            params.tag = tag; // Include tag only if it's not "all"
        }
        const { data } = await api.get("/api/project", { params });
        console.log("All projects: ", data);
        dispatch({ type: FETCH_PROJECT_SUCCESS, payload: data }); // Use payload instead of project for consistency
    } catch (error) {
        console.log(error);
        dispatch({ type: FETCH_PROJECT_FAILURE, payload: error.message });
    }
};

export const searchProjects = ({ keyword }) => async (dispatch) => {

    dispatch({ type: SEARCH_PROJECT_REQUEST })
    try {
        const { data } = await api.get("/api/project/search?keyword=" + keyword)
        console.log("Searched projects: ", data)
        dispatch({ type: SEARCH_PROJECT_SUCCESS, project: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: SEARCH_PROJECT_FAILURE, payload: error.message })
    }
}

export const createProject = (projectData) => async (dispatch) => {

    dispatch({ type: CREATE_PROJECT_REQUEST })
    try {
        const { data } = await api.post("/api/project", projectData)
        console.log("Created project: ", data)
        dispatch({ type: CREATE_PROJECT_SUCCESS, project: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: CREATE_PROJECT_FAILURE, payload: error.message })
    }
}

export const fetchProjectById = (projectId) => async (dispatch) => {

    dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST })
    try {
        const { data } = await api.get("/api/project/" + projectId)
        console.log("Project: ", data)
        dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, payload: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: FETCH_PROJECT_BY_ID_FAILURE, payload: error.message })
    }
}

export const deleteProject = (projectId) => async (dispatch) => {

    dispatch({ type: DELETE_PROJECT_REQUEST })
    try {
        const { data } = await api.delete("/api/project/" + projectId)
        console.log("Project: ", data)
        dispatch({ type: DELETE_PROJECT_SUCCESS, projectId })
    } catch (error) {
        console.log(error)
        dispatch({ type: DELETE_PROJECT_FAILURE, payload: error.message })
    }
}

export const inviteToProject = ({ email, projectId, jwt }) => async (dispatch, getState) => {
    dispatch({ type: INVITE_TO_PROJECT_REQUEST });

    try {
        console.log("Token: ", jwt);
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        };

        const { data } = await api.post("/api/project/invite", { email, projectId }, config);
        console.log("Invitation sent: ", data);
        dispatch({ type: INVITE_TO_PROJECT_SUCCESS, payload: data });
    } catch (error) {
        console.log(error);
        dispatch({
            type: INVITE_TO_PROJECT_FAILURE,
            payload: error.response ? error.response.data.message : "Failed to send invitation",
        });
    }
};

export const acceptInvitationToProject = ({ invitationToken, navigate }) => async (dispatch) => {

    dispatch({ type: ACCEPT_INVITATION_REQUEST })
    try {
        const { data } = await api.get("/api/project/accept_invitation" + { params: { token: invitationToken } })
        navigate("/project/" + data.projectId)
        console.log("Invitation accepted: ", data)
        dispatch({ type: ACCEPT_INVITATION_SUCCESS, payload: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: ACCEPT_INVITATION_FAILURE, payload: error.message })
    }
}


export const getTeamByProjectId = (projectId) => async (dispatch) => {

    dispatch({ type: FETCH_TEAM_BY_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/project/${projectId}/team`, projectId)
        console.log("Team members: ", data)
        dispatch({ type: FETCH_TEAM_BY_ID_SUCCESS, payload: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: FETCH_TEAM_BY_ID_FAILURE, payload: error.message })
    }
}