import * as actionType from './actionType';

const initialState = {
    comments: [],
    loading: false,
    error: null,
};

export const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        // Request cases
        case actionType.CREATE_COMMENT_REQUEST:
        case actionType.DELETE_COMMENT_REQUEST:
        case actionType.FETCH_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null, // Reset error on request
            };

        // Success cases
        case actionType.CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: [...state.comments, action.payload], // Add the new comment
            };

        case actionType.DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: state.comments.filter(comment => comment.id !== action.payload), // Remove the deleted comment
            };

        case actionType.FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: action.payload, // Set the fetched comments
                error: null, // Reset error on success
            };

        // Failure cases
        case actionType.CREATE_COMMENT_FAILURE:
        case actionType.DELETE_COMMENT_FAILURE:
        case actionType.FETCH_COMMENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload, // Set the error message
            };

        // Default case
        default:
            return state;
    }
};