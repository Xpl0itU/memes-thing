import './App.css';
import getSub from './handlers/reddit_fetch';
import React, { useEffect, useState } from "react";

const captions = [
  "%23meme %23memes %23funny %23dankmemes %23dank %23lol %23lmao %23dank %23funnymemes %23memesdaily %23dankmeme %23f %23dankmemes %23follow %23cringe %23like %23lmfao %23anime %23hilarious %23comedy %23offensivememes %23fortnite %23filthyfrank %23nichememes %23offensive %23jokes %23l %23bhfyp",
  "%23meme %23memes %23bestmemes %23instamemes %23funny %23funnymemes %23dankmemes %23offensivememes %23edgymemes %23spicymemes %23nichememes %23memepage %23funniestmemes %23dank %23memesdaily %23jokes %23memesrlife %23memestar %23memesquad %23humor %23lmao %23igmemes %23lol %23memeaccount %23memer %23relatablememes %23funnyposts %23sillymemes %23nichememe %23memetime",
  "%23memes %23meme %23funny %23dankmemes %23funnymemes %23memesdaily %23follow %23lol %23instagram %23humor %23like %23tiktok %23ol %23dank %23viral %23comedy %23explorepage %23bhfyp %23instagood %23dailymemes %23memepage %23fun %23memestagram %23offensivememes %23edgymemes %23followforfollowback %23lmao",
  "%23memes %23meme %23funny %23memesdaily %23dankmemes %23funnymemes %23lol %23love %23dank %23comedy %23lmao %23fortnite %23humor %23edgymemes %23instagood %23fun %23dankmeme %23music %23edgy %23anime %23offensivememes %23art %23instagram %23cringe %23bhfyp %23hilarious %23funnyvideos %23photography %23explore %23photooftheday",
  "%23funny %23memes %23lol %23meme %23dankmemes %23comedy %23funnymemes %23memesdaily %23dank %23edgymemes %23offensivememes %23memestagram %23memes😂 %23memes4ever %23memes4life %23memessad %23funnymemes😂 %23memesarelife %23mememachine %23bestmeme %23memesinstagram %23memeking %23memesdaily😂 %23memestealer %23shrekmemes %23dankmemer %23hillarious %23funmeme %23memestwitter %23memessimpsons",
  "%23memes %23dankmemes %23offensivememes %23memes4life %23qualitymemes %23memesaremee %23kermitmemes %23darkhumormemes %23coolmemes %23soccermemes %23loveandaffectionmemes %23memesday %23memesforteens %23dankmemes2k17 %23memestagramm %23newmeme %23memespage",
  "%23memes %23meme %23funny %23memesdaily %23dankmemes %23funnymemes %23lol %23love %23dank %23comedy %23follow %23lmao %23fortnite %23humor %23like %23edgymemes %23instagood %23fun %23dankmeme %23music %23edgy %23anime %23offensivememes %23art %23instagram %23cringe %23bhfyp %23hilarious %23funnyvideos %23photography",
  "%23memes %23meme %23dankmemes %23lmao %23dank %23filthyfrank %23cringe %23edgy %23lmfao %23fnaf %23papafranku %23kek %23nochill %23relatable %23ayylmao %23hilarious %234chan %23savage %23weeaboo %23triggered %23pepe %23mlg %23funnymemes %23bushdid911 %23comedy %23textposts %23minecraft %23spongebob",
  "%23spicymemes %23relatableaf %23relatablepost %23memestagram %23dankmemes %23relatabletweets %23relatablememes %23relatablememe %23relatable %23memepage %23funnymeme %23memedaily %23animememes %23sorelatable %23memeaccount %23memez %23relatablequote %23meme %23relatableposts %23memesdaily %23memes😂 %23memes %23relatabletextposts %23relatables %23funnymemes %23relatabletextpost %23dankmeme %23memesfordays %23memer %23relatablequotes",
  "%23memes %23dankmemes %23dailymemes %23funnymemes %23nichememes %23jokes %23laugh %23edgymemes %23comedy %23spicymemes %23memestagram %23wholesomememes %23dankmemesdaily %23follow %23humor %23funny %23fun %23bestmemes %23haha %23offensivememes %23memesdaily %23instagood %23viral %23memer %23like %23meme %23memes😂 %23lol",
  "%23funny %23funnymeme %23lol %23lmao %23funnyvideo %23funnyvideos %23funnypost %23funnyshit %23haha %23joke %23instagood %23funnyposts %23meme %23funnyaf %23comedy %23funnypictures %23instagram %23funnyquotes %23funnymemes %23dankmemes %23humor %23memes %23dank %23funnymoments %23funnypics",
];

function App() {
  let images = getSub();
  console.log(images);
  const [imageUrl, setImageUrl] = useState("");
  const [postCaption, setPostCaption] = useState("");
  const [isSharingPost, setIsSharingPost] = useState(false);
  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState("");

  // Check if the user is authenticated with Facebook
  useEffect(() => {
    window.FB.getLoginStatus((response) => {
      setFacebookUserAccessToken(response.authResponse?.accessToken);
    });
  }, []);

  const logInToFB = () => {
    window.FB.login(
      (response) => {
        setFacebookUserAccessToken(response.authResponse?.accessToken);
      },
      {
        // Scopes that allow us to publish content to Instagram
        scope: "public_profile,email,instagram_basic,instagram_content_publish",
      }
    );
  };

  const logOutOfFB = () => {
    window.FB.logout(() => {
      setFacebookUserAccessToken(undefined);
    });
  };

  /* --------------------------------------------------------
   *             INSTAGRAM AND FACEBOOK GRAPH APIs
   * --------------------------------------------------------
   */

  const getFacebookPages = () => {
    return new Promise((resolve) => {
      window.FB.api(
        "me/accounts",
        { access_token: facebookUserAccessToken },
        (response) => {
          resolve(response.data);
        }
      );
    });
  };

  const createMediaObjectContainer = (instagramAccountId) => {
    return new Promise((resolve) => {
      window.FB.api(
        `${instagramAccountId}/media`,
        "POST",
        {
          access_token: facebookUserAccessToken,
          image_url: imageUrl,
          caption: postCaption,
        },
        (response) => {
          resolve(response.id);
        }
      );
    });
  };

  const publishMediaObjectContainer = (
    instagramAccountId,
    mediaObjectContainerId
  ) => {
    return new Promise((resolve) => {
      window.FB.api(
        `${instagramAccountId}/media_publish`,
        "POST",
        {
          access_token: facebookUserAccessToken,
          creation_id: mediaObjectContainerId,
        },
        (response) => {
          resolve(response.id);
        }
      );
    });
  };

  const shareInstagramPost = async () => {
    setIsSharingPost(true);
    const instagramAccountId = "17841417742728074";
    const mediaObjectContainerId = await createMediaObjectContainer(
      instagramAccountId
    );

    await publishMediaObjectContainer(
      instagramAccountId,
      mediaObjectContainerId
    );

    setIsSharingPost(false);

    // Reset the form state
    setImageUrl("");
    setPostCaption("");
  };
  return (
    <>
      <div>
        <div className="flex space-x-9">
          <p>Login: </p>
          {facebookUserAccessToken ? (
              <button onClick={logOutOfFB} className="btn action-btn">
                Log out of Facebook
              </button>
            ) : (
              <button onClick={logInToFB} className="btn action-btn">
                Login with Facebook
              </button>
            )}
        </div>
        <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-4">
            {images.map(image=>(
              <div class="w-full rounded">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => {setImageUrl(image); setPostCaption('For more follow @memesconchi\n•\n•\n•\n•\n•\n' + captions[Math.floor(Math.random() * captions.length)]); shareInstagramPost();}}>
                  Upload
                </button>
                <div className="pt-1"></div>
                <img src={image} alt="" className="rounded-xl" height="200" width="200"/>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
