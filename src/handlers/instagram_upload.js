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

function uploadtoInstagram(token, imageURL, imageCaption, callback) {
    let isLoading = true;
    const request = new PostPagePhotoMediaRequest(
        token,
        '17841417742728074',
        imageURL,
        imageCaption
      );
      request.execute().then((response) => {
        console.log(response.data.id);
        const igRequest = new PostPublishMediaRequest(
            token,
            '17841417742728074',
            response.data.id
        );

        igRequest.execute().then((igResponse) => {
            isLoading = false;
            console.log(igResponse);
        });
      }).catch(() => isLoading = false);
    waitUntil(() => isLoading == false).then(() => {callback()});
}

export default uploadtoInstagram;