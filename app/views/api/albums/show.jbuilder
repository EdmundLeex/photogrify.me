	json.id 				 @album.id
	json.title 			 @album.id
	json.description @album.description

	json.pictures do
		json.array! @pictures do |picture|
			json.id picture.id
		end
	end
