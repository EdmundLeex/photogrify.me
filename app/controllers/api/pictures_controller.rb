class Api::PicturesController < ApplicationController
	def index
		@pictures = current_user.pictures
		# render json: @pictures
	end

	def destroy
		picture = Picture.find(params[:id])

		if picture
			album = picture.album
			picture.destroy
			delete_from_cloudinary(picture.public_id)

			@pictures = album.pictures
			render :index
		else
		end
	end
end
