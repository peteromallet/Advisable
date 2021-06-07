# frozen_string_literal: true

module CaseStudy
  class Article < ApplicationRecord
    include Uid
    uid_prefix "csa"

    has_logidze

    belongs_to :specialist
    belongs_to :company, optional: true
    belongs_to :interviewer, optional: true, class_name: "::Account"
    belongs_to :editor, optional: true, class_name: "::Account"
    has_many :skills, dependent: :destroy
    has_many :industries, dependent: :destroy
    has_many :sections, dependent: :destroy
    has_many :contents, through: :sections
    has_many :search_feedbacks, dependent: :destroy
    has_many :shares, class_name: "SharedArticle", dependent: :destroy

    scope :published, -> { where.not(published_at: nil) }
  end
end

# == Schema Information
#
# Table name: case_study_articles
#
#  id                     :bigint           not null, primary key
#  comment                :text
#  company_type           :jsonb
#  confidential           :boolean
#  editor_note            :text
#  excerpt                :string
#  freelancer_edits       :text
#  goals                  :jsonb
#  published_at           :datetime
#  score                  :integer
#  specialist_approved_at :datetime
#  subtitle               :string
#  targeting              :jsonb
#  title                  :string
#  uid                    :string           not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  airtable_id            :string
#  company_id             :bigint
#  editor_id              :bigint
#  interviewer_id         :bigint
#  specialist_id          :bigint           not null
#
# Indexes
#
#  index_case_study_articles_on_airtable_id     (airtable_id) UNIQUE
#  index_case_study_articles_on_company_id      (company_id)
#  index_case_study_articles_on_editor_id       (editor_id)
#  index_case_study_articles_on_interviewer_id  (interviewer_id)
#  index_case_study_articles_on_specialist_id   (specialist_id)
#  index_case_study_articles_on_uid             (uid)
#
# Foreign Keys
#
#  fk_rails_...  (company_id => case_study_companies.id)
#  fk_rails_...  (editor_id => accounts.id)
#  fk_rails_...  (interviewer_id => accounts.id)
#  fk_rails_...  (specialist_id => specialists.id)
#
