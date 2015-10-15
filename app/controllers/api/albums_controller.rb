class Api::AlbumsController < ApplicationController
	before_action :require_user!

  def index
  	@albums = current_user.albums.all.order('created_at DESC')
  end

  def create
    title = params[:title].blank? ? "No Title" : params[:title]
    description = params[:description] || ""

    @album = current_user.albums.new(title: title);

    if @album.save
      render json: @album
    else
      # TODO: oops.. something went wrong
    end
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
      @album.title = params[:title] unless params[:title] == ""
      @album.description = params[:description] unless params[:description] == ""

      if @album.save
        @albums = current_user.albums.all
        render :index
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
