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

require 'test_helper'

class PictureTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
