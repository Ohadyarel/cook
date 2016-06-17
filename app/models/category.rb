class Category < ActiveRecord::Base
	has_many :user_ingredients
	has_many :ingredients, through: :user_ingredients
	has_many :users, through: :user_ingredients
end
