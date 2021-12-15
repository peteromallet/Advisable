# frozen_string_literal: true

module CaseStudy
  class Article < ApplicationRecord
    include SoftDeletable
    include Uid
    uid_prefix "csa"
    include Sluggable
    slug_from :title

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
    has_one :review, class_name: "::Review", foreign_key: :case_study_article, inverse_of: :case_study_article, dependent: :destroy
    has_one :guild_post, class_name: "::Guild::Post", dependent: :nullify
    has_one_attached :cover_photo

    scope :published, -> { where.not(published_at: nil) }
    scope :searchable, -> { active.published.where(hide_from_search: false) }
    scope :by_score, -> { order("score DESC NULLS LAST").order(id: :desc) }
    scope :available_specialists, -> { joins(:specialist).merge(Specialist.available).joins(specialist: :account).merge(Account.active) }

    def slug_or_uid
      slug || uid
    end

    def path
      "/profile/#{specialist.username_or_uid}/#{slug_or_uid}"
    end

    def self.find_by_slug_or_id(slug)
      if ::CaseStudy::Article.valid_uid?(slug)
        ::CaseStudy::Article.active.published.find_by(uid: slug)
      else
        ::CaseStudy::Article.active.published.find_by(slug: slug)
      end
    end

    def self.find_by_slug_or_id!(slug)
      find_by_slug_or_id(slug) || raise(ActiveRecord::RecordNotFound)
    end
  end
end

# == Schema Information
#
# Table name: case_study_articles
#
#  id                     :integer          not null, primary key
#  uid                    :string           not null
#  score                  :integer
#  confidential           :boolean
#  title                  :string
#  subtitle               :string
#  comment                :text
#  excerpt                :string
#  goals                  :jsonb
#  published_at           :datetime
#  specialist_approved_at :datetime
#  specialist_id          :integer          not null
#  interviewer_id         :integer
#  editor_id              :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  company_id             :integer
#  airtable_id            :string
#  company_type           :jsonb
#  targeting              :jsonb
#  editor_note            :text
#  freelancer_edits       :text
#  deleted_at             :datetime
#  hide_from_search       :boolean          default("false")
#  slug                   :string
#  editor_url             :string
#
# Indexes
#
#  index_case_study_articles_on_airtable_id     (airtable_id) UNIQUE
#  index_case_study_articles_on_company_id      (company_id)
#  index_case_study_articles_on_editor_id       (editor_id)
#  index_case_study_articles_on_interviewer_id  (interviewer_id)
#  index_case_study_articles_on_slug            (slug) UNIQUE
#  index_case_study_articles_on_specialist_id   (specialist_id)
#  index_case_study_articles_on_uid             (uid) UNIQUE
#
