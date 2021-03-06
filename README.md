# Sandy's Mapsite
This project is called "Sandy's Mapsite" and it's a place to pin and save locations on a map of the world. It has also been a way for me to practice developing with the MERN (MongoDB, Express, React, Node.js) stack. Frontend has been styled with Bootstrap. Dockerized and deployed with Amazon Fargate at https://spk.sandysmapsite.com. Map component built with react-leaflet and leaflet-geosearch. 

# Getting Started
To contribute:
- Navigate to this repo: sandykaur2008/world-map
- Follow these instructions: https://help.github.com/articles/fork-a-repo/

To simply view: 
- Navigate to this repo: sandykaur2008/world-map
- Follow these instructions: https://help.github.com/articles/cloning-a-repository/

# Prerequisites
Aside from a working browser, you will also need:

- the dependencies in package.json

## To install dependencies in package.json
Make sure you're in root directory of repo and execute:

```npm install```

## To build files via babel
Make sure you're in root directory of repo and execute:

```npm run postinstall```

## To get create-react-app build (which will be served by server as static files)
Make sure you're in root directory of repo and execute:

```npm run build```

## To actually run website once repo cloned, dependencies installed, appropriate files compiled
- Navigate to root directory
- Make sure Mongo server is running (open separate terminal window and type ``` mongod ```)
- Execute: 

```npm start```

- Navigate to link provided 

# Built With
- Visual Studio Code 1.25.1
- Node.js 10.14.1
- See package.json

# Authors
Satinder Kaur 

# Acknowledgments
Thanks, @github/markalexandercastillo, for your help. :relaxed: 
Also, found https://github.com/dceddia/rando very helpful. 

# To Do
Would like to learn how to test React frontend well and need to fix issue with map routing. 