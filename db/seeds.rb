require_relative './images/images'
User.destroy_all

User.create(username: 'demo', password: 'secret')


Album.destroy_all

Album.create(title: 'Demo Album1', description: 'Demo description', user: User.first)
Album.create(title: 'Demo Album2', description: '', user: User.first)
Album.create(title: 'Demo Album3', description: 'description', user: User.first)


Picture.destroy_all
Rake::Task['cloudinary:destroy_all'].invoke

seed_imgs = []
failed_imgs = []

Seed_Img::IMG_URLS.each do |url|
	begin
		seed_imgs << Cloudinary::Uploader.upload(url, cloud_name: ENV['cloud_name'],
																									public_id: ENV['public_id'],
																									api_key: ENV['api_key'],
																									api_secret: ENV['api_secret'])
	rescue CloudinaryException
		failed_imgs << url
		next
	end
end

seed_imgs.each do |img|
	Album.first.pictures.create(picture_url: img['url'], public_id: img['public_id'])
end

Album.first.update(cover_picture_url: seed_imgs[0]['url'])

puts "=" * 40
puts "#{failed_imgs.size} failed to be uploaded."
puts "-" * 40
puts "Upload failed images:"
failed_imgs.each { |img| puts "- " + img }
puts "=" * 40