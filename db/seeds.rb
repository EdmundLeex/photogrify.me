img_urls = [
	"http://sanfranciscodeluxetours.com/images/sfdeluxe-gal-img-51.jpg",
	"http://wallpaperput.com/wp-content/uploads/2014/11/landscape-beautiful-san-francisco-at-night-wallpaper.jpg",
	"https://upload.wikimedia.org/wikipedia/commons/7/7f/America's_Greatest_City_By_The_Bay_at_Union_Square,_San_Francisco,_CA.jpg",
	"http://www.super8sanfrancisco.com/blog/wp-content/uploads/2015/03/San-Francisco-Cable-Cars.jpg",
	"http://tobyharriman.com/wordpress/wp-content/uploads/2014/08/Different_Perspectives_of_SF.jpg",
	"http://www.landscape-photo.net/albums/userpics/10001/The-Cable-Car-in-San-Francisco-streets.jpg",
	"http://ww1.hdnux.com/photos/32/42/42/6957232/9/rawImage.jpg",
	"http://www.heleninwonderlust.co.uk/wp-content/uploads/2014/03/Street-Art-Chinatown-San-Francisco.jpg",
	"http://cdn.thebolditalic.com/e=resrcit_cdn_origin/s=h1000,pd1/o=85/http://cdn.thebolditalic.com/paperclip/articles/6736/hero_images/original/aahero.jpg?1422477676",
	"http://archiengi.com/wp-content/uploads/2014/09/Sand-Art-at-San-Francisco-By-A-4.jpg",
	"http://kevinchin.intothedarkroom.me/wp-3032DLTQLX/wp-content/uploads/v1site_images/2014/06/Diana_Kee_WED_0527.jpg",
	"https://trashmashup.files.wordpress.com/2013/05/tmu2.jpg",
	"http://kevinwarnock.com/wp-content/uploads/2012/10/Aaron-Bray-owner-of-PushPullArtDesign-dot-com-October-20-2012-Lower-Haight-Urban-Air-Market-San-Francisco.jpg",
	"http://www.enjoyourholiday.com/wp-content/uploads/2013/10/San-Francisco-Tramline.jpg",
	"http://static.onemansblog.com/wp-content/uploads/2015/02/San-Fran-Street-Artist2.jpg",
	"http://www.dailyemerald.com/wp-content/uploads/2013/08/20130824.as_.AesopRock.823.jpg"
]

User.destroy_all

User.create(username: 'demo', password: 'secret')


Album.destroy_all

Album.create(title: 'Demo Album1', description: 'Demo description', user: User.first)
Album.create(title: 'Demo Album2', description: '', user: User.first)
Album.create(title: 'Demo Album3', description: 'description', user: User.first)


Picture.destroy_all
begin
	Rake::Task['cloudinary:destroy_all'].invoke
rescue
	retry
end

seed_imgs = []
failed_imgs = {}
# img_file = File.read('./db/images/images.txt').split("\n")

puts "Uploading to Cloudinary:"
img_urls.each do |url|
	begin
		seed_imgs << Cloudinary::Uploader.upload(url, cloud_name: ENV['cloud_name'],
																									public_id: ENV['public_id'],
																									api_key: ENV['api_key'],
																									api_secret: ENV['api_secret'])
	rescue CloudinaryException => e
		failed_imgs[url] = e
		next
	end
	print "."
end
print "\n"
puts "Upload finished."

puts "Persisting Cloudinary urls to database"

seed_imgs.each do |img|
	Album.first.pictures.create(picture_url: img['url'], public_id: img['public_id'])
	print "."
end
print "\n"

Album.first.update(cover_picture_url: seed_imgs[0]['url'])


puts "=" * 40
puts "#{failed_imgs.size} file(s) failed to be uploaded."
puts "-" * 40
puts "Upload failed images:"
failed_imgs.each do |url, error|
	puts "- " + url
	puts "  " + error.to_s
end
puts "=" * 40