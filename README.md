##Run docker before
Open docker desktop app

##Pull the docker image containing the web app 
docker pull automaticbytes/demo-app

##Run the image 
docker run -p 3100:3100 automaticbytes/demo-app

##Verify the app is shown in below url and set it as the base url for the tests. http://localhost:3100

##Run commands to install Playright

npm init -y
npm install -D @playwright/test
npx playwright install

##Run the test cases with the following command
npx playwright test
