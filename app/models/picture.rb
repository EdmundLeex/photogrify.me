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
end
