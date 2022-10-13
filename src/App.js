import React, { useEffect, useState } from "react";
import Select from 'react-select'
import getSub from './handlers/reddit_fetch';
import UploadModal from './components/UploadModal';
import Image from './components/Image';
import { captions, subreddits } from './config';
import { accountSelectStyle, subredditSelectStyle } from './styles';

function App() {
  const [sub, setSub] = useState(subreddits[0].value);
  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState("");
  const [instagramAccount, setInstagramAccount] = useState("");
  const [instagramAccounts, setInstagramAccounts] = useState([]);
  const [accountsLoaded, setAccountsLoaded] = useState(false);
  const [images, setImages] = useState([]);

  const reloadImages = () => {
    getSub(sub).then((imageArray) => setImages(imageArray));
  };

  useEffect(() => {
    reloadImages();
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

  if (facebookUserAccessToken && !accountsLoaded)
    getInstagramAccounts().then((response) => { setInstagramAccounts(response.map(response => response.instagram_business_account)); setInstagramAccount(response.map(response => response.instagram_business_account)[0].id); setAccountsLoaded(true) });

  return (
    <>
      <div>
        <div className="ml-2">
          <h3 className="text-3xl font-bold">Current subreddit: {sub}</h3>
          <div className="pt-2"></div>
          <div className="flex space-x-2">
            <label style={{ paddingTop: '5px' }} htmlFor="subredditSelect">Subreddit: </label>
            <Select id="subredditSelect" styles={subredditSelectStyle} isSearchable={false} options={subreddits} defaultValue={subreddits[0]} onChange={(e) => { setSub(e.value); reloadImages() }} />
          </div>
          <div className="pt-2" />
          <div className="flex space-x-10">
            <label style={{ paddingTop: '3px' }} htmlFor="loginButton">Login: </label>
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
              <div className="pt-2" />
              <div className="flex space-x-5">
                <label style={{ paddingTop: '6px' }} htmlFor="accountSelect">Account: </label>
                <Select id="accountSelect" styles={accountSelectStyle} isSearchable={false} options={instagramAccounts.map((account) => {
                  return ({ value: account.id, label: <div className="flex space-x-5"><img src={account.profile_picture_url} className='rounded' alt='' height="30px" width="30px" />{account.name}</div> })
                })} defaultValue={instagramAccounts.map((account) => {
                  return ({ value: account.id, label: <div className="flex space-x-5"><img src={account.profile_picture_url} className='rounded' alt='' height="30px" width="30px" />{account.name}</div> })
                })[0]} onChange={(e) => setInstagramAccount(e.value)} />
              </div>
            </>) : (undefined)}
          <div className="pt-2" />
        </div>
        <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-4">
          {images.map(image => (
            <div className="w-full rounded">
              <UploadModal token={facebookUserAccessToken} pageID={instagramAccount} image={image} caption={'For more follow @memesconchi\n•\n•\n•\n•\n•\n' + captions[Math.floor(Math.random() * captions.length)]} />
              <div className="pt-1" />
              <Image src={image} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
