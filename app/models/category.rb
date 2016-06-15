class Category < ActiveRecord::Base
	has_many :ingredient_categories
	has_many :ingredients, through: :ingredient_categories
	has_many :user_categories
	has_many :users, through: :user_categories
end
