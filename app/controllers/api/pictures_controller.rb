class Api::PicturesController < ApplicationController
	def index
		@pictures = current_user.pictures
		render json: @pictures
	end
end
