json.extract!(@albums.first, :title, :description)

json.array! @albums do |album|
	json.id    album.id
	json.title album.title
	json.description album.description
	json.cover_url album.cover_picture_url
end
