/**
 * Created by david2099 on 10/09/17.
 */
const api = 'http://localhost:5001'

let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export function fetchPost (postId) {
    return fetch(`${api}/posts/${postId}`, { headers })
        .then(res => res.json())
        .then(data => data)
}

export function fetchPostComments (postId) {
    return fetch(`${api}/posts/${postId}/comments`, { headers })
        .then(res => res.json())
        .then(data => data)
}

export function fetchPosts () {
    return fetch(`${api}/posts`, { headers })
        .then(res => res.json())
        .then(data => data.filter((post) => {
            return !post.deleted
        }))
}

export function fetchPostsComments (postId) {
    return fetch(`${api}/posts/${postId}`, { headers })
        .then(res => res.json())
        .then(data => data)
}

export function deletePost (postId) {
    return fetch(`${api}/posts/${postId}`,
        { headers: {...headers, 'Content-Type': 'application/json'}, method: 'DELETE' })
        .then(res => res)
}

export function fetchCategoryPosts (categoryId) {
    return fetch(`${api}/${categoryId}/posts`, { headers })
        .then(res => res.json())
        .then(data => data.filter((post) => {
            return !post.deleted
        }))
}

export function fetchCategories () {
    return fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)
}

export function votePost (postId, voteStr) {
    return fetch(`${api}/posts/${postId}`,
        { headers: {...headers, 'Content-Type': 'application/json'},
            method: 'POST', body: JSON.stringify({option: voteStr}) })
        .then(res => res.json())
        .then(data => data)
}


export function voteComment (commentId, voteStr) {
    return fetch(`${api}/comments/${commentId}`,
        { headers: {...headers, 'Content-Type': 'application/json'},
            method: 'POST', body: JSON.stringify({option: voteStr}) })
        .then(res => res.json())
        .then(data => data)
}


