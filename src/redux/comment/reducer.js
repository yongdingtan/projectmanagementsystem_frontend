import * as actionType from './actionType'

const initialState = {
    comments: [],
    loading: false,
    error: null
}

export const commentReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionType.CREATE_COMMENT_REQUEST:
        case actionType.DELETE_COMMENT_REQUEST:
        case actionType.FETCH_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error:null
            }
        case actionType.CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: [...state.comments, action.comment]
            }
        case actionType.DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: [state.comments.filter(comment => comment.id != action.commentId)]
            }
        case actionType.FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}
