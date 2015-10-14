class UsersController < ApplicationController
	def show
    render :show
  end

  def create
    @user = User.new(user_params)

    if @user.save
      @user.albums.create(title: "First Album")
      login_user!(@user)
      redirect_to root_url
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
