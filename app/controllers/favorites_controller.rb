class FavoritesController < ApplicationController
	def create
		@favorite = Favorite.new(user_id: current_user.id, recipe_id: params[:id] )	
		respond_to do |format|
			if @favorite.save
				format.js
			else
				format.html { redirect_to :back }
			end
		end
	end

	def destroy
		@favorite = Favorite.find(params[:id])
		@favorite.destroy
		respond_to do |format|
			format.js
		else
			format.html { redirect_to :back }
		end 
	end
end
