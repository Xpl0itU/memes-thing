import './App.css';
import React, { useEffect, useState } from "react";
import getSub from './handlers/reddit_fetch';
import UploadModal from './components/UploadModal';

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
  const [sub, setSub] = useState("memes");
  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState("");
  let images = getSub(sub);

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
        <div class="ml-2">
          <h3 class="text-3xl font-bold">Current subreddit: {sub}</h3>
          <div class="pt-2"></div>
          <form value={sub} onChange={(e) => setSub(e.target.value)}>
            <div class="box">
                <label for="sub">Subreddit:</label>
                <select name="sub" id="sub" class="bg-green-500 hover:bg-green-700 text-white py-2 px-2 rounded"
                  onchange="this.form.submit()">
                  <option value="memes">r/memes</option>
                  <option value="meme">r/meme</option>
                  <option value="dankmemes">r/dankmemes</option>
                  <option value="Memes_Of_The_Dank">r/Memes_Of_The_Dank</option>
                  <option value="me_irl">r/me_irl</option>
                </select>
              </div>
          </form>
          <div class="pt-2"/>
            <div className="flex space-x-9">
              <label for="loginButton">Login: </label>
              {facebookUserAccessToken ? (
                  <button onClick={logOutOfFB} id='loginButton' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                    Log out of Facebook
                  </button>
                ) : (
                  <button onClick={logInToFB} id='loginButton' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                    Login with Facebook
                  </button>
                )}
            </div>
        </div>
        <div class="pt-2"/>
        <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-4">
            {images.map(image=>(
              <div class="w-full rounded">
                <UploadModal token={facebookUserAccessToken} image={image} caption={'For more follow @memesconchi\n•\n•\n•\n•\n•\n' + captions[Math.floor(Math.random() * captions.length)]}/>
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
