json.extract!(@albums.first, :title, :description)

json.array! @albums do |album|
	json.id    album.id
	json.title album.title
end
