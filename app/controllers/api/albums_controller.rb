class Api::AlbumsController < ApplicationController
	before_action :require_user!

  def index
  	@albums = albums_in_desc
  end

  def create
    title = params[:title].blank? ? "No Title" : params[:title]
    description = params[:description] || ""
    picture_urls = params[:urls]
    picture_urls = JSON.parse(picture_urls) if picture_urls

    @album = current_user.albums.new(title: title, description: description);

    if @album.save
      if picture_urls
        save_pictures_to_album(@album, picture_urls)
      end

      render json: @album
    else
      render_generic_error
    end
  end

  def show
  	@album = Album.find(params[:id])

  	if @album
  		@pictures = @album.pictures
      render :show
  	else
  		# TODO: page not found
  	end
  end

  def update
    @album = Album.find(params[:id])

    if @album
      @album.title = params[:title] unless params[:title].blank?
      @album.description = params[:description] unless params[:description].blank?

      unless params[:urls].blank?
        picture_urls = params[:urls]
        picture_urls = JSON.parse(picture_urls)
      end

      if @album.save
        @albums = albums_in_desc
        if picture_urls
          save_pictures_to_album(@album, picture_urls)
        end
        @pictures = @album.pictures

        render :update
      else
        render_generic_error
      end
    else
      redirect_to home_url
    end
  end

  def destroy
    album = Album.find(params[:id])

    if album
      album.pictures.each do |pic|
        delete_from_cloudinary(pic.public_id)
      end

      album.destroy
      @albums = albums_in_desc
      @msg = "#{album.title} is deleted."
      render :index
    else
      # TODO: page not found
    end
  end

  def update_cover
    picture = Picture.find(params[:imgId])

    if picture
      picture.album.update(cover_picture_url: picture.picture_url)
      @albums = albums_in_desc
      @msg = "You have changed the cover picture."
      render :index
    else
      render_generic_error
    end
  end

  private

  def save_pictures_to_album(album, picture_urls)
    ActiveRecord::Base.transaction do
      picture_urls.each do |url|
        album.pictures.create(picture_url: url['secure_url'], public_id: url['public_id'])
      end

      unless album.cover_picture_url
        album.update(cover_picture_url: picture_urls.first['secure_url'])
      end
    end
  end
end
