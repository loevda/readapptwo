/**
 * Created by david2099 on 10/09/17.
 */
import * as PostAPI from '../utils/api'

export const GET_POSTS = 'GET_POSTS'
export const GET_ORDERED_POSTS_BY = 'GET_ORDERED_POSTS_BY'
export const GET_POST = 'GET_POST'
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const POST_VOTE = 'POST_VOTE'
export const POSTS_VOTE = 'POSTS_VOTE'
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

export const getComments = comments => ({
    type: GET_COMMENTS,
    comments
})

export const fetchComments = (postId) => dispatch => (
    PostAPI
        .fetchPost(postId)
        .then((post) => {
            dispatch(getPost(post))
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

export const getPostComments = comments => ({
    type: GET_POST_COMMENTS,
    comments
})

export const fetchPostComments = (postId) => dispatch => (
    PostAPI
        .fetchPostComments(postId)
        .then((comments) => {
            dispatch(getPostComments(comments))
        })
)

export const getCategoryPosts = (posts, path) => ({
    type: GET_CATEGORY_POSTS,
    posts,
    path
})

export const fetchCategoryPosts = (categoryId, path) => dispatch => (
    PostAPI.fetchCategoryPosts(categoryId)
        .then((posts) => {
            dispatch(getCategoryPosts(posts, path))
        })
)

export const postVote = post => ({
    type: POST_VOTE,
    post
})

export const votePost = (postId, voteStr) => dispatch => (
    PostAPI.votePost(postId, voteStr)
        .then((post) => {
            dispatch(postVote(post))
        })
)

export const postsVote = post => ({
    type: POSTS_VOTE,
    post
})

export const votePosts = (postId, voteStr) => dispatch => (
    PostAPI.votePost(postId, voteStr)
        .then((post) => {
            dispatch(postsVote(post))
        })
)

export const orderPosts = (posts, sortBy) => ({
    type: GET_ORDERED_POSTS_BY,
    posts,
    sortBy
})

export const postsOrderedBy = (posts, sortBy) => dispatch => (
    dispatch(orderPosts(posts, sortBy))
)





