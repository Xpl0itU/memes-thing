import { useEffect, useState } from "preact/hooks";
import getSub from './handlers/reddit_fetch.jsx';
import UploadModal from './components/UploadModal.jsx';
import Image from './components/Image.jsx';
import { captions, subreddits } from './config.jsx';
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
        <div id="controls">
          <div className="selector">
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
          </div>
          {facebookUserAccessToken ? (
            <button onClick={logOutOfFB} id='loginButton'>
              Log out of Facebook
            </button>
          ) : (
            <button onClick={logInToFB} id='loginButton'>
              Login with Facebook
            </button>
          )}
          {accountsLoaded ? (
            <>
              <div className="selector">
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
                      <MenuItem value={account.id}><div className="account"><img src={account.profile_picture_url} alt='' height="30px" width="30px" />{account.name}</div></MenuItem>
                    ))}
                  </Select>
              </FormControl>
            </div>
            </>) : (undefined)}
        </div>
        <div id="images">
          {images.map(image => (
            <div className="image">
              <UploadModal token={facebookUserAccessToken} pageID={instagramAccount} image={image} caption={'For more follow @memesconchi\n•\n•\n•\n•\n•\n' + captions[Math.floor(Math.random() * captions.length)]} />
              <Image src={image} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
