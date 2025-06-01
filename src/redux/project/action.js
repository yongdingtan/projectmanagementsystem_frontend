 
import api from "../../config/api";
import {
    ACCEPT_INVITATION_FAILURE,
    ACCEPT_INVITATION_REQUEST,
    ACCEPT_INVITATION_SUCCESS,
    CREATE_PROJECT_FAILURE,
    CREATE_PROJECT_REQUEST,
    CREATE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    FETCH_PROJECT_BY_ID_FAILURE,
    FETCH_PROJECT_BY_ID_REQUEST,
    FETCH_PROJECT_BY_ID_SUCCESS,
    FETCH_PROJECT_FAILURE,
    FETCH_PROJECT_REQUEST,
    FETCH_PROJECT_SUCCESS,
    FETCH_TEAM_BY_ID_FAILURE,
    FETCH_TEAM_BY_ID_REQUEST,
    FETCH_TEAM_BY_ID_SUCCESS,
    INVITE_TO_PROJECT_FAILURE,
    INVITE_TO_PROJECT_REQUEST,
    INVITE_TO_PROJECT_SUCCESS,
    SEARCH_PROJECT_FAILURE,
    SEARCH_PROJECT_REQUEST,
    SEARCH_PROJECT_SUCCESS
} from "./actionType";

export const fetchProjects = ({ category, tag }) => async (dispatch) => {
    dispatch({ type: FETCH_PROJECT_REQUEST });

    try {
        const params = {};
        if (category && category !== "all") {
            params.category = category;
        }
        if (tag && tag !== "all") {
            params.tag = tag;
        }

        const { data } = await api.get("/api/project", {
            params});
        console.log("projects fetched: ", data)
        dispatch({ type: FETCH_PROJECT_SUCCESS, payload: data });
    } catch (error) {
        console.log("error: ", error)
        dispatch({ type: FETCH_PROJECT_FAILURE, payload: error.message });
    }
};

export const searchProjects = ({ keyword }) => async (dispatch) => {
    dispatch({ type: SEARCH_PROJECT_REQUEST });

    try {
        const token = localStorage.getItem("jwt");

        const { data } = await api.get(`/api/project/search?keyword=${keyword}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({ type: SEARCH_PROJECT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SEARCH_PROJECT_FAILURE, payload: error.message });
    }
};

export const createProject = (projectData) => async (dispatch) => {
    dispatch({ type: CREATE_PROJECT_REQUEST });

    try {
        const token = localStorage.getItem("jwt");

        const { data } = await api.post("/api/project", projectData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        console.log("project created: ", data)
        dispatch({ type: CREATE_PROJECT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_PROJECT_FAILURE, payload: error.message });
    }
};

export const fetchProjectById = (projectId) => async (dispatch) => {
    dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });

    try {
        const token = localStorage.getItem("jwt");

        const { data } = await api.get(`/api/project/${projectId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        console.log("project fetched: ", data)
        dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_PROJECT_BY_ID_FAILURE, payload: error.message });
    }
};

export const deleteProject = (projectId) => async (dispatch) => {
    dispatch({ type: DELETE_PROJECT_REQUEST });

    try {
        const token = localStorage.getItem("jwt");

        await api.delete(`/api/project/${projectId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        console.log("project deleted")
        dispatch({ type: DELETE_PROJECT_SUCCESS, payload: projectId });
    } catch (error) {
        dispatch({ type: DELETE_PROJECT_FAILURE, payload: error.message });
    }
};

export const inviteToProject = ({ email, projectId }) => async (dispatch) => {
    dispatch({ type: INVITE_TO_PROJECT_REQUEST });

    try {
        const token = localStorage.getItem("jwt");

        const { data } = await api.post("/api/project/invite", { email, projectId }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({ type: INVITE_TO_PROJECT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: INVITE_TO_PROJECT_FAILURE,
            payload: error.response ? error.response.data.message : "Failed to send invitation"
        });
    }
};

export const acceptInvitationToProject = ({ invitationToken, navigate }) => async (dispatch) => {
    dispatch({ type: ACCEPT_INVITATION_REQUEST });

    try {
        const { data, status } = await api.get(`/api/project/accept_invitation`, {
            params: { token: invitationToken },
        });

        if (status === 401) {
            // Handle unauthenticated user (redirect to login)
            const redirectUrl = data.redirect;
            navigate(redirectUrl);  // Redirect to login page
            return;  // Exit the function
        }

        // Ensure projectId is retrieved correctly
        const projectId = data.projectId || data.project?.id;

        if (projectId) {
            navigate(`/project/${projectId}`);  // Redirect to project page
            dispatch({ type: ACCEPT_INVITATION_SUCCESS, payload: data });
        } else {
            throw new Error("Invalid project data received");
        }

    } catch (error) {
        dispatch({ type: ACCEPT_INVITATION_FAILURE, payload: error.message });
    }
};

export const getTeamByProjectId = (projectId) => async (dispatch) => {
    dispatch({ type: FETCH_TEAM_BY_ID_REQUEST });

    try {
        const token = localStorage.getItem("jwt");

        const { data } = await api.get(`/api/project/${projectId}/team`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({ type: FETCH_TEAM_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_TEAM_BY_ID_FAILURE, payload: error.message });
    }
};
