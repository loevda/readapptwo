/**
 * Created by david2099 on 10/09/17.
 */
import * as PostAPI from '../utils/api'

export const GET_POSTS = 'GET_POSTS'
export const GET_ORDERED_POSTS_BY = 'GET_ORDERED_POSTS_BY'
export const GET_POST = 'GET_POST'
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const GET_ORDERED_POST_COMMENTS_BY = 'GET_ORDERED_POST_COMMENTS_BY'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const EDIT_POST_VIEW = 'EDIT_POST_VIEW'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const POST_VOTE = 'POST_VOTE'
export const POST_ERROR = 'POST_ERROR'
export const POSTS_VOTE = 'POSTS_VOTE'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const COMMENT_VOTE = 'COMMENT_VOTE'
export const DELETE_POST_FROM_LIST = 'DELETE_POST_FROM_LIST'
export const CURRENT_EDITABLE_POST = 'CURRENT_EDITABLE_POST'
export const CURRENT_EDITABLE_COMMENT = 'CURRENT_EDITABLE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

export const currentEditablePost = post => (
    {
        type: CURRENT_EDITABLE_POST,
        post
    }
)

export const currentEditableComment = comment => (
    {
        type: CURRENT_EDITABLE_COMMENT,
        comment
    }
)

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

export const postAdd = (post) => ({
        type: ADD_POST,
        post
    }
)

export const addPost= (post) => dispatch => (
    PostAPI.addPost(post)
        .then((post) => {
            dispatch(postAdd(post))
        })
)


export const getPosts = (posts, path) => ({
    type: GET_POSTS,
    posts,
    path
})

export const fetchPosts = (path) => dispatch => (
    PostAPI.fetchPosts(path)
        .then((posts) => {
            const getPostsComments = posts.map(post => {
                return PostAPI.fetchPostComments(post.id).then((data) => data)
            })
            const res =  Promise.all(getPostsComments).then(comments => {
                return comments.map((comment, index) => {
                    return {...posts[index], comments: comment.length}
                })
            }).then((posts) => {
                return posts
            })
            return res
        }).then((posts) => {
            dispatch(getPosts(posts, path))
    })
)


export const getPost = post => ({
    type: GET_POST,
    post
})

export const fetchPostError = () => ({
    type: POST_ERROR
})

export const fetchPost = (postId, history) => dispatch => (
    PostAPI
        .fetchPost(postId, history)
        .then((post) => {
            if (post.error || !post.id) {
                history.push('/page/not/found/')
                dispatch(fetchPostError())
            }else{
                dispatch(getPost(post))
            }
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


export const deletePost = () => ({
    type: DELETE_POST
})

export const deletePostFromList = (postId) => ({
    type: DELETE_POST_FROM_LIST,
    postId
})

export const fetchPostDelete = (postId, history = null) => dispatch => (
    PostAPI
        .deletePost(postId)
        .then((post) => {
            if(history) {
                history.push('/')
                dispatch(deletePost())
            }else{
                dispatch(deletePostFromList(postId))
            }
        })
)

export const editPost = (post) => ({
    type: EDIT_POST,
    post
})

export const fetchEditPost = (postId, post) => dispatch => (
    PostAPI
        .editPost(postId, post)
        .then((newPost) => {
            dispatch(editPost(newPost))
        })
)

export const editPostView = (post) => ({
    type: EDIT_POST_VIEW,
    post
})

export const fetchEditPostView = (postId, post) => dispatch => (
    PostAPI
        .editPost(postId, post)
        .then((newPost) => {
            dispatch(editPostView(newPost))
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


export const orderPostComments = (comments, sortBy) => ({
    type: GET_ORDERED_POST_COMMENTS_BY,
    comments,
    sortBy
})

export const orderPostCommentsBy = (comments, sortBy) => dispatch => (
    dispatch(orderPostComments(comments, sortBy))
)

export const commentVote = comment => ({
    type: COMMENT_VOTE,
    comment
})

export const voteComment = (commentId, voteStr) => dispatch => (
    PostAPI.voteComment(commentId, voteStr)
        .then((comment) => {
            dispatch(commentVote(comment))
        })
)

export const commentAdd = comment => ({
    type: ADD_COMMENT,
    comment
})

export const addComment = (comment) => dispatch => (
    PostAPI.addComment(comment).then((comment) => {
        dispatch(commentAdd(comment))
    })
)

export const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
})

export const fetchCommentDelete = (commentId) => dispatch => (
    PostAPI
        .deleteComment(commentId)
        .then((post) => {
            dispatch(deleteComment(commentId))
        })
)




export const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
})

export const fetchEditComment = (commentId, comment) => dispatch => (
    PostAPI
        .editComment(commentId, comment)
        .then((newComment) => {
            dispatch(editComment(newComment))
        })
)
