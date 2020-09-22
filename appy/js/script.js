$(document).one('pageinit', function(){
	// Display expense
	showexpense();

	// Add Handler
	$('#submitAdd').on('tap', addexpenses);
	
	// Edit Handler
	$('#submitEdit').on('tap', editexpenses);
	
	// Delete Handler
	$('#stats').on('tap','#deleteLink', deleteexpenses);
	
	// Set Current Handler
	$('#stats').on('tap','#editLink', setCurrent);
	
	// Clear Handler
	$('#clearexpense').on('tap', clearexpense);
	
	
	/*
	 * Show all expense on homepage
	 */
	 function showexpense(){
		// get expense object
		var expense = getexpenseObject();
		
		// Check if empty
		if(expense != '' && expense != null){
			for(var i = 0;i < expense.length;i++){
				$('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date:</strong>'+expense[i]["date"]+
				' <br><strong>spent: </strong>'+ expense[i]["miles"]+' ₹<div class="controls">' +
				'<a href="#edit" id="editLink" data-miles="'+expense[i]["miles"]+'" data-date="'+expense[i]["date"]+'">Edit</a> | <a href="#" id="deleteLink" data-miles="'+expense[i]["miles"]+'" data-date="'+expense[i]["date"]+'" onclick="return confirm(\'Are You Sure?\')">Delete</a></li>');
			}
			$('#home').bind('pageinit', function(){
				$('#stats').listview('refresh');
			});
		} else {
			$('#stats').html('<p>You have no logged expense</p>');
		}
	 }
	 
	/*
	 * Add a expenses
	 */
	 function addexpenses(){
		// Get form values
		var miles = $('#addMiles').val();
		var date = $('#addDate').val();
		
		// Create 'expenses' object
		var expenses = {
			date: date,
			miles: parseFloat(miles)
		};
		
		var expense = getexpenseObject();
		
		// Add expenses to expense array
		expense.push(expenses);
		
		alert('expenses Added');
		
		// Set stringified object to localStorage
		localStorage.setItem('expense', JSON.stringify(expense));
		
		// Redirect
		window.location.href="index.html";
		
		return false;
	 }
	 
	 
	 /*
	 * Edit expenses
	 */
	 function editexpenses(){
		// Get current data
		currentMiles = localStorage.getItem('currentMiles');
		currentDate = localStorage.getItem('currentDate');
		
		var expense = getexpenseObject();
		
		// Loop through expense
		for(var i = 0;i < expense.length;i++){
			if(expense[i].miles == currentMiles && expense[i].date == currentDate){
				expense.splice(i,1);
			}
			localStorage.setItem('expense',JSON.stringify(expense));
		}
		
		// Get form values
		var miles = $('#editMiles').val();
		var date = $('#editDate').val();
		
		// Create 'expenses' object
		var update_expenses = {
			date: date,
			miles: parseFloat(miles)
		};
		
		// Add expenses to expense array
		expense.push(update_expenses);
		
		alert('expenses Updated');
		
		// Set stringified object to localStorage
		localStorage.setItem('expense', JSON.stringify(expense));
		
		// Redirect
		window.location.href="index.html";
		
		return false;
	 }
	 
	 function clearexpense(){
		localStorage.removeItem('expense');
		$('#stats').html('<p>You have no logged expense</p>');
	 }
	 
	 
	 /*
	 * Delete expenses
	 */
	 function deleteexpenses(){
		// Set ls items
		localStorage.setItem('currentMiles', $(this).data('miles'));
		localStorage.setItem('currentDate', $(this).data('date'));
		
		// Get current data
		currentMiles = localStorage.getItem('currentMiles');
		currentDate = localStorage.getItem('currentDate');
		
		var expense = getexpenseObject();
		
		// Loop through expense
		for(var i = 0;i < expense.length;i++){
			if(expense[i].miles == currentMiles && expense[i].date == currentDate){
				expense.splice(i,1);
			}
			localStorage.setItem('expense',JSON.stringify(expense));
		}
		
		alert('expenses Deleted');
		
		// Redirect
		window.location.href="index.html";
		
		return false;
	 }
	 
	 
	 /*
	 * Get the expense object
	 */
	 function getexpenseObject(){
		// Set expense array
		var expense = new Array();
		// Get current expense from localStorage
		var currentexpense = localStorage.getItem('expense');
		
		// Check localStorage
		if(currentexpense != null){
			// Set to expense
			var expense = JSON.parse(currentexpense);
		}
		
		// Return expense object
		return expense.sort(function(a, b){return new Date(b.date) - new Date(a.date)});
	 }
	 
	 /*
	 * Set the current clicked miles and date
	 */
	 function setCurrent(){
		// Set ls items
		localStorage.setItem('currentMiles', $(this).data('miles'));
		localStorage.setItem('currentDate', $(this).data('date'));
		
		// Insert form fields
		$('#editMiles').val(localStorage.getItem('currentMiles'));
		$('#editDate').val(localStorage.getItem('currentDate'));
	 }
});