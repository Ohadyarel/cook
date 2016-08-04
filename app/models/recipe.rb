class Recipe < ActiveRecord::Base
	serialize :ingredients
	# validates :title, uniqueness: { case_sensitive: false }

	has_many :favorites
	has_many :users, through: :favorites
end
