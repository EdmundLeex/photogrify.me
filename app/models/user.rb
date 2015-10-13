# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  has_many :albums, dependent: :destroy
  has_many :pictures, through: :albums

	after_initialize :ensure_session_token

  validates :username, :session_token, uniqueness: true
  validates(
    :username,
    :password_digest,
    :session_token,
    presence: true
  )

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)

    user && user.is_password?(password) ? user : nil
  end

  def generate_unique_token_for_field(field)
    token = SecureRandom.base64(16)
    
    while self.class.exists?(field => token)
      token = SecureRandom.base64(16)
    end
    
    token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password).to_s
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_unique_token_for_field(:session_token)
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_token_for_field(:session_token)
  end

  def activate!
    self.update_attribute(:activated, true)
  end
end
