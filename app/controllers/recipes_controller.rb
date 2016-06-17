class RecipesController < ApplicationController
	def index
		# @user = current_user
		@ingredients = current_user.ingredients if logged_in?
	end

	def show
		@ingredient = Ingredient.find(params[:id])
	end
end
