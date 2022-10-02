import './App.css';
import getSub from './handlers/reddit_fetch';
import React, { useEffect, useState } from "react";
import uploadtoInstagram from './handlers/instagram_upload';

const captions = [
  "#meme #memes #funny #dankmemes #dank #lol #lmao #dank #funnymemes #memesdaily #dankmeme #f #dankmemes #follow #cringe #like #lmfao #anime #hilarious #comedy #offensivememes #fortnite #filthyfrank #nichememes #offensive #jokes #l #bhfyp",
  "#meme #memes #bestmemes #instamemes #funny #funnymemes #dankmemes #offensivememes #edgymemes #spicymemes #nichememes #memepage #funniestmemes #dank #memesdaily #jokes #memesrlife #memestar #memesquad #humor #lmao #igmemes #lol #memeaccount #memer #relatablememes #funnyposts #sillymemes #nichememe #memetime",
  "#memes #meme #funny #dankmemes #funnymemes #memesdaily #follow #lol #instagram #humor #like #tiktok #ol #dank #viral #comedy #explorepage #bhfyp #instagood #dailymemes #memepage #fun #memestagram #offensivememes #edgymemes #followforfollowback #lmao",
  "#memes #meme #funny #memesdaily #dankmemes #funnymemes #lol #love #dank #comedy #lmao #fortnite #humor #edgymemes #instagood #fun #dankmeme #music #edgy #anime #offensivememes #art #instagram #cringe #bhfyp #hilarious #funnyvideos #photography #explore #photooftheday",
  "#funny #memes #lol #meme #dankmemes #comedy #funnymemes #memesdaily #dank #edgymemes #offensivememes #memestagram #memes😂 #memes4ever #memes4life #memessad #funnymemes😂 #memesarelife #mememachine #bestmeme #memesinstagram #memeking #memesdaily😂 #memestealer #shrekmemes #dankmemer #hillarious #funmeme #memestwitter #memessimpsons",
  "#memes #dankmemes #offensivememes #memes4life #qualitymemes #memesaremee #kermitmemes #darkhumormemes #coolmemes #soccermemes #loveandaffectionmemes #memesday #memesforteens #dankmemes2k17 #memestagramm #newmeme #memespage",
  "#memes #meme #funny #memesdaily #dankmemes #funnymemes #lol #love #dank #comedy #follow #lmao #fortnite #humor #like #edgymemes #instagood #fun #dankmeme #music #edgy #anime #offensivememes #art #instagram #cringe #bhfyp #hilarious #funnyvideos #photography",
  "#memes #meme #dankmemes #lmao #dank #filthyfrank #cringe #edgy #lmfao #fnaf #papafranku #kek #nochill #relatable #ayylmao #hilarious #4chan #savage #weeaboo #triggered #pepe #mlg #funnymemes #bushdid911 #comedy #textposts #minecraft #spongebob",
  "#spicymemes #relatableaf #relatablepost #memestagram #dankmemes #relatabletweets #relatablememes #relatablememe #relatable #memepage #funnymeme #memedaily #animememes #sorelatable #memeaccount #memez #relatablequote #meme #relatableposts #memesdaily #memes😂 #memes #relatabletextposts #relatables #funnymemes #relatabletextpost #dankmeme #memesfordays #memer #relatablequotes",
  "#memes #dankmemes #dailymemes #funnymemes #nichememes #jokes #laugh #edgymemes #comedy #spicymemes #memestagram #wholesomememes #dankmemesdaily #follow #humor #funny #fun #bestmemes #haha #offensivememes #memesdaily #instagood #viral #memer #like #meme #memes😂 #lol",
  "#funny #funnymeme #lol #lmao #funnyvideo #funnyvideos #funnypost #funnyshit #haha #joke #instagood #funnyposts #meme #funnyaf #comedy #funnypictures #instagram #funnyquotes #funnymemes #dankmemes #humor #memes #dank #funnymoments #funnypics",
];

function App() {
  let images = getSub();
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
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => {uploadtoInstagram(facebookUserAccessToken, image, 'For more follow @memesconchi\n•\n•\n•\n•\n•\n' + captions[Math.floor(Math.random() * captions.length)])}}>
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
