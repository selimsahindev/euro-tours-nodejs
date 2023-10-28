## Import Development Test Data

First, use --delete flag to make sure the old records are removed.
Then execute with --import to seed the db from the JSON data.

This will import tours, users and reviews.

- Admin User:
  admin@eurotours.io

- Password is 'test1234' for all users.

node ./test-data/data/import-dev-data.js --delete
node ./test-data/data/import-dev-data.js --import
