# Nice Quotes API

[![Greenkeeper badge](https://badges.greenkeeper.io/abdulhannanali/nicequotesapi.svg)](https://greenkeeper.io/)

### For instructions on how to deploy this on your own. Go down bae!!!

*NOTE: It might seem different to you that I used Mozilla License but it's
nothing person. It just kinda sounded cool. I don't know what are the actual
terms of Mozilla License but you can use it as though you a software with
MIT License*

Special thanks **NO THANKS** to [www.brainyquotes.com](brainyQuotes) for letting
me scrape their website. This is a free api open source api to let people use
whereever and however they want.

**This is a HATEOAS Compliant API! HELL YEAH!**

### API ENDPOINT: /api/quotes

#### GET - /api/quotes
## GET Response points
This will give you all the quotes present in the database. **/api/quotes** takes
certain parameters to filter the quotes.
- topic
- author
- tags

#### GET - /api/quotes/random
Responds with a single random quote. If parameters are given responds from within
the selection of the parameters. The parameters are same as of the */api/quotes*

#### GET - /api/quotes/id/:id
Responds with a quote of id = :id where id is a parameter to be replaced by the quote of the
id.

## POST - Response point

#### POST - /api/quotes
Post at this point creates a new quote. Accepted types are **urlencoded** and *json*.
Parameters are
- topic
- author
-tags

## DEPLOY YOUR OWN
Fork and clone this repo. Add a file config/keys.js
With following contents
```js
/*
 * This file contains CONNECTION URI OF THE DATABASE AND OTHER SECRET
 * KEYS
 */
module.exports = function () {
  var MONGODB_CONNECTION_URI = // YOUR MONGODB Connection URI here

  return {
    MONGODB_CONNECTION_URI: MONGODB_CONNECTION_URI
  }
}
```
Save the file and your good to go.
Now type
`npm start`

`Visit localhost:3000/api/quotes to see the application in action`

**DISCLAIMER:** The application hosted by abdulhannanali uses MongoLab Sandbox
500MB Free Database. So **24 Hour availability or any reliability is not guaranteed**
