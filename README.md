# Complete Setup Guide
## Backend
All you need to do are three steps:
1. download the .env folder from Homehub Drive to the Backend folder
2. docker build --tag homehubbackend .
3. docker run -p 5000:5000 homehubbackend

NO MORE SET UP PAIN! EMBRACE THE MAGIC OF DOCKER AND CRIS(who actually put yall through the pain at the first place)!

# Potential Errata:

<b> E1 </b>

1. If receiving errors from chat section: try new API key and secret(will be updated regularly):

    Key: 57tcrkskk54w 

    Secret: jp592pew7pst9jt2w5v3zz6ytpb8j7euq7mfakp5ezxn9j4s2a2e7xch35vk9dgn

2. How to update: 

    a. Update the <b> ChatApp.js </b> in the components file(only key needed) from FrontEnd folder

    b. Update the <b> authentification.py </b> from BackEnd folder(can be found in the beginning of the code). 
    
<b> E2 </b>

During some unknown circumstances (different machines, preexisting node_modules), there might be this weird behavior of webpack keeping recompiling. 

If this happens: go to [This Issue](https://github.com/Yizong98/Housing_Proj/issues/18)

# Development Guide
## Editor
It is highly recommended to use Visual Studio Code for its extensive library support. 
## Style
For React style guide, please refer to [the Airbnb Style Guide](https://github.com/airbnb/javascript/tree/master/react)

Please use [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to autoformat for React Code along with style guide. The set up for <b> setting.json </b> is the following:


{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[javascriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
    // Set the default
    "editor.formatOnSave": false,
}

## CI/CD

1. "In software engineering, CI/CD or CICD generally refers to the combined practices of continuous integration and either continuous delivery or continuous deployment." [link](https://en.wikipedia.org/wiki/CI/CD)

2. Such principle is implemented by Travis CI in Github. The configuration can be found in [this file](https://github.com/Yizong98/Housing_Proj/blob/master/.travis.yml)

## Hard Rules

1. <b> Any </b> code change <b> must not </b>  be directly pushed to Master, the purpose of Master branch is to ensure no matter how we modify the code we still can go back to a working codebase if everything is just messed up. This rule is enforced by Rule setting on Github and any push to Master will be rejected.

2. <b> PR must </b> 1. pass all written tests 2. be reviewed by two developers of the team to be merged into Master. This is to ensure all checks are clear to maintain the quality of existing codebase.

## Testings

1. For Python we will be using the [unit test framework](https://docs.python.org/3/library/unittest.html).
2. For npm we will be using JEST and react-test-renderer. [Example](https://github.com/Yizong98/Housing_Proj/blob/master/FrontEnd/app/components/Test/CalendarSelectTest.spec.js) can be found here.










