json.album do
	json.partial! 'api/shared/album', album: @album
end

json.pictures do
	json.partial! 'api/shared/picture', collection: @pictures, as: :picture
end