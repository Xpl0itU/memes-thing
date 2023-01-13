import { PostPagePhotoMediaRequest, PostPublishMediaRequest } from "instagram-graph-api";

const waitUntil = (condition) => {
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (!condition())
                return

            clearInterval(interval)
            resolve()
        }, 100)
    })
}

function uploadtoInstagram(token, pageID, imageURL, imageCaption, callback, errorCallback) {
    let isLoading = true;
    let errorHappened = false;
    const request = new PostPagePhotoMediaRequest(
        token,
        pageID,
        imageURL,
        imageCaption
    );
    request.execute().then((response) => {
        if(response.data.id) {
            const igRequest = new PostPublishMediaRequest(
                token,
                pageID,
                response.data.id
            );
    
            igRequest.execute().then((igResponse) => {
                isLoading = false;
            }).catch(() => { isLoading = false; errorHappened = true; });
        } else {
            errorHappened = true;
            isLoading = false;
        }
    }).catch(() => { isLoading = false; errorHappened = true; });
    waitUntil(() => isLoading === false).then(() => { errorHappened ? errorCallback() : callback() });
}

export default uploadtoInstagram;