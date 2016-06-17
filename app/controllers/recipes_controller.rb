class RecipesController < ApplicationController
	def index
		@pantry = display_pantry if logged_in?
	end

	def show
		@recipe = Recipe.find(params[:id])
		@favorite = Favorite.where(recipe_id: params[:id], user_id: current_user.id).first if logged_in?
	end
end
