# frozen_string_literal: true

class UnresponsivenessReport < ApplicationRecord
  belongs_to :application
end

# == Schema Information
#
# Table name: unresponsiveness_reports
#
#  id             :uuid             not null, primary key
#  message        :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  application_id :bigint           not null
#
# Indexes
#
#  index_unresponsiveness_reports_on_application_id  (application_id)
#
# Foreign Keys
#
#  fk_rails_...  (application_id => applications.id)
#
