class Ingredient < ActiveRecord::Base
	# validates :name, uniqueness: { case_sensitive: false }
	
	has_many :user_ingredients
	has_many :users, through: :user_ingredients
	has_many :categories, through: :user_ingredients
end
