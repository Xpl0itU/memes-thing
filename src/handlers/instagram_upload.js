import {PostPagePhotoMediaRequest, PostPublishMediaRequest} from "instagram-graph-api";
import { INSTAGRAM_PAGE_ID } from '../config';

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
        INSTAGRAM_PAGE_ID,
        imageURL,
        imageCaption
      );
      request.execute().then((response) => {
        console.log(response.data.id);
        const igRequest = new PostPublishMediaRequest(
            token,
            INSTAGRAM_PAGE_ID,
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