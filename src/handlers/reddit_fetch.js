function isImage(url) {
    return url.endsWith('.jpg') && url.includes('redd');
}

function getSub(sub) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://www.reddit.com/r/${sub}/hot.json?limit=20`, false);
    request.send(null);
    return JSON.parse(request.response).data.children.map(post=>post.data.url).filter(isImage);
}

export default getSub;