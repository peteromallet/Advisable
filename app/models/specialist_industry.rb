# frozen_string_literal: true

class SpecialistIndustry < ApplicationRecord
  belongs_to :specialist
  belongs_to :industry
end

# == Schema Information
#
# Table name: specialist_industries
#
#  id            :integer          not null, primary key
#  specialist_id :integer          not null
#  industry_id   :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_specialist_industries_on_industry_id    (industry_id)
#  index_specialist_industries_on_specialist_id  (specialist_id)
#
