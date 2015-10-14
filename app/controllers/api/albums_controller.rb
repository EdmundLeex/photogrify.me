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

  def destroy
    album = Album.find(params[:id])

    if album
      album.destroy
      @albums = current_user.albums.all
      render :index
    else
      # TODO: page not found
    end
  end
end
