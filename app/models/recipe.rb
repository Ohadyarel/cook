class Recipe < ActiveRecord::Base
	serialize :ingredients
	validates :title, uniqueness: { case_sensitive: false }
end
