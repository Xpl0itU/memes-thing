import React, { useEffect, useState } from "react";
import getSub from './handlers/reddit_fetch';
import UploadModal from './components/UploadModal';
import Image from './components/Image';
import { captions, subreddits } from './config';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function App() {
  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState("");
  const [instagramAccount, setInstagramAccount] = useState("");
  const [instagramAccounts, setInstagramAccounts] = useState([]);
  const [accountsLoaded, setAccountsLoaded] = useState(false);
  const [images, setImages] = useState([]);

  const reloadImages = (subreddit) => {
    getSub(subreddit).then((imageArray) => setImages(imageArray));
  };

  useEffect(() => {
    reloadImages(subreddits[0]);
    window.FB.getLoginStatus((response) => {
      setFacebookUserAccessToken(response.authResponse?.accessToken);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          <Box sx={{ maxWidth: 250, marginTop: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="subredditSelectLabel">Subreddit</InputLabel>
                <Select
                  labelId="subredditSelectLabel"
                  id="subredditSelect"
                  defaultValue={subreddits[0]}
                  label="Subreddit"
                  onChange={(event) => { reloadImages(event.target.value) }}
                >
                  {subreddits.map(subreddit => (
                    <MenuItem value={subreddit}>r/{subreddit}</MenuItem>
                  ))}
                </Select>
            </FormControl>
          </Box>
          <div className="pt-2" />
          {facebookUserAccessToken ? (
            <button onClick={logOutOfFB} id='loginButton' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
              Log out of Facebook
            </button>
          ) : (
            <button onClick={logInToFB} id='loginButton' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
              Login with Facebook
            </button>
          )}
          {accountsLoaded ? (
            <>
              <Box sx={{ maxWidth: 250, marginTop: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="accountSelectLabel">Account</InputLabel>
                  <Select
                    labelId="accountSelectLabel"
                    id="accountSelect"
                    label="Account"
                    onChange={(event) => setInstagramAccount(event.target.value)}
                    defaultValue={instagramAccounts[0].id}
                  >
                    {instagramAccounts.map(account => (
                      <MenuItem value={account.id}><div className="flex space-x-5" style={{ alignItems: 'center' }}><img src={account.profile_picture_url} className='rounded' alt='' height="30px" width="30px" />{account.name}</div></MenuItem>
                    ))}
                  </Select>
              </FormControl>
            </Box>
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
