class User < ActiveRecord::Base
	has_secure_password
	validates_confirmation_of :password
	validates_presence_of :password, on: :create
	validates_presence_of :email, on: :create
	validates :email, uniqueness: { case_sensitive: false }
	serialize :pantry

	attr_accessor :pantry

	has_many :favorites
	has_many :recipes, through: :favorites
end
