# Auth0

## Account
- [Auth0](https://auth0.com/)
- Choose Sign up
  - I choose Continue with GitHub
  - Choose Other, no advanced settings

 ## Back End

 - Click `Applications > APIs` from side panel.
 - Click `Create API` button.
 - Enter an API name
   - E.g. `Awesome-301-Back-End`
 - Enter a logical `Identifier` following the directions.
 - Keep the default `Signing Algorithm`
 - Click `Create`
 - Note the `Settings` tab.
    - You'll need the values there for your environment.
 - That's it for back-end.
 - See [Auth Back End Demo](./auth-back) for auth in action.
   - Make sure to update `.env` values with values from `Auth0 Settings`


## Front End
- Once at dashboard click `Create Application` button.
- Enter an application name
  - E.g. `Awesome-301-Front-End`
- Choose `Single Page Web Applications` option.
- Click `Create`
- On next page choose `React` option
- Follow the `I want to integrate with my app` steps
  - Click `Configure Auth0`
  - Note the hyperlink to `Application Settings`
    - Open that page in separate tab.
    - You'll be switching back and forth between the instructions in one tab, and your settings in the other.
  - When you get to `Configure the Auth0Provider component` make sure to carefully copy over just the  parts you need.
    - Line 3
    - Lines 9-15
    - Line 17
    - Do NOT copy/paste whole thing because that could clobber other parts of your `main.jsx` file.
    - NOTE: the `domain` and `clientId` values you see are correct, but you'll want to move those to .env and import them.
    - Replace redirectUri with imported environment variable as well.
    - `Auth0Provider` attributes should use the keys below, pulled from environment.
    VITE_AUTH_DOMAIN
    VITE_AUTH_CLIENT_ID
    VITE_AUTH_REDIRECT_URI
    VITE_AUTH_AUDIENCE
    ```
    - Once at section `Add Login to Your Application` optionall continue reading for reference.
    - See [Auth Front End Demo](./auth-front) for auth in action.
    - Make sure to update `.env` values with values from `Auth0 Settings`
