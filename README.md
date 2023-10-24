## Import Development Test Data

First, use --delete flag to make sure the old records are removed.
Then execute with --import to seed the db from the JSON data.

node ./test-data/data/import-dev-data.js --delete
node ./test-data/data/import-dev-data.js --import
