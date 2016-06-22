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

	// ======== PANTRY ========== //

  // SAVE PANTRY 
  // add ingredient to the UserIngredient model
  function addIngredient(data) {
    $.post('api/ingredients', {ing:data})
  }

  // remove ingredient from the UserIngredient model
  function removeIngredient(data) {
    $.ajax ({
      url: "api/ingredients/1",
      type: "DELETE",
      data: {ing:data},
      success: function (response) { 
        console.log(response)
      }
    })
  }

  // ADD AND REMOVE INGREDIENT
	// Grabing the value of pantry_input and adding it to the a specific pantry_list
	$('.pantry_input').keypress(function(e){
		if (e.which == 13) {
			var ing = $(this).val()
			var id = $(this).parent().parent().parent().parent().attr('id')
      addIngredient({category_id: id,ingredient: ing})
			$('#'+id+'_list').append('<li><span class="ing">'+ing+'</span> <span class="delete_ing new_delete">X</span></li>')
			$(this).val('')
			// Create the delete click event for the new list item span tag
			$('.new_delete').click(function(){
        var ingDel = $(this).parent().find('.ing')
        var idDel = $(this).parent().parent().parent().parent().attr('id')
        removeIngredient({category_id: idDel,ingredient: ingDel[0].innerText})
				$(this).parent().remove()
			})
    }
	})

  // add ing button
  $('.add_ing').click(function(){
    var ing = $(this).parent().parent().find('.pantry_input').val()
    var id = $(this).parent().parent().parent().parent().parent().attr('id')
    addIngredient({category_id: id,ingredient: ing})
    $('#'+id+'_list').append('<li><span class="ing">'+ing+'</span> <span class="delete_ing new_delete">X</span></li>')
    $(this).parent().parent().find('.pantry_input').val('')
    // Create the delete click event for the new list item span tag
    $('.new_delete').click(function(){
      var ingDel = $(this).parent().find('.ing')
      var idDel = $(this).parent().parent().parent().parent().attr('id')
      removeIngredient({category_id: idDel,ingredient: ingDel[0].innerText})
      $(this).parent().remove()
    }) 
  })

	// Remove item from a specific pantry_list
	$('.delete_ing').click(function(){
    var ingDel = $(this).parent().find('.ing')
    var idDel = $(this).parent().parent().parent().parent().attr('id')
    removeIngredient({category_id: idDel,ingredient: ingDel[0].innerText})
		$(this).parent().remove()
	})

  // ==== DISPLAY SEARCH RESULTS ==== //

  // get image height
  function imageHeight(url) {
    var tempImg = new Image();
    tempImg.src = url;
    return tempImg.naturalHeight
  }

  // get image width
  function imageWidth(url) {
    var tempImg = new Image();
    tempImg.src = url;
    return tempImg.naturalWidth
  }

  //shows the recipe to the user
  function display(recipe) {
    $('.grid').append('<div class="grid-item" id="' + recipe.id + '"><div class="grid-title"><h3>'+ recipe.title + '</h3></div></div>');
    $('#'+recipe.id).css('background-image','url("' + recipe.image_url + '")')
    $('#'+recipe.id).css('height',imageHeight(recipe.image_url))
  }

  // =========== SEARCH ============= //

  // Grab the content of all .ing in the _pantry/_user_pantry and push it to a new array
  function pantryArray(){
    var pantryArr = []
    var tempPantry = $('.pantry_section').find('.ing')
    for (var i=0; i<tempPantry.length; i++) {
      pantryArr.push(tempPantry[i].innerText)
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

	//Invokes the searchPantry function on each ingredient in a recipe and checks for a full match 
  function filterRecipe(recipe) {
	  var match = 0;
    var ingredients = recipe.ingredients;
    // removing certain "ingredients" because of the structure of the api
    for (var i=0; i<ingredients.length; i++) {
      if (ingredients[i] == "_____") {
        ingredients.splice(i,2)
      }
    }
    for (var i=0; i<ingredients.length; i++) {
      if (searchPantry(ingredients[i].toLowerCase()) == true) { 
        match++;
      } 
    }
    if (match == ingredients.length) {
      display(recipe)
    }
  }

  // api call to get all the recipes, grab their ids and invoke recipeShow
	function recipeIndex() {
  	$.ajax ({
  		type: "GET",
      url: "api/recipes",
      success: function (response) { 
        for (var i=0; i<response.length; i++) {
          filterRecipe(response[i]);
      	}
        $('.grid').masonry({
          itemSelector: '.grid-item',
          columnWidth: 10
        });
      }
  	})
  }

	// Click event on search button to invoke pantryArray
	$('.search_title').click(function(){
		recipeIndex()
    $('.pantry_list').slideUp();
    $('#pantry_wrapper').slideUp();
    $('.pantry_button').fadeIn(200);
	})

	
  // ======== INDEX#RECIPE ========== //

  $('#home').fadeIn(1000);

  $('.pantry_section').fadeIn(500);

  $('.pantry_header').click(function(){
    $(this).parent().find('.pantry_list').slideToggle();
  });

  $('.pantry_button').click(function(){
    $('#pantry_wrapper').slideDown();
    $('.pantry_button').fadeOut(200);
  });

  $('.glyphicon-menu-up').click(function(){
    $('.pantry_list').slideUp();
    $('#pantry_wrapper').slideUp();
    $('.pantry_button').fadeIn(200);
  });

});