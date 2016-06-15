class Ingredient < ActiveRecord::Base
	has_many :ingredient_categories
	has_many :categories, through: :ingredient_categories
	has_many :user_ingredients
	has_many :users, through: :user_ingredients
end
