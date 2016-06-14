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

	function pantryArray(){
		var pantryArr = []
		var pantry = $('.pantry_section').find('.ing')
		for (i=0; i<pantry.length; i++) {
			pantryArr.push(pantry[i].innerText)
		}
		return pantryArr
	}

	$('.search_button').click(function(){
		console.log(pantryArray())
	})

})