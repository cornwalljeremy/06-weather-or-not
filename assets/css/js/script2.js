var list = JSON.parse(localStorage.getItem('cityInput')) || [];


function renderTodos(list) {
  $('.city-search').empty();

  for (var i = 0; i < list.length; i++) {

	var searchItem = $('<p>');
	searchItem.text(list[i]);

	var searchClose = $('<button>');
	searchClose.attr('search-to-do', i);

	searchClose.addClass('checkbox');

	// searchClose.text('✓');

	searchItem = searchItem.prepend(searchClose);

	
	$('.city-search').append(searchItem);
  }
}

$('#add-search').on('click', function(event) {
  event.preventDefault();

  var cityInput = $('.form-control')
	.val()
	.trim();

  list.push(cityInput);

  renderTodos(list);

 
  localStorage.setItem('cityInput', JSON.stringify(list));

  // Clear the textbox when done using `.val()`
  $('.form-control').val('');
});

$(document).on('click', '.checkbox', function() {

  var toDoNumber = $(this).attr('data-to-do');

  // Delete the to-do with that `id` from our local `list` using `.splice()`
  list.splice(toDoNumber, 1);


  renderTodos(list);

  // Save the to-dos into localStorage
  // We need to use JSON.stringify to turn the list from an array into a string
  localStorage.setItem('cityInput', JSON.stringify(list));
});


renderTodos(list);