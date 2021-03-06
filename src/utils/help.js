const addZero = num => {
    return num < 10 ? `0${num}` : `${num}`
}

const formatDate = seconds => {
    const time = new Date(seconds)
    const y = time.getFullYear()
    const m = time.getMonth() + 1
    const d = time.getDate()
    const hh = time.getHours()
    const mm = time.getMinutes()
    const ss = time.getSeconds()
    return `${y}-${addZero(m)}-${addZero(d)} ${addZero(hh)}:${addZero(mm)}:${addZero(ss)}`
}

const secondToDate = seconds => {
    if (seconds < 120) return '1 分钟'
    let min = parseInt(seconds / 60)
    if (min < 60) return `${min} 分钟`
    let hours = parseInt(seconds / 3600)
    min = min % 60
    if (hours < 24) return `${hours} 小时 ${min} 分钟`
    const day = parseInt(seconds / 86400)
    hours = hours % 24
    return `${day} 天 ${hours} 小时 ${min} 分钟`
}

const dateToTimeStamp = date => {
    if (!date) return 0
    const dateStr = date.replace(/-/g, '/')
    return +(new Date(dateStr)).getTime()
}

const listLostRepeat = (list, attribute) => {
    const hash = []
    const newList = []
    for (let n = 0; n < list.length; n++) {
        if (hash.indexOf(list[n][attribute]) === -1) {
            hash.push(list[n][attribute])
            newList.push(list[n])
        }
    }
    return newList
}

const concatIds = (list, id) => {
    let ids = ''
    list.forEach(item => {
        ids += item[id] + ','
    })
    ids = ids.substring(0, ids.length - 1)
    return ids
}

const fourBitFormat = value => {
    return value.replace(/(.{4})/g, '$1 ')
}

const phoneFormat = phone => {
    return phone.replace(/^(\d{3})(\d{4})/g, '$1 $2 ')
}

const sleep = time => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

const computedTax = amount => {
    const standard = 800
    let tax = 0
    if (amount < standard) return tax.toFixed(2)

    if (amount <= 4000) {
        tax = (amount * 100 - standard * 100) / 100 * (((1 - 0.3) * 100) * (0.2 * 100) / 100 / 100)
    } else {
        tax = (amount * 100 - amount * 0.2 * 100) / 100 * (((1 - 0.3) * 100) * (0.2 * 100) / 100 / 100)
    }
    var a = (tax * 100).toFixed(1)
    return ((Math.round(parseFloat(a))) / 100).toFixed(2)
}

/**
 * 格式化时长
 * @param {Number} seconds 限制条件名称
 * @return {String} 时长格式化 hh:mm:ss
 */
const formatDuration = seconds => {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
        return `00:00:00`
    }
    if (seconds < 10) return `00:00:0${seconds}`
    if (seconds < 60) return `00:00:${seconds}`
    const newSecond = seconds % 60
    const newSecondStr = newSecond < 10 ? `0${newSecond}` : newSecond
    if (seconds < 3600) {
        const minute = parseInt(seconds / 60)
        const minuteStr = minute < 10 ? `0${minute}` : minute
        return `00:${minuteStr}:${newSecondStr}`
    }
    const hour = parseInt(seconds / 3600)
    const hourStr = hour < 10 ? `0${hour}` : hour
    const minuteNum = parseInt(seconds % 3600 / 60)
    const minuteNumStr = minuteNum < 10 ? `0${minuteNum}` : minuteNum
    return `${hourStr}:${minuteNumStr}:${newSecondStr}`
}

/**
 * 格式化视频的时间长度
 * @param {Number} time 视频的长度
 * @return 以时间的格式，格式化后的视频长度 01:01
 */
function formatVideoTime(time) {
    let minute = parseInt((time > 60 ? time / 60 : 0)).toString()
    minute = minute.length === 1 ? '0' + minute : minute
    let second = time > 60 ? time - minute * 60 : time
    second = second >= 10 ? second : '0' + second
    return `${minute}:${second}`
}

export {
    addZero,
    formatDate,
    dateToTimeStamp,
    secondToDate,
    listLostRepeat,
    concatIds,
    fourBitFormat,
    phoneFormat,
    sleep,
    computedTax,
    formatDuration,
    formatVideoTime
}