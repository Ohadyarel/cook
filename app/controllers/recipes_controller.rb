class RecipesController < ApplicationController
	def index
		@pantry = display_pantry if logged_in?
		@favorites = current_user.favorites if logged_in?
	end

	def show
		@recipe = Recipe.find(params[:id])
	end
end
