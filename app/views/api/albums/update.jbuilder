json.msg "#{@msg}"

json.albums do
	json.partial! 'api/shared/album', collection: @albums, as: :album
end

json.pictures do
 json.partial! 'api/shared/picture', collection: @pictures, as: :picture
end