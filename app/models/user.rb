class User < ActiveRecord::Base
	has_secure_password
	validates_confirmation_of :password
	validates_presence_of :password, on: :create
	validates_presence_of :email, on: :create
	validates :email, uniqueness: { case_sensitive: false }
	serialize :pantry

	has_many :favorites
	has_many :recipes, through: :favorites
	has_many :user_ingredients
	has_many :ingredients, through: :user_ingredients
	has_many :user_categories
	has_many :categories, through: :user_categories
end
