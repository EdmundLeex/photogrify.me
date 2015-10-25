# == Schema Information
#
# Table name: pictures
#
#  id          :integer          not null, primary key
#  picture_url :string
#  album_id    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  public_id   :string
#  latitude    :float
#  longitude   :float
#

class Picture < ActiveRecord::Base
  belongs_to :album
  delegate :user, to: :album

  validates :album_id, presence: true

  def self.find_user_pictures_in_bounds(user, bounds)
  	self.where("latitude  < ?", bounds[:northEast][:lat])
        .where("latitude  > ?", bounds[:southWest][:lat])
        .where("longitude > ?", bounds[:southWest][:lng])
        .where("longitude < ?", bounds[:northEast][:lng])
        .where("user_id   = ?", user.id)
  end
end
