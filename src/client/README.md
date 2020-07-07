This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### Important Tips for Deployment on Heroku if app is created with `npx create-react-app app_name` command

**Note: Heroku server may fail if build is not optimized**

1) Install NodeJs by downloading and running the client from [here](https://nodejs.org/en/download/)<br>
2) Install Heroku by following the [this documentation](https://devcenter.heroku.com/articles/heroku-cli)<br>
3) Run `npx create-react-app app_name` to create app<br>
4) Sign up for a heroku account [here](https://www.heroku.com/home)<br>
5) Run `heroku login` on terminal<br>
6) Create a heroku application by following [this documentation](https://devcenter.heroku.com/articles/creating-apps#creating-a-named-app)<br>
7) Go to `Setting` and only use this buildpack https://github.com/mars/create-react-app-buildpack. Alternatively, run the following command `heroku buildpacks:set https://github.com/mars/create-react-app-buildpack`<br>
8) Follow deployment instruction on Heroku dashboard.

### Important Tips for Deployment using gh-pages:

1) add `"homepage": "http://yuribenjamin.github.io/my-app"` to package.json
2) add `"predeploy": "npm run build", "deploy": "gh-pages -d build"` to `scripts`
3) `npm install gh-pages --save-dev` to get the relevant package

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
