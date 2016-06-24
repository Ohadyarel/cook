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
//= require jquery.turbolinks
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
      data: {ing:data}
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

  // fadeOut the recipe modal and shadow
  function modalHide() {
    $('.modal_shadow').fadeOut(200);
    $('.recipe_modal').fadeOut(300);
  }

  // get all the current_user favorites
  function getFavorites() {
    $.ajax ({
      type: "GET",
      url: "favorites",
      success: function (response) { 
        favorites = response
      }
    })
  }

  // invokes the function on page load
  getFavorites();

  // checks if a user favorited a recipe
  function favorited(favorites, recipe_id){
    for (var i=0; i<favorites.length; i++){
      if (favorites[i].recipe_id == recipe_id){
        return true;
      }
    }
    return false;
  }

  function unsaveClickEvent(recipe_id){
    $('#recipe_unsave_'+recipe_id).click(function(){
      $.ajax ({
        url: "favorites/" + recipe_id,
        type: "DELETE"
      })
      $('#modal_favorite_'+recipe_id).html('<p id="recipe_save_'+recipe_id+'">Save Recipe For Later</p>')
      saveClickEvent(recipe_id)
    })
  }

  function saveClickEvent(recipe_id){
    $('#recipe_save_'+recipe_id).click(function(){
      $.post('favorites', {recipe_id:recipe_id})
      $('#modal_favorite_'+recipe_id).html('<p id="recipe_unsave_'+recipe_id+'">Recipe Saved, Click To Unsave</p>')
      unsaveClickEvent(recipe_id)
    })
  }

  // creates and populates the recipe modal
  function recipeModal(recipe) {
    $('#home').append('<div class="recipe_modal" id="modal_'+recipe.id+'"><div class="recipe_header" id="modal_header_'+recipe.id+'"><div class="recipe_title" id="modal_title_'+recipe.id+'"><h3></h3><span class="glyphicon glyphicon-remove"></span></div></div><div class="recipe_body" id="modal_body_'+recipe.id+'"><ul></ul><a href="#" target="_blank"><p>Click here to view the instructions</p></a></div><div class="recipe_favorite" id="modal_favorite_'+recipe.id+'"></div></div>')
    if (favorited(favorites, recipe.id)){
      $('#modal_favorite_'+recipe.id).html('<p id="recipe_unsave_'+recipe.id+'">Recipe Saved, Click To Unsave</p>');
    } else {
      $('#modal_favorite_'+recipe.id).html('<p id="recipe_save_'+recipe.id+'">Save Recipe For Later</p>');
    }
    $('#modal_header_'+recipe.id).css('background-image','url("' + recipe.image_url + '")');
    $('#modal_title_'+recipe.id+' > h3').text(recipe.title);
    $('#modal_title_'+recipe.id+' > span').click(function(){
      modalHide();
    })
    $('.modal_shadow').click(function(){
      modalHide();
    })
    for (var i=0; i<recipe.ingredients.length; i++){
      $('#modal_body_'+recipe.id+' > ul').append('<li>'+ recipe.ingredients[i] +'</li>')
    };
    $('#modal_body_'+recipe.id+' > a').attr('href',recipe.source_url);
    saveClickEvent(recipe.id);
    unsaveClickEvent(recipe.id);
  }

  // shows the recipe to the user
  function display(recipe) {
    $('.grid').append('<div class="grid-item" id="' + recipe.id + '"><div class="grid-title"><h3>'+ recipe.title + '</h3></div></div>');
    $('#'+recipe.id).css('background-image','url("' + recipe.image_url + '")');
    if (imageHeight(recipe.image_url) <= 500){
      $('#'+recipe.id).css('height',imageHeight(recipe.image_url));
    }
    recipeModal(recipe)
    $('#'+recipe.id).click(function(){
      $('.modal_shadow').fadeIn(200);
      $('#modal_'+recipe.id).fadeIn(300);
    });
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
      success: function(response) { 
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
    $('.grid').html('');
	})

	
  // ======== INDEX#RECIPE ========== //

  $('#home').fadeIn(1000);

  $('.pantry_section').fadeIn(300);

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
    $('.pantry_button').fadeIn(300);
  });

  // ========== SHOW#USER ========== //
  

  $('.unfave_button').click(function(){
    $(this).parent().parent().fadeOut(200);
  })

  $('.saved_img > img').on('load', function(){
    var img_path = $(this).attr('src');
    $(this).parent().parent().css('background-image','url('+img_path+')');
    if (imageHeight(img_path) <= 500){
      $(this).parent().parent().css('height',imageHeight(img_path));
    }
    $('.saved_grid').masonry({
      itemSelector: '.recipe_saved',
      columnWidth: 10
    });
  })
  // var temp = $('.saved_array').attr('id')
  // console.log(temp[1])

  // for (var i=0; i<favorites.length; i++){
  //   console.log('whhhhhhhatttt')
  //   var recipe_img = $('#recipe_header_'+favorites[i].recipe_id)
  //   $('#recipe_header_'+favorites[i].recipe_id).css('background-image','url("' + saved_recipe.image_url + '")')
  // }


});