class SessionsController < ApplicationController
	def create
		@user = User.where(email: params[:email]).first
		if @user && @user.authenticate(params[:password])
			log_in(@user)
			flash[:notice] = "logged in"
			redirect_to recipes_path
		else
			flash[:alert] = "log in failed"
			redirect_to :back
		end
	end

	def destroy
		log_out
		flash[:notice] = "logged out successfully."
		redirect_to root_path
	end
end
