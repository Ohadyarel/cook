class RecipesController < ApplicationController
	def index
		@pantry = display_pantry if logged_in?
	end

	def show
		@ingredient = Ingredient.find(params[:id])
	end
end
