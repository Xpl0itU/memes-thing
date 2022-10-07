import React, { useEffect, useState } from "react";
import getSub from './handlers/reddit_fetch';
import UploadModal from './components/UploadModal';
import Image from './components/Image';
import { captions, subreddits } from './config';

function App() {
  const [sub, setSub] = useState(subreddits[0]);
  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState("");
  const [instagramAccount, setInstagramAccount] = useState("");
  const [instagramAccounts, setInstagramAccounts] = useState([]);
  const [accountsLoaded, setAccountsLoaded] = useState(false);
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
      setAccountsLoaded(false);
    });
  };
  const getInstagramAccounts = () => {
    return new Promise((resolve) => {
      window.FB.api(
        "me/accounts?fields=instagram_business_account{id,name,profile_picture_url}",
        { access_token: facebookUserAccessToken },
        (response) => {
          resolve(response.data.filter(obj => {
            return obj.instagram_business_account !== undefined;
          }));
        }
      );
    });
  };
  if(facebookUserAccessToken)
    if(!accountsLoaded) {
      getInstagramAccounts().then((response) => {setInstagramAccounts(response.map(response => response.instagram_business_account)); setInstagramAccount(response.map(response => response.instagram_business_account)[0].id)});
      setAccountsLoaded(true);
    }
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
            {
              accountsLoaded ? (
              <>
                <div class="pt-2" />
                <form value={instagramAccount} onChange={(e) => setInstagramAccount(e.target.value)}>
                  <div class="box">
                    <label for="account">Account: </label>
                    <select name="account" id="account" class="bg-green-500 hover:bg-green-700 text-white py-2 px-2 rounded"
                      onchange="this.form.submit()">
                      {instagramAccounts.map(account => (
                        <option value={account.id}>{account.name} ({account.id})</option>
                      ))}
                    </select>
                  </div>
                </form>
              </> ) : (undefined)
            }
          <div class="pt-2"/>
        </div>
        <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-4">
            {images.map(image=>(
              <div class="w-full rounded">
                <UploadModal token={facebookUserAccessToken} pageID={instagramAccount} image={image} caption={'For more follow @memesconchi\n•\n•\n•\n•\n•\n' + captions[Math.floor(Math.random() * captions.length)]}/>
                <div className="pt-1"></div>
                <Image src={image}/>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
