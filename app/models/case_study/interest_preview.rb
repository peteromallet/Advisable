# frozen_string_literal: true

module CaseStudy
  class InterestPreview < ApplicationRecord
    include TermData
    include Uid
    uid_prefix "csp"

    belongs_to :account

    validates :term, uniqueness: {case_sensitive: false, scope: :account_id}
  end
end

# == Schema Information
#
# Table name: case_study_interest_previews
#
#  id         :bigint           not null, primary key
#  results    :jsonb
#  term       :citext
#  term_data  :jsonb
#  uid        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  account_id :bigint           not null
#
# Indexes
#
#  index_case_study_interest_previews_on_account_id           (account_id)
#  index_case_study_interest_previews_on_term_and_account_id  (term,account_id) UNIQUE
#  index_case_study_interest_previews_on_uid                  (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#
