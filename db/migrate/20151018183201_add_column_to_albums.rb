class AddColumnToAlbums < ActiveRecord::Migration
  def change
    add_column :albums, :cover_picture_url, :string
  end
end
