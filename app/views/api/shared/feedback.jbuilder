@feedback.each do |type, msg|
	json.set! type, msg
end