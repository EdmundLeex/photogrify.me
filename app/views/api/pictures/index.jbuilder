json.msg "#{@msg}"

json.pictures do
	json.partial! 'api/shared/picture', collection: @pictures, as: :picture
end