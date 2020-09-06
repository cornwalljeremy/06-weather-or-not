var post;

// Call the API
fetch('https://jsonplaceholder.typicode.com/posts/5').then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (data) {

	// Store the post data to a variable
	post = data;

	// Fetch another API
	return fetch('https://jsonplaceholder.typicode.com/users/' + data.userId);

}).then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (userData) {
	console.log(post, userData);
}).catch(function (error) {
	console.warn(error);
});