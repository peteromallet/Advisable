# frozen_string_literal: true

class SpecialistIndustry < ApplicationRecord
  belongs_to :specialist
  belongs_to :industry
end

# == Schema Information
#
# Table name: specialist_industries
#
#  id            :bigint           not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  industry_id   :bigint           not null
#  specialist_id :bigint           not null
#
# Indexes
#
#  index_specialist_industries_on_industry_id    (industry_id)
#  index_specialist_industries_on_specialist_id  (specialist_id)
#
# Foreign Keys
#
#  fk_rails_...  (industry_id => industries.id)
#  fk_rails_...  (specialist_id => specialists.id)
#
