/**
 * Created by david2099 on 10/09/17.
 */
import { combineReducers } from 'redux';
import {
    GET_POSTS,
    GET_POST,
    GET_POST_COMMENTS,
    GET_ORDERED_POSTS_BY,
    GET_ORDERED_POST_COMMENTS_BY,
    DELETE_POST,
    GET_COMMENTS,
    GET_CATEGORY_POSTS,
    ADD_POST,
    EDIT_POST,
    GET_CATEGORIES,
    POST_VOTE,
    POSTS_VOTE,
    ADD_COMMENT,
    DELETE_COMMENT
} from '../actions'

import { sortRes } from '../utils/helpers'

function posts (state = {posts: [], sortBy: 'upVote', path: '/'}, action) {
    const orderBy = state.sortBy
    switch (action.type) {
        case GET_POSTS:
            return {...state, posts: sortRes(action.posts, orderBy)}
        case GET_CATEGORY_POSTS:
            return {...state,
                posts: sortRes(action.posts, orderBy),
                path: action.path
            }
        case GET_ORDERED_POSTS_BY:
            return {...state,
                posts: sortRes(action.posts, action.sortBy),
                sortBy: action.sortBy
            }
        case POSTS_VOTE:
            return {...state,
                posts: sortRes(state.posts.filter((post) => {
                    post.id !== action.post.id
                }).concat(action.post), orderBy)
            }
        default :
            return state
    }
}

function post (state =  { post: {}, comments: [], sortBy: 'upVote'}, action) {
    switch (action.type) {
        case GET_POST:
            return {...state, post: action.post }
        case POST_VOTE:
            return {...state, post: action.post }
        case DELETE_POST:
            return {...state, post: action.post }
        case GET_POST_COMMENTS:
            return {...state, comments: action.comments }
        case DELETE_COMMENT:
            return {...state, comments: state.comments.filter((comment) => {
                comment.id !== action.comment.id
            })}
        case GET_ORDERED_POST_COMMENTS_BY:
            return {...state,
                comments: sortRes(action.comments, action.sortBy),
                sortBy: action.sortBy
            }
        default:
            return state
    }
}

function comments (state = [], action) {
    switch (action.type) {
        case GET_COMMENTS:
            return action.comments
        default:
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
    post,
    comments,
    categories
});
