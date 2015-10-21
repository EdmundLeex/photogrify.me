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
	"https://c1.staticflickr.com/3/2856/9681774337_75bc6c7d2e_b.jpg",
	"http://screen-wallpapers.com/wallpapers/4138/San-Francisco,%20USA.jpg",
	# here up is sf
	"http://static.onemansblog.com/wp-content/uploads/2015/02/San-Fran-Street-Artist2.jpg",
	"http://www.dailyemerald.com/wp-content/uploads/2013/08/20130824.as_.AesopRock.823.jpg",
	"http://i.kinja-img.com/gawker-media/image/upload/jhveeytnicbaekstrb5s.png",
	"https://static.pexels.com/photos/6550/nature-sky-sunset-man.jpeg",
	"https://static.pexels.com/photos/6495/landscape-mountains-nature-trees.jpeg",
	"https://farm6.staticflickr.com/5548/11874722676_6450fcb8ba_b.jpg",
	"https://c1.staticflickr.com/1/48/133364703_5ad410ea7a_b.jpg",
	"https://picload.files.wordpress.com/2012/10/seljalandsfoss-falls-in-iceland.jpg",
	"http://static1.squarespace.com/static/52e77ab3e4b0a4877ee01abd/t/530b8811e4b0dd985a47773a/1393264664531/IMG_7161.jpg?format=1500w",
	"http://impressivemagazine.com/wp-content/uploads/2014/01/national_parks_yosemite.jpg"
]

def get_imgs_from_cloudinary
	public_ids = Cloudinary::Api.resources(
		type: :upload,
		cloud_name: ENV['cloud_name'],
		api_key: ENV['api_key'],
		api_secret: ENV['api_secret']
	)['resources'][1..-1]
	public_ids
end

User.destroy_all

User.create(username: 'demo', password: 'secret')


Album.destroy_all

Album.create(title: 'Demo Album1', description: 'Demo description', user: User.first)
Album.create(title: 'Demo Album2', description: '', user: User.first)
Album.create(title: 'Demo Album3', description: 'description', user: User.first)

seed_imgs = []
failed_imgs = {}

if Rails.env == 'production'
	begin
		Rake::Task['cloudinary:destroy_all'].invoke
	rescue
		retry
	end

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
else
	seed_imgs = get_imgs_from_cloudinary
end

puts "Persisting Cloudinary urls to database"

Picture.destroy_all
# debugger
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