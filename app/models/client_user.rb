class ClientUser < ApplicationRecord
  belongs_to :client
  belongs_to :user
end

# == Schema Information
#
# Table name: client_users
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  client_id  :bigint
#  user_id    :bigint
#
# Indexes
#
#  index_client_users_on_client_id  (client_id)
#  index_client_users_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#  fk_rails_...  (user_id => users.id)
#
