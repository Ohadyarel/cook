// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function(){

	// PANTRY 

	// Grabing the value of pantry_input and adding it to the a specific pantry_list
	$('.pantry_input').keypress(function(e){
		if (e.which == 13) {
			var ing = $(this).val()
			var id = $(this).parent().parent().parent().attr('id')
			$('#'+id+'_list').append('<li><span class="ing">'+ing+'</span> <span class="delete_ing new_delete">X</span></li>')
			$(this).val('')
			// Create the delete click event for the new list item span tag
			$('.new_delete').click(function(){
				$(this).parent().remove()
			})
    }
	})

	// Remove item from a specific pantry_list
	$('.delete_ing').click(function(){
		$(this).parent().remove()
	})

	// Grab the content of all .ing in the _pantry and push it to a new array
	function pantryArray(){
		var pantryArr = []
		var temp_pantry = $('.pantry_section').find('.ing')
		for (var i=0; i<temp_pantry.length; i++) {
			pantryArr.push(temp_pantry[i].innerText)
		}
		return pantryArr
	}

	//search through each word in the ingredient string and see if it matches one of the words in the pantry array
  function searchPantry(ingredient) {
  	var pantry = pantryArray()
    for (var i=0; i<pantry.length; i++) {
      if (ingredient.search(pantry[i].toLowerCase()) != -1) {
        return true
      }
    }
  }

  //shows the recipe to the user
  function display(recipe) {
    $('#test').append('<p>'+ recipe.title + '</p>')
  }

	//Invokes the searchPantry function on each ingredient in a recipe and checks for a full match 
  function filter(recipe) {
	  var match = 0;
    var ingredients = recipe.ingredients;
    for (var i=0; i<ingredients.length; i++) {
      if (searchPantry(ingredients[i].toLowerCase()) == true) { 
        match++;
      } 
    }
    if (match == ingredients.length) {
      display(recipe)
      console.log(ingredients)
    }
  }

	// api call to get a recipe by it's id and invoke the filter function
	function recipeShow(recipe_id){
    $.ajax ({
      type: "GET",
      url: "http://localhost:3000/api/recipes/" + recipe_id,
      success: function (response) {
        filter(response);
      }
    })
  }

  // api call to get all the recipes, grab their ids and invoke recipeShow
	function recipeIndex() {
  	$.ajax ({
  		type: "GET",
      url: "http://localhost:3000/api/recipes",
      success: function (response) { 
        for (i=0;i<response.length;i++) {
        	match = 0;
          recipeShow(response[i].id);
      	}
      }
  	})
  }

	// Click event on search button to invoke pantryArray
	$('.search_button').click(function(){
		recipeIndex()
	})


	

})