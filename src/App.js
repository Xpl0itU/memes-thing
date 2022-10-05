import './App.css';
import React, { useEffect, useState } from "react";
import getSub from './handlers/reddit_fetch';
import UploadModal from './components/UploadModal';
import Image from './components/Image';
import { captions, subreddits } from './config';

function App() {
  const [sub, setSub] = useState(subreddits[0]);
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
                  {subreddits.map(subreddit=>(
                      <option value={subreddit}>r/{subreddit}</option>
                  ))}
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
                <Image src={image} alt="" className="rounded-xl" height="200" width="200"/>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
