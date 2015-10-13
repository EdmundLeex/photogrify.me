class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.binary :picture
      t.references :album, index: true, foreign_key: true, null: false

      t.timestamps null: false
    end
  end
end
