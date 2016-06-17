module UsersHelper
	# associates a new user with the default categories
	# def setup_categories(user)
	# 	9.times do |i|
	# 		UserCategory.create(user_id: user.id, category_id: i+1)
	# 	end
	# end

	# associates a new user with the default ingredients
	def setup_pantry(user)
		82.times do |i|
			if i >= 24 and i<=34
				UserIngredient.create(user_id: user.id, ingredient_id: i, category_id: 1)
			elsif i >= 35 and i<=48
				UserIngredient.create(user_id: user.id, ingredient_id: i, category_id: 2)
			elsif i >= 49 and i<=56
				UserIngredient.create(user_id: user.id, ingredient_id: i, category_id: 3)
			elsif i >= 57 and i<=61
				UserIngredient.create(user_id: user.id, ingredient_id: i, category_id: 4)
			elsif i >= 62 and i<=68
				UserIngredient.create(user_id: user.id, ingredient_id: i, category_id: 5)
			elsif i >= 69 and i<=73
				UserIngredient.create(user_id: user.id, ingredient_id: i, category_id: 6)
			elsif i >= 74 and i<=77
				UserIngredient.create(user_id: user.id, ingredient_id: i, category_id: 7)
			elsif i >= 78 and i<=81
				UserIngredient.create(user_id: user.id, ingredient_id: i, category_id: 8)
			end
		end
	end

end
