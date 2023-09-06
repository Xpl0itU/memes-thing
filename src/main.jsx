import { render } from 'preact';
import './index.css';
import App from './app.jsx';
import initFacebookSDK from "./initFacebookSDK.jsx";

initFacebookSDK().then(() => {
    render(
        <App />,
        document.getElementById('app')
    );
});
