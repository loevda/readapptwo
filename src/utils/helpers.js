import { v1 } from 'uuid'
import { isString } from 'lodash'

export function generateUUID() {
    return v1().replace(/-/g, '')
}

export function simpleInputValidation(fields) {
    let flag = true
    for (const key of Object.keys(fields)) {
        if (!(isString(fields[key]) && fields[key].length > 3)) {
            flag = false
        }
    }
    return flag
}

export function capitalize (str = '') {
    try {
        return typeof str !== 'string'
            ? ''
            : str[0].toUpperCase() + str.slice(1)
    } catch(e) {
        return str
    }

}

export function formatDate(timestamp) {
    try {
        const newDate = new Date(timestamp)
        return newDate.toUTCString()
    } catch (e) {
        return timestamp
    }
}

export function sortRes (res, sortBy) {
    if (res.length > 1) {
        switch (sortBy) {
            case 'upVote':
                return [...res].sort((a, b) => {
                    return b.voteScore - a.voteScore
                })
            case 'downVote':
                return [...res].sort((a, b) => {
                    return a.voteScore - b.voteScore
                })
            case 'latest':
                return [...res].sort((a, b) => {
                    return b.timestamp - a.timestamp
                })
            case 'oldest':
                return [...res].sort((a, b) => {
                    return a.timestamp - b.timestamp
                })
            default:
                return res
        }

    }
    return res
}

export const customStyles = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)',
        zIndex            : '1000'
    },
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        border                : '1px solid black',
        display               : 'block',
        padding               : '20px',
        backgroundColor       : 'white'
    }
}