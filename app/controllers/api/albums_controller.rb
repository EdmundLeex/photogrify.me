class Api::AlbumsController < ApplicationController
	before_action :require_user!

  def index
  	@albums = albums_in_desc
  end

  def create
    title = params[:title].blank? ? "No Title" : params[:title]
    description = params[:description] || ""
    img_urls = params[:urls] || []

    @album = current_user.albums.new(title: title, description: description);

    if @album.save
      ActiveRecord::Base.transaction do
        img_urls.each do |url|
          @album.pictures.create(picture_url: url)
        end
      end

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
      @album.title = params[:title] unless params[:title].blank?
      @album.description = params[:description] unless params[:description].blank?
      picture_urls = params[:urls] unless params[:urls].blank?

      if @album.save
        @albums = albums_in_desc
        if picture_urls
          ActiveRecord::Base.transaction do
            picture_urls.each do |url|
              @album.pictures.create(picture_url: url)
            end
          end
        end

        render :index
      else
        # TODO: oops.. something went wrong
      end
    else
      redirect_to home_url
    end
  end

  def destroy
    album = Album.find(params[:id])

    if album
      album.destroy
      @albums = albums_in_desc
      render :index
    else
      # TODO: page not found
    end
  end

  private
  def albums_in_desc
    current_user.albums.all.order('updated_at DESC')
  end
end
