class Api::PicturesController < ApplicationController
	before_action :require_user!

	def index
		if bounds = params[:bounds]
			@pictures = current_user.pictures
															.where("latitude  < ?", bounds[:northEast][:lat])
															.where("latitude  > ?", bounds[:southWest][:lat])
															.where("longitude > ?", bounds[:southWest][:lng])
															.where("longitude < ?", bounds[:northEast][:lng])
		else
			@pictures = current_user.pictures
		end
		render :index
	end

	def destroy
		picture = Picture.find(params[:id])

		if picture
			album = picture.album
			picture.destroy
			delete_from_cloudinary(picture.public_id)

			@pictures = album.pictures
			@msg = "Picture is deleted."

			render :index
		else
			render_generic_error
		end
	end

	def transfer
		img_id, album_id = params[:imgId], params[:albumId]
		moved_img				 = Picture.find(img_id)
		move_from_album  = moved_img.album
		move_to_album 	 = Album.find(album_id)

		if moved_img
			moved_img.update(album_id: album_id.to_i)

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
			@msg = "Picture is moved to #{move_to_album.title}."

			render :transfer
		else
			render_generic_error
		end
	end
end
