module API	
	class IngredientsController < ApplicationController

		def create
			if ingredient = Ingredient.where(name: params[:ing][:ingredient].capitalize).first
				puts "kjnfkvjandfkjvankdfjvnakjfdnvkajnfdkvjaf"
				puts ingredient
				puts ingredient.id
				if user_ing = UserIngredient.where(ingredient_id: ingredient.id, user_id: current_user.id, category_id: params[:ing][:category_id]).first
					render json: ingredient, status: 201, location: [:api, ingredient]
				else
					user_ing = UserIngredient.new(ingredient_id: ingredient.id, user_id: current_user.id, category_id: params[:ing][:category_id])
					if user_ing.save
						render json: ingredient, status: 201, location: [:api, ingredient]
					end
				end
      else
				ingredient = Ingredient.new(name: params[:ing][:ingredient].capitalize)
        user_ing = UserIngredient.new(ingredient_id: ingredient.id, user_id: current_user.id, category_id: params[:ing][:category_id])
        if ingredient.save and user_ing.save
	        render json: ingredient, status: 201, location: [:api, ingredient]
	      end
	    end
		end

		def destroy
			ingredient = Ingredient.where(name: params[:ing][:ingredient]).first
			user_ing = UserIngredient.where(user_id: current_user.id, ingredient_id: ingredient.id, category_id: params[:ing][:category_id]).first
			if user_ing.delete
				head 204
    	else
    		render json: user_ing.errors, status: 422
    	end
		end

	end
end