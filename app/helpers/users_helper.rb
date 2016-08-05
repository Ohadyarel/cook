module UsersHelper
	# associates a new user with the default categories
	# def setup_categories(user)
	# 	9.times do |i|
	# 		UserCategory.create(user_id: user.id, category_id: i+1)
	# 	end
	# end

	# associates a new user with the default ingredients
	def setup_pantry(user)
		58.times do |i|
			if i >= 1 and i <= 11
				UserIngredient.create(user_id: user.id, ingredient_id: i, category_id: 1)
			elsif i >= 12 and i <= 25
				UserIngredient.create(user_id: user.id, ingredient_id: i, category_id: 2)
			elsif i >= 26 and i <= 33
				UserIngredient.create(user_id: user.id, ingredient_id: i, category_id: 3)
			elsif i >= 34 and i <= 38
				UserIngredient.create(user_id: user.id, ingredient_id: i, category_id: 4)
			elsif i >= 39 and i <= 45
				UserIngredient.create(user_id: user.id, ingredient_id: i, category_id: 5)
			elsif i >= 46 and i <= 50
				UserIngredient.create(user_id: user.id, ingredient_id: i, category_id: 6)
			elsif i >= 51 and i <= 54
				UserIngredient.create(user_id: user.id, ingredient_id: i, category_id: 7)
			elsif i >= 55 and i <= 58
				UserIngredient.create(user_id: user.id, ingredient_id: i, category_id: 8)
			end
		end
	end

	# Goes through the users ingredients and places them in the appropriate category
	def display_pantry
		pantry_hash = {1=>[],2=>[],3=>[],4=>[],5=>[],6=>[],7=>[],8=>[],9=>[]}
		ingredients = current_user.user_ingredients
		ingredients.length.times do |i|
			9.times do |num|
				if ingredients[i].category_id == num+1
					pantry_hash[num+1] << ingredients[i].ingredient.name
				end
			end
		end
		pantry_hash
	end

end
