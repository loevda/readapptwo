/**
 * Created by david2099 on 10/09/17.
 */
import { combineReducers } from 'redux';
import {
    GET_CATEGORIES,
    GET_POSTS,
    GET_POST,
    GET_POST_COMMENTS,
    GET_ORDERED_POSTS_BY,
    GET_ORDERED_POST_COMMENTS_BY,
    DELETE_POST,
    ADD_POST,
    EDIT_POST,
    EDIT_POST_VIEW,
    POST_VOTE,
    POST_ERROR,
    POSTS_VOTE,
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    COMMENT_VOTE,
    DELETE_POST_FROM_LIST,
    CURRENT_EDITABLE_POST,
    CURRENT_EDITABLE_COMMENT
} from '../actions'
import { sortRes } from '../utils/helpers'

const initialPostsState = {
    posts: [],
    sortBy: 'upVote',
    path: '/',
    editingPost: null,
    rehydrated: false
}

function posts (state = initialPostsState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: sortRes(action.posts, state.sortBy),
                path: action.path
            }
        case GET_ORDERED_POSTS_BY:
            return {...state,
                posts: sortRes(action.posts, action.sortBy),
                sortBy: action.sortBy
            }
        case ADD_POST:
            return {...state,
                posts: sortRes(state.posts.push(action.post), action.sortBy)
            }
        case POSTS_VOTE:
            return {...state,
                posts: sortRes(state.posts.filter((post) => {
                    return post.id !== action.post.id
                }).concat(action.post), state.sortBy)
            }
        case DELETE_POST_FROM_LIST:
            return {
                ...state,
                posts: sortRes(state.posts.filter((post) => {
                    return post.id !== action.postId
                }), state.sortBy)
            }
        case CURRENT_EDITABLE_POST:
            return {...state, editingPost: action.post}
        case EDIT_POST:
            return {...state, editingPost: null}
        default :
            return state
    }
}

const initialPostState = {
    post: {},
    comments: [],
    sortBy: 'upVote',
    editingComment: null,
    rehydrated: false
}

function post (state =  initialPostState, action) {
    switch (action.type) {
        case GET_POST:
            return {...state, post: action.post,
                comments: sortRes(state.comments, state.sortBy)
            }
        case POST_VOTE:
            return {...state, post: action.post }
        case DELETE_POST:
            return {...state, post: {}, comments: []}
        case GET_POST_COMMENTS:
            return {...state, comments: sortRes(action.comments, state.sortBy) }
        case DELETE_COMMENT:
            return {...state,
                comments: sortRes(state.comments.filter((comment) => {
                    return comment.id !== action.commentId
                }), state.sortBy)}
        case ADD_COMMENT:
            return {...state,
                comments: sortRes(state.comments.concat(action.comment), state.sortBy)}
        case EDIT_COMMENT:
            return {
                ...state,
                editingComment: null,
                comments: sortRes(state.comments.map((comment) => {
                    return comment.id === action.comment.id ? action.comment: comment
                }), state.sortBy)
            }
        case GET_ORDERED_POST_COMMENTS_BY:
            return {...state,
                comments: sortRes(action.comments, action.sortBy),
                sortBy: action.sortBy
            }
        case POST_ERROR:
            return {...state, post: {}, comments: []}
        case COMMENT_VOTE:
            return {
                ...state,
                comments: sortRes(state.comments.filter((comment) => {
                    return comment.id !== action.comment.id
                }).concat(action.comment), state.sortBy)
            }
        case CURRENT_EDITABLE_COMMENT:
            return {...state, editingComment: action.comment}
        case EDIT_POST_VIEW:
            return {...state, post: action.post}
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
    categories
});
