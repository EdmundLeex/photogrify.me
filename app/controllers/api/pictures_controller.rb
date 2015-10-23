class Api::PicturesController < ApplicationController
	def index
		@pictures = current_user.pictures
		render :index
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
			render :errors
		end
	end

	def transfer
		img_id, album_id = params[:imgId], params[:albumId]
		moved_img				 = Picture.find(img_id)
		move_from_album  = moved_img.album
		move_to_album 	 = Album.find(album_id)

		if moved_img
			moved_img.update(album_id: album_id.to_i)
		else
			# TODO: error msg
		end

		@pictures = move_from_album.pictures

		unless move_to_album.cover_picture_url
			move_to_album.update(cover_picture_url: moved_img.picture_url)
		end

		if move_from_album.cover_picture_url == moved_img.picture_url
			if @pictures.blank?
				move_from_album.update(cover_picture_url: "")
			else
				move_from_album.update(cover_picture_url: @pictures[0].picture_url)
			end
		end

		@albums = albums_in_desc

		render :transfer
	end
end
