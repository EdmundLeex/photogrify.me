# == Schema Information
#
# Table name: albums
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Album < ActiveRecord::Base
  belongs_to :user
  has_many :pictures, dependent: :destroy

  validates :title, :user_id, presence: true
end
