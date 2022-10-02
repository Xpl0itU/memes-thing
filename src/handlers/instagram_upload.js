import {PostPagePhotoMediaRequest, PostPublishMediaRequest} from "instagram-graph-api";

function uploadtoInstagram(token, imageURL, imageCaption) {
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
          console.log(igResponse);
        });
      });
}

export default uploadtoInstagram;