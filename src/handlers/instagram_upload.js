import {PostPagePhotoMediaRequest, PostPublishMediaRequest} from "instagram-graph-api";

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

function uploadtoInstagram(token, pageID, imageURL, imageCaption, callback) {
    let isLoading = true;
    const request = new PostPagePhotoMediaRequest(
        token,
        pageID,
        imageURL,
        imageCaption
      );
      request.execute().then((response) => {
        console.log(response.data.id);
        const igRequest = new PostPublishMediaRequest(
            token,
            pageID,
            response.data.id
        );

        igRequest.execute().then((igResponse) => {
            isLoading = false;
            console.log(igResponse);
        });
      }).catch(() => isLoading = false);
    waitUntil(() => isLoading === false).then(() => {callback()});
}

export default uploadtoInstagram;