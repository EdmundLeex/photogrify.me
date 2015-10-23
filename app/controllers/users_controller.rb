class UsersController < ApplicationController
	def show
    render :show
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login_user!(@user)
      ensure_album
      redirect_to root_url
    else
      flash.now[:danger] = @user.errors.full_messages
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
