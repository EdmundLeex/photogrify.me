# == Schema Information
#
# Table name: albums
#
#  id                :integer          not null, primary key
#  title             :string           not null
#  description       :text
#  user_id           :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  cover_picture_url :string
#

require 'test_helper'

class AlbumTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
