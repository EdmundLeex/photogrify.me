# == Schema Information
#
# Table name: pictures
#
#  id         :integer          not null, primary key
#  picture    :binary
#  user_id    :integer
#  album_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Picture < ActiveRecord::Base
  belongs_to :user
  belongs_to :album
end
