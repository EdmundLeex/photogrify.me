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

  def update
    @album = Album.find(params[:id])

    if @album
      @album.title = params[:title]

      if @album.save
        render json: @album.title
      else
        # TODO: oops.. something went wrong
      end
    else
      # TODO: album dont' exist
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
