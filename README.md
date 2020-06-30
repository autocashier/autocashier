# AUTO CASHIER

### Setting up heroku server

Add the following as Buildpacks
* https://github.com/timanovsky/subdir-heroku-buildpack     - This allows us to deploy to heroku while having the server and the client folder in the same github repo
* heroku/nodejs

Add the following Config Vars
* PROJECT_PATH server
* ORIGIN_URL autocashier.uk
* API_KEY "SEND GRID API KEY"
* TO_EMAIL "EMAIL TO SEND QUOTES TO"
* FROM_EMAIL autocashier@autocashier.uk