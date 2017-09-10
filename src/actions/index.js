/**
 * Created by david2099 on 10/09/17.
 */
import * as PostAPI from '../utils/api'

export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const POST_VOTE = 'POST_VOTE'
export const ADD_COMMENT = 'ADD_COMMENT'

export const getCategories = categories => ({
    type: GET_CATEGORIES,
    categories
})

export const fetchCategories = () => dispatch => (
    PostAPI.fetchCategories()
        .then((categories) => {
            dispatch(getCategories(categories))
        })
)

export const getPosts = posts => ({
    type: GET_POSTS,
    posts
})

export const fetchPosts = () => dispatch => (
    PostAPI
        .fetchPosts()
        .then((posts) => {
            dispatch(getPosts(posts))
        })
)


export const getPost = post => ({
    type: GET_POST,
    post
})

export const fetchPost = (postId) => dispatch => (
    PostAPI
        .fetchPost(postId)
        .then((post) => {
            dispatch(getPost(post))
        })
)

export const getCategoryPosts = categoryPosts => ({
    type: GET_CATEGORY_POSTS,
    categoryPosts
})

export const fetchCategoryPosts = (categoryId) => dispatch => (
    PostAPI.fetchCategoryPosts(categoryId)
        .then((posts) => {
            dispatch(getPosts(posts))
        })
)




