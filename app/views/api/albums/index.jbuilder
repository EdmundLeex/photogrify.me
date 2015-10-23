json.msg "#{@msg}"

json.albums do
	json.partial! 'api/shared/album', collection: @albums, as: :album
end
