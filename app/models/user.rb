class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :group_users
  has_many :groups, through: :group_users
  has_many :messages

  scope :except_current_user, -> (current_user_id){ where.not(id: current_user_id) }
end

