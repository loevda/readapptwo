/**
 * Created by david2099 on 10/09/17.
 */
import { combineReducers } from 'redux';
import {
    GET_POSTS,
    GET_POST,
    GET_CATEGORY_POSTS,
    ADD_POST,
    EDIT_POST,
    GET_CATEGORIES,
    POST_VOTE,
    ADD_COMMENT
} from '../actions'



function posts (state = {}, action) {
    switch (action.type) {
        default :
            return state
    }
}

function categories(state = [], action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return action.categories
        default:
            return state
    }
}

export default combineReducers({
    posts,
    categories
});
