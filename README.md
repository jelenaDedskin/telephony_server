# Overview

Telephony Server reports new calls. It depends on Process Server Url which have to be provided when initializing server
 
# Requirements

 - NodeJS & NPM
 - MS SQL Server
 
# Installation
 - Clone this git repository
 - Navigate into the Telephony Server directory:
	  
    `$ cd pathToClonedGitRepo/`
    	  
 - Set environment variables:
    	 
    `$ cp .env.example .env`
     
 - Install dependencies:
	
    `$ npm install`
	
 - Finally, run the Telephony Server
	
    `$ npm run start`

# API documentation
   
  To generate API documentation run next command:
   
   `$ npm run apidoc`

  Documentation files will be generated inside `/docs` directory.
    
# Code style
    
  For code style eslint is used. 
  You can extend default settings by editing *.eslintrc.js* file.
  You can run ESLint in project’s root directory like this:
  
  `$ npm run eslint`
    
  For full documentation please read <a href="https://eslint.org/docs">official documentation</a>
    
	 
That's it. You should be ready to start. Please report an issue if you have any troubles!