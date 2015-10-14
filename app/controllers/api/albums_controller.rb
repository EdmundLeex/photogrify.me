class Api::AlbumsController < ApplicationController
	before_action :require_user!

  def index
  	@albums = current_user.albums.all
  end

  def show
  	@album = Album.find(params[:id])

  	if @album
  		@pictures = @album.pictures
  	else
  		# TODO: page not found
  	end
  end
end
