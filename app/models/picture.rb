# == Schema Information
#
# Table name: pictures
#
#  id         :integer          not null, primary key
#  picture    :binary
#  album_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Picture < ActiveRecord::Base
  belongs_to :album
  delegate :user, to: :album

  validates :album_id, presence: true
end
