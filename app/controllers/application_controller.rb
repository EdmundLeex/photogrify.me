class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :current_user_id, :logged_in?

  GENERIC_ERROR = "Oops... something is not quite right."

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def current_user_id
    current_user ? current_user.id : nil
  end

  def logged_in?
    !!current_user
  end

  def login_user!(user)
    session[:session_token] = user.reset_session_token!
  end

  def require_user!
    if current_user.nil?
      flash[:errors] = ["You need to login to perform this action."]
      redirect_to home_url
    end
  end

  protected

  def delete_from_cloudinary(public_id)
    Cloudinary::Uploader.destroy(
      public_id,
      api_key: ENV['api_key'],
      api_secret: ENV['api_secret'],
      cloud_name: ENV['cloud_name']
    )
    rescue CloudinaryException
  end

  def albums_in_desc
    current_user.albums.all.order('updated_at DESC')
  end
end
