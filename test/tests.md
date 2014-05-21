# Testing the Instagram Feed.

To think about the tests needed for the Instagram feed, it is useful to think about all of the possible states that the application could be in.
Since Ractive uses a templating engine for tests, we don't have to worry about testing the code that renders the layout.  The testing is specifically regarding the state of the instagram object.

Possible states:

- After Initialization
	- Error State (Improper Client ID or other parameter)
	- Empty State (No data, and no errors) 
- Requesting initial Data
	- Error State (Incorrect Parameters in request)
	- Loading Mutex is triggered and waiting for request.
- Response Received
	- Error Code?
	- Data Received... push into data structure.
- Load more data
	- Load Newer
	- Load Older
- Replace Data
	- Goes back to the initial 'Response Received' state except data must be replaced. 
- Different Requests
	- Tests should be run for user, location, tag, and popular endpoints and all of their possible parameters.


