module UsersHelper
	def setup_categories(user)
		8.times do |i|
			UserCategory.create(user_id: user.id, category_id: i+1)
		end
	end

	def setup_pantry(user)
		82.times do |i|
			if i >= 24 and i<=81
				UserIngredient.create(user_id: user.id, ingredient_id: i)
			end
		end
	end

end
