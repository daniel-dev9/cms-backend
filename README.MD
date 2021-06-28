# CMS Node Express API

## Getting Started

To get started, make sure to run the following commands.
1. Install the packages

    `npm install`
    
2. Set the environment variables at `.env`
**Note: All variables are required.**

- MAX_IMGS - Maximum Images to Store per Page
- PORT - Port for server to run on
- DB_CLIENT - Database client name - [Knex Docs](http://knexjs.org/#Installation-client "Knex Docs")
- DB_USERNAME - Database username
- DB_NAME - Database name
- DB_PASS - Database password
- DB_URL - Database host URL
- DB_PORT - Database port
- AWS_BUCKET_NAME - AWS bucket name
- AWS_BUCKET_REGION - AWS bucket region
- AWS_ACCESS_KEY - AWS acess token
- AWS_SECRET_KEY - AWS secret token

3. Run the migrations to create the tables and necessary relationships

	`npm run mk-migrations`

	On windows platforms this command may throw errors in windows default terminal. 
	- Fix: Make sure git is installed on windows machine. Then run `npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"` from the project root. Replace the path for bash shell in your platform. (reset this by running `npm config delete script-shell`)
	- Alternatively this config can be set locally to the project. Run `npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe" --userconfig ./.npmrc` in your project root to set npm script-shell for current project only. To globally set npm script-shell, run `npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe" [--global]`. 
	
4. Start the server

	`npm start`

Read the [API Documentation](https://documenter.postman.com/preview/8056176-b8e7def2-f6c7-4d7d-b743-b3ce0492c380?environment=&versionTag=latest&apiName=CURRENT&version=latest&documentationLayout=classic-double-column&right-sidebar=303030&top-bar=FFFFFF&highlight=EF5B25#intro "API Documentation") for more information.
