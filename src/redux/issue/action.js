import api from '../../config/api'
import * as actionType from './actionType'

export const createIssue = (issueData) => {
    return async (dispatch) => {
        dispatch({type: actionType.CREATE_ISSUE_REQUEST})
        try {
            console.log(issueData)
            const response = await api.post(`/api/issue`, issueData)
            console.log("Created issue: ", response.data)
            dispatch({type: actionType.CREATE_ISSUE_SUCCESS, issues: response.data})
        } catch (error) {
            console.log(error)
            dispatch({type: actionType.CREATE_ISSUE_FAILURE, error: error.message})
        }
    }
}

export const fetchIssues = (id) => {
    return async (dispatch) => {
        dispatch({type: actionType.FETCH_ISSUES_REQUEST})
        try {
            const response = await api.get(`/api/issue/project/${id}`)
            console.log("Fetched issues: ", response.data)
            dispatch({type: actionType.FETCH_ISSUES_SUCCESS, issues: response.data})
        } catch (error) {
            console.log(error)
            dispatch({type: actionType.FETCH_ISSUES_FAILURE, error: error.message})
        }
    }
}

export const fetchIssueById = (id) => {
    return async (dispatch) => {
        dispatch({type: actionType.FETCH_ISSUES_BY_ID_REQUEST})
        try {
            const response = await api.get(`/api/issue/${id}`)
            console.log("Fetched issue by ID: ", response.data)
            dispatch({type: actionType.FETCH_ISSUES_BY_ID_SUCCESS, issues: response.data})
        } catch (error) {
            console.log(error)
            dispatch({type: actionType.FETCH_ISSUES_BY_ID_FAILURE, error: error.message})
        }
    }
}

export const updateIssueStatus = (id, status) => {
    return async (dispatch) => {
        dispatch({type: actionType.UPDATE_ISSUE_STATUS_REQUEST})
        try {
            const response = await api.put(`/api/issue/${id}/status/${status}`)
            console.log("Updated issue status: ", response.data)
            dispatch({type: actionType.UPDATE_ISSUE_STATUS_SUCCESS, issues: response.data})
        } catch (error) {
            console.log(error)
            dispatch({type: actionType.UPDATE_ISSUE_STATUS_FAILURE, error: error.message})
        }
    }
}

export const deleteIssue = (id) => {
    return async (dispatch) => {
        dispatch({type: actionType.DELETE_ISSUE_REQUEST})
        try {
            const { data } = await api.delete(`/api/issue/${id}`)
            console.log("Issue deleted: ", data)
            dispatch({type: actionType.DELETE_ISSUE_SUCCESS})
        } catch (error) {
            console.log(error)
            dispatch({type: actionType.DELETE_ISSUE_FAILURE, error: error.message})
        }
    }
}

export const assignUserToIssue = ({issueId, userId}) => {
    return async (dispatch) => {
        dispatch({type: actionType.ASSIGNED_ISSUE_TO_USER_REQUEST})
        try {
            const response = await api.put(`/api/issue/${issueId}/assignee/${userId}`)
            console.log("Assigned issue: ", response.data)
            dispatch({type: actionType.ASSIGNED_ISSUE_TO_USER_SUCCESS, issue: response.data})
        } catch (error) {
            console.log(error)
            dispatch({type: actionType.ASSIGNED_ISSUE_TO_USER_FAILURE, error: error.message})
        }
    }
}