class Project < ApplicationRecord
  has_many :applications
  belongs_to :client
  validates :name, presence: true
  validates :airtable_id, presence: true

  def accepted_terms=(accepted)
    self.accepted_terms_at = DateTime.now.utc if !accepted_terms && accepted
    self.accepted_terms_at = nil if accepted_terms && !accepted
  end

  def accepted_terms
    accepted_terms_at.present?
  end
end
