
# project_s23-chat-union
project_s23-chat-union created by GitHub Classroom

Teammates:Haoxiang Lin, Ke Xu, Yutian Luo, Zhexi Chen, Yanbin Li

App features description document: 
https://docs.google.com/document/d/1icv4mZFDPd_PJ9Of5cyC5fHza8qtqn7zvuK21qqJa7M/edit




To connect cheshire server: 
ssh YOUR_UBIT@cheshire.cse.buffalo.edu

Go to our dir:
cd /web/CSE442-542/2023-Spring/cse-442k/


How to put source code to the server? 
Need to 
1) upload local file on ub_sftp
2) go to cheshire server download a file to server

To upload a file from local computer: 
pc> % sftp YOUR_UBIT@myfiles-sftp.buffalo.edu
sftp> put "absPath filename"

To download a file to server:
> ~ % ssh YOUR_UBIT@cheshire.cse.buffalo.edu
cheshire {~} > cd /web/CSE442-542/2023-Spring/cse-442k/
cheshire {/web/CSE442-542/2023-Spring/cse-442k} > sftp YOUR_UBIT@myfiles-sftp.buffalo.edu
sftp> get "filename"


Accessing UBfs with sftp to myfiles-sftp:
https://www.buffalo.edu/ubit/service-guides/file-storage-and-sharing/accessing-myfiles-from-anywhere/accessing-with-sftp-to-myfiles-sftp.html

How to Transfer Files using SFTP?
https://www.geeksforgeeks.org/how-to-transfer-files-using-sftp/

# To run this project

First move into to the foler "Sping4" 
which is our lastest updated.

### Use "package.json" located in Spring4/Frontend/package.json to build before run npm install.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

