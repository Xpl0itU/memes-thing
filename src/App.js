import './App.css'
import React, { useEffect, useState } from "react";
import Select from 'react-select'
import getSub from './handlers/reddit_fetch';
import UploadModal from './components/UploadModal';
import Image from './components/Image';
import { captions, subreddits } from './config';

function App() {
  const [sub, setSub] = useState(subreddits[0].value);
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
  const subredditSelectStyle = {
    control: base => ({
      ...base,
      height: 35,
      minHeight: 35,
      width: 220,
      minWidth: 220
    })
  };
  const accountSelectStyle = {
    control: base => ({
      ...base,
      height: 40,
      minHeight: 40,
      width: 220,
      minWidth: 220
    })
  };  
  return (
    <>
      <div>
        <div class="ml-2">
          <h3 class="text-3xl font-bold">Current subreddit: {sub}</h3>
          <div class="pt-2"></div>
          <div className="flex space-x-2">
            <label class="selectLabel" for="subredditSelect">Subreddit: </label>
            <Select id="subredditSelect" styles={subredditSelectStyle} options={subreddits} defaultInputValue={sub} onChange={(e) => setSub(e.value)} />
          </div>
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
            {accountsLoaded ? (
              <>
                <div class="pt-2" />
                <div className="flex space-x-5">
                  <label class='selectLabel' for="accountSelect">Account: </label>
                  <Select id="accountSelect" styles={accountSelectStyle} options={instagramAccounts.map((account) => {
                    return ({value: account.id, label: <div className="flex space-x-5"><img src={account.profile_picture_url} height="30px" width="30px"/>{account.name}</div>})
                  })} defaultValue={instagramAccounts.map((account) => {
                    return ({value: account.id, label: <div className="flex space-x-5"><img src={account.profile_picture_url} height="30px" width="30px"/>{account.name}</div>})
                  })[0]} onChange={(e) => setInstagramAccount(e.value)} />
                </div>
              </> ) : (undefined)}
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
