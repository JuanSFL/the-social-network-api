  # The Social Network API
  
  
  ![badge](https://img.shields.io/badge/license-mit-blue)
    
  ## Table-of-Contents
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  
  * [License](#license)
    
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  
  ## [Description](#table-of-contents)
  This is an API for a social network that lets users add friends, share thoughts and react to eachothers thoughts.
  ## [Installation](#table-of-contents)
  * Clone github repository. 
  * Once you have cloned the repository, use the terminal and run the command: npm install, to install all packages that are needed.
  ## [Usage](#table-of-contents)
  * After installing all necessary packages, run the command: npm start to run your server.
  * Open MongoDB Compass and connect to the MongoDB URI
  ### Use insomnia to create the seed data:
  1. Post new user: POST /api/users
  * Example JSON: 
  {
	"username":"Louis",
	"email":"Louis@me.com"
  }  
  2. Get all users: GET /api/users
  3. Get user by ID: GET /api/users/:userId
  4. Update a single user by ID: PUT /api/users/:userId
  5. Delete a single user by id: DELETE /api/user/:userId
  6. Create a new thought: POST /api/thoughts/
  * Example Json: {
	"thoughtText":"The superbowl was so fun to watch",
	"username":"Louis",
	"userId":"63ec424c014f6e8c562714be"
  }
  7. Get all thoughts: GET /api/thoughts/
  8. Get a single thought by ID: GET /api/thoughts/:thoughtId
  9. Update a thought by ID: PUT /api/thoughts/:thoughtId
  10. Delete a thought by its id: DELETE /api/thoughts/:thoughtId
  11. Add a new friend to a user's friend list: POST /api/users/:userid/friends/:friendId
  12. Remove a friend from a user's friend list: DELETE /api/users/:userid/friends/:friendId
  13. Create a reaction: POST /api/thoughts/:thoughtId/reactions
  * Example JSON: {
	"reactionBody":"I couldn't agree more!!!",
	"username": "Alexander",
	"userId":"63ed626301c6f922c06c81be"
  }
  14. Delete a reaction by ID: DELETE /api/thoughts/:thoughtId/reactions/:reactionId
  
  ## [License](#table-of-contents)
  The application is covered under the following license:
  
  [mit](https://choosealicense.com/licenses/mit)
    
    
  ## [Contributing](#table-of-contents)
  
  
  Thank you for your interest in helping out, but I am not accepting contributions at this time.
    
  ## [Tests](#table-of-contents)
  After installing all files, and connecting to the mongoose database, run your server by running the command 'npm start' and go to insomnia to test the GET, POST, PUT, and DELETE methods.
  ## [Questions](#table-of-contents)
  Please contact me using the following links:<br>
  [GitHub](https://github.com/JuanSFL)<br>
  [Email: Molina98j@yahoo.com](mailto:Molina98j@yahoo.com)
