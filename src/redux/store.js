import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./auth/reducer";
import { projectReducer } from "./project/reducer";
import ChatReducer from "./chat/reducer";
import { commentReducer } from "./comment/reducer";
import { issueReducer } from "./issue/reducer";
import { subscriptiontReducer } from "./subscription/reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    chat: ChatReducer,
    comment: commentReducer,
    issue: issueReducer,
    subscription: subscriptiontReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))