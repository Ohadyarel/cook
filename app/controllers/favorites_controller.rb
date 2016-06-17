class FavoritesController < ApplicationController
	def create
		@favorite = Favorite.new(user_id: current_user.id, recipe_id: params[:recipe_id])	
		if @favorite.save
			redirect_to :back
		end
		# respond_to do |format|
		# 	if @favorite.save
		# 		format.js
		# 	else
		# 		format.html { redirect_to :back }
		# 	end
		# end
	end

	def destroy
		@favorite = Favorite.find(params[:id])
		respond_to do |format|
			if @favorite.destroy
				format.js
			else
				format.html { redirect_to :back }
			end 
		end
	end
end
