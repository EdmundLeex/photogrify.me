json.extract!(@albums.first, :title, :description)

json.array! @albums do |album|
	json.title album.title
end
