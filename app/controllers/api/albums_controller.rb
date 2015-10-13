class Api::AlbumsController < ApplicationController
  def index
  	@albums = current_user.albums.all
  end
end
