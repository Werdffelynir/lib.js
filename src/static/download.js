
/**
 *
 * @param {{}} data
 * @param {String} filename
 * @param {String} file_type    json | text | png | jpg | gif
 */
export const download = (data, filename, file_type = 'text') => {
    data = JSON.stringify(data)
    const link = document.createElement('a')
    switch (file_type) {
        case 'json':
        case 'text':
            file_type = 'data:text/plain;charset=utf-8'
            break;
        case 'jpg':
        case 'jpeg':
            file_type = 'data:image/jpeg;base64'
            break;
        case 'png':
            file_type = 'data:image/png;base64'
            break;
        case 'gif':
            file_type = 'data:image/gif;base64'
            break;
        case 'webp':
            file_type = 'data:image/webp;base64'
            break;
    }

    link.setAttribute('href', file_type + ',' + encodeURIComponent(data))
    link.setAttribute('download', filename || 'data.json')
    link.style.display = 'none'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}


export default download;
