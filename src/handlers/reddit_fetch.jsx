import axios from "axios";

function isImage(url) {
    return url.endsWith('.jpg') && url.includes('redd');
}

function isPinned(url) {
    return !url.pinned && !url.stickied;
}

async function getSub(sub) {
    let request = await axios.get(`https://www.reddit.com/r/${sub}/hot.json?limit=20`);
    return request.data.data.children.map(post => post.data).filter(isPinned).map(post => post.url).filter(isImage);
}

export default getSub;
