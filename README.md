## Import Development Test Data

First, use --delete flag to make sure the old records are removed.
Then execute with --import to seed the db from the JSON data.

This will import tours, users and reviews.
(Don't forget to comment out the password encryption part in userModel.js)

Admin User:
admin@eurotours.io
test1234

node ./test-data/data/import-dev-data.js --delete
node ./test-data/data/import-dev-data.js --import
