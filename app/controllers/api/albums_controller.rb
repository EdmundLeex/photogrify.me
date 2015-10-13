class Api::AlbumsController < ApplicationController
  def index
  	@albums = Album.all
  end
end
