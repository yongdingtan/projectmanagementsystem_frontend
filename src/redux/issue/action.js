import api from '../../config/api'
import * as actionType from './actionType'

export const fetchIssues = (id) => {
    return async (dispatch) => {
        dispatch({type: actionType.FETCH_ISSUES_REQUEST})
        try {
            const response = await api.get(`/api/issues/project/${id}`)
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
            const response = await api.get(`/api/issues/${id}`)
            console.log("Fetched issue by ID: ", response.data)
            dispatch({type: actionType.FETCH_ISSUES_BY_ID_SUCCESS, issues: response.data})
        } catch (error) {
            console.log(error)
            dispatch({type: actionType.FETCH_ISSUES_BY_ID_FAILURE, error: error.message})
        }
    }
}

export const updateIssueStatus = ({id, status}) => {
    return async (dispatch) => {
        dispatch({type: actionType.UPDATE_ISSUE_STATUS_REQUEST})
        try {
            const response = await api.put(`/api/issues/${id}/status/${status}`)
            console.log("Updated issue status: ", response.data)
            dispatch({type: actionType.UPDATE_ISSUE_STATUS_SUCCESS, issues: response.data})
        } catch (error) {
            console.log(error)
            dispatch({type: actionType.UPDATE_ISSUE_STATUS_FAILURE, error: error.message})
        }
    }
}

export const assignUserToIssue = ({issueId, userId}) => {
    return async (dispatch) => {
        dispatch({type: actionType.ASSIGNED_ISSUE_TO_USER_REQUEST})
        try {
            const response = await api.put(`/api/issues/${issueId}/assignee/${userId}`)
            console.log("Assigned issue: ", response.data)
            dispatch({type: actionType.ASSIGNED_ISSUE_TO_USER_SUCCESS, issue: response.data})
        } catch (error) {
            console.log(error)
            dispatch({type: actionType.ASSIGNED_ISSUE_TO_USER_FAILURE, error: error.message})
        }
    }
}