User.destroy_all

User.create(username: 'demo', password: 'secret')


Album.destroy_all

Album.create(title: 'Demo Album1', description: 'Demo description', user: User.first)
Album.create(title: 'Demo Album2', description: '', user: User.first)
Album.create(title: 'Demo Album3', description: 'description', user: User.first)


Picture.destroy_all

# Picture.create(album: Album.first)
