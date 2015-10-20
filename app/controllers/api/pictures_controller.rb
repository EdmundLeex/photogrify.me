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

	def transfer
		img_id, album_id = params[:imgId], params[:albumId]
		begin
			Picture.update(img_id.to_i, album_id: album_id.to_i)
		rescue ActiveRecord::InvalidForeignKey => e
			# render errors
			return
		end

		@album = Album.find(album_id)
		@pictures = @album.pictures

		render :index
	end
end
