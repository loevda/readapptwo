export function capitalize (str = '') {
    return typeof str !== 'string'
        ? ''
        : str[0].toUpperCase() + str.slice(1)
}

export function formatDate(timestamp) {
    try {
        const newDate = new Date(timestamp)
        return newDate.toUTCString()
    } catch (e) {
        console.log(e)
    }
    return timestamp
}

export function sortRes (res, sortBy) {
    if (res && res.length > 1) {
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