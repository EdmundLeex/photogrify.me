# View Wireframes

## Landing Page
![landing_page]

## Sign up / Sign in Page
![sign_up]

## Albums Index Page
This page is shown immidiately after user login.
### Component Tree
<Home>
	<Sidebar />
	<Main>
		<AlbumIndex>
			<AlbumIndexItem />
		</AlbumIndex>
		<AlbumShow>
			<AlbumTitleBar />
			<PicturesIndex>
				<PictureIndexItem />
				<PictureSlideshow /> (Hidden until clicked)
			</PicturesIndex>
		</AlbumShow>
	</Main>
</Home>

![album_index]

## Albums New / Edit Page
![album_new_edit]

[landing_page]: ./wireframes/landing_page.png
[sign_up]: ./wireframes/sign_up.png
[album_index]: ./wireframes/album_index.png
[album_new_edit]: ./wireframes/album_new_edit.png