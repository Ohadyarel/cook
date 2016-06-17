class UserIngredient < ActiveRecord::Base
	belongs_to :user
	belongs_to :ingredient
	belongs_to :category
end
