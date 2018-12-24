# Overview

Telephony Server reports new calls. It depends on Process Server Url which have to be provided when initializing server
 
# Requirements

 - NodeJS & NPM
 - MS SQL Server
 
# Installation
 - Clone this git repository
 - ***Telephony Server***

      Please, execute the following commands in your terminal:
 
      Navigate into the Telephony Server directory:
	  
    `$ cd pathToClonedGitRepo/`
    	  
    Set environment variables:
    	 
    `$ cp .env.example .env`
     
    Install dependencies:
	
    `$ npm install`
	
    Finally, run the IB Server
	
    `$ npm run start`

    API documentation:
   
    To generate API documentation run next command:
   
    `$ npm run apidoc`

    Documentation files will be generated inside /apidoc directory.
	 
That's it. You should be ready to start. Please report an issue if you have any troubles!