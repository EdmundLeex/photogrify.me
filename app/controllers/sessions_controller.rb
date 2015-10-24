class SessionsController < ApplicationController
	def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user.nil?
      @username = params[:user][:username]
      flash.now[:danger] = ["Oops... Invalid username or password."]
      render :new
    else
      login_user!(user)
      redirect_to root_url
    end
  end

  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil

    render json: {
      'redirect' => '/home',
      'msg' => 'Logging out...'
    }
  end
end
