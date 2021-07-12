# frozen_string_literal: true

class Payment < ApplicationRecord
  include Uid
  uid_prefix "pay"

  belongs_to :company
  belongs_to :specialist
  belongs_to :task, optional: true
end

# == Schema Information
#
# Table name: payments
#
#  id                :bigint           not null, primary key
#  admin_fee         :integer
#  amount            :integer
#  status            :string
#  uid               :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  company_id        :uuid             not null
#  payment_intent_id :string
#  specialist_id     :bigint           not null
#  task_id           :bigint
#
# Indexes
#
#  index_payments_on_company_id     (company_id)
#  index_payments_on_specialist_id  (specialist_id)
#  index_payments_on_task_id        (task_id)
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#  fk_rails_...  (specialist_id => specialists.id)
#  fk_rails_...  (task_id => tasks.id)
#
