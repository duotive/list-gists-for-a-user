## Install

To install the project you have to simply run:

```
npm install
```

Once the instalation is done, create the .env file in the root project directory where you will have, the code below, where you should replace the TOKEN_CODE_HERE with your own personal token. A guide on how to creat the token can be found here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

```
GIT_PERSONAL_ACCESS_TOKEN = 'TOKEN_CODE_HERE'
```

## Technical decisions

React was chosen because I have worked with it in the past, and currently work on a project with WC that also uses react in the admin area with Guthenberg.

The UI Frameworks that I have used in the past where custom made, so I could not use something that I have already used in the past. Considering that I have chosen the "Chakra UI" framework, as it seems the most simple. Unfortunately, the framework is lacking when it comes to documentation, so the development was quite slow because of that. ( https://chakra-ui.com/ )

In other projects, that where bigger the state management was done using Redux, but considering the size of the project, another state manager needed to be chosen. Recoil JS seemed the obvious choice here. ( https://recoiljs.org/ )

Other libraries that where used, are stables of React programming, like Axios ( for the API requests), Formik ( for form validation) and moment ( for data format handling ).

## Next steps
1. Create tests for the app.
2. Create a OAUTH login for the app, to avoid the rate-limit that might come up, using the personal token.
3. Optimize UI.
4. Fix warnings.
