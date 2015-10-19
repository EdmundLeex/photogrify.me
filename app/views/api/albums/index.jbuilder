json.extract!(@albums.first, :title, :description)

json.partial! 'api/shared/album', collection: @albums, as: :album
