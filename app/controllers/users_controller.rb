class UsersController < ApplicationController
	def show
		@user = User.find(current_user.id)
		@favorites = current_user.favorites
		@saves = current_user.recipes
	end

	def new
		@user = User.new
	end

	def create
		@user = User.new(user_params)
		# check that the passwords match
		if params[:user][:password] != params[:user][:password_confirmation]
      flash[:alert] = "Sorry! The passwords did not match"
      redirect_to(:back)
    else
    	# save the user and redirect to root
			if @user.save
				flash[:notice] = "User created succesfully"
				log_in(@user)
				setup_pantry(@user)
				redirect_to recipes_path
			else
				flash[:alert] = "Something went wrong"
				redirect_to(:back)
			end
		end
	end

	def edit
		@user = current_user
	end

	def update
		@user = current_user
		puts "anflvandlfjnvaldfjnvlajndflvjanfdljvnaldfjnvaldjfnvlajfv"
		puts params.inspect
		puts "anflvandlfjnvaldfjnvlajndflvjanfdljvnaldfjnvaldjfnvlajfv"

		if params[:user][:password] != params[:user][:password_confirmation]
      flash[:alert] = "Sorry! The passwords did not match"
    else
			@user.update(user_params)
			flash[:notice] = "User updated"
		end
		redirect_to :back
	end

	def destroy
		@user = current_user
		@user.favorites.destroy_all
		@user.user_ingredients.destroy_all
		@user.destroy
		log_out
		redirect_to root_path
	end

	private
	def user_params
		params.require(:user).permit(:name, :password, :email, :pantry)
	end
end
