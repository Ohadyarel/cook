class FavoritesController < ApplicationController
	def index
		render json: current_user.favorites if logged_in?
	end

	def create
		@favorite = Favorite.new(user_id: current_user.id, recipe_id: params[:recipe_id])
		if @favorite.save
			head 204
		end
	end

	def destroy
		@favorite = Favorite.where(user_id: current_user.id, recipe_id: params[:id]).first
		if @favorite.destroy
			head 204
		end
	end
end
