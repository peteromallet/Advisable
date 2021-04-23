# frozen_string_literal: true

require "open-uri"

module Airtable
  class CaseStudy < Airrecord::Table
    self.base_key = ENV["AIRTABLE_DATABASE_KEY"]
    self.table_name = "Case Studies"

    def import!
      ActiveRecord::Base.transaction do
        article = ::CaseStudy::Article.find_or_initialize_by(airtable_id: id)

        article.specialist = ::Specialist.find_by!(airtable_id: fields["Specialist"].first)
        sales_person = ::SalesPerson.find_by!(airtable_id: fields["Interviewer"])
        article.interviewer = Account.find_by(email: sales_person.email)

        company = ::CaseStudy::Company.find_or_initialize_by(name: fields["Client Name"])
        company.business_type = fields["Company Focus"]
        if fields["Client Logo"].present?
          url = URI.parse(fields["Client Logo"].first["url"])
          filename = File.basename(url.path)
          company.logo.attach(io: url.open, filename: filename)
        end
        article.company = company

        # convert these to sections and contents
        # "Background Title",
        # "Background Text",
        # "Background Images",
        # "Project Overview Title",
        # Step 1 -7: Title, Details, Images
        # "Outcome Title",
        # "Outcome Text",
        # "Outcome Images",
        # "Key Result 1",
        # "Key Result 2",
        # "Key Result 3",

        article.title = fields["Title"]
        article.subtitle = fields["Subtitle"]
        article.company_type = fields["Company Type"]
        article.freelancer_edits = fields["Freelancer Edits Required"]
        article.comment = fields["Advisable Comment"]
        article.editor_note = fields["Editor Note"]
        article.goals = fields["Goals"]
        article.targeting = fields["Additional Targeting Data"]
        article.save!

        Array(fields["Industry"]).each do |airtable_id|
          industry = ::Industry.find_by!(airtable_id: airtable_id)
          ::CaseStudy::Industry.create!(industry: industry, article: article)
        end

        Array(fields["Skills"]).each do |airtable_id|
          skill = ::Skill.find_by!(airtable_id: airtable_id)
          ::CaseStudy::Skill.create!(skill: skill, article: article)
        end

        primary_skill = ::Skill.find_by!(airtable_id: fields["Primary Skill"].first)
        article.skills.find_by(skill: primary_skill).update!(primary: true)
        article
      end
    end
  end
end
