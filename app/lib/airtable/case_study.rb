# frozen_string_literal: true

require "open-uri"

module Airtable
  class CaseStudy < Airrecord::Table
    attr_reader :content_position

    self.base_key = ENV["AIRTABLE_DATABASE_KEY"]
    self.table_name = "Case Studies"

    def import!(testing: false)
      @content_position = 0

      if testing
        ::Specialist.first.update(airtable_id: fields["Specialist"].first) if ::Specialist.find_by(airtable_id: fields["Specialist"].first).nil?
        ::SalesPerson.first.update(airtable_id: fields["Interviewer"].first) if ::SalesPerson.find_by(airtable_id: fields["Interviewer"].first).nil?

        Array(fields["Industry"]).each do |airtable_id|
          ::Industry.order("RANDOM()").first.update(airtable_id: airtable_id) if ::Industry.find_by(airtable_id: airtable_id).nil?
        end

        Array(fields["Skills"]).each do |airtable_id|
          ::Skill.order("RANDOM()").first.update(airtable_id: airtable_id) if ::Skill.find_by(airtable_id: airtable_id).nil?
        end
      end

      ActiveRecord::Base.transaction do
        article = ::CaseStudy::Article.find_or_initialize_by(airtable_id: id)

        article.specialist = ::Specialist.find_by!(airtable_id: fields["Specialist"].first)
        sales_person = ::SalesPerson.find_by!(airtable_id: fields["Interviewer"])
        article.interviewer = Account.find_by(email: sales_person.email)

        company = ::CaseStudy::Company.find_or_initialize_by(name: fields["Client Name"])
        company.business_type = fields["Company Focus"]
        company.website = fields["Client URL"]
        if fields["Client Logo"].present?
          url = URI.parse(fields["Client Logo"].first["url"])
          filename = File.basename(url.path)
          company.logo.attach(io: url.open, filename: filename)
        end
        company.save!
        CompanyLogoFinderJob.perform_later(company)
        article.company = company

        article.sections = []

        background = article.sections.new(type: "background", position: 0)
        attach_heading(background, fields["Background Title"])
        attach_paragraph(background, fields["Background Text"])
        attach_images(background, Array(fields["Background Images"]))
        attach_links(background, Array(fields["Background Links"]))

        overview = article.sections.new(type: "overview", position: 1)
        attach_heading(overview, fields["Project Overview Title"])
        (1..7).each do |i|
          attach_heading(overview, fields["Step #{i} Title"], size: "h2")
          attach_paragraph(overview, fields["Step #{i} Details"])
          attach_images(overview, Array(fields["Step #{i} Images"]))
          attach_links(overview, Array(fields["Step #{i} Links"]))
        end

        outcome = article.sections.new(type: "outcome", position: 2)
        attach_heading(outcome, fields["Outcome Title"])
        attach_results(outcome, [fields["Key Result 1"], fields["Key Result 2"], fields["Key Result 3"]])
        attach_paragraph(outcome, fields["Outcome Text"])
        attach_images(outcome, Array(fields["Outcome Images"]))
        attach_links(background, Array(fields["Outcome Links"]))

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

    private

    def attach_heading(section, field, size: "h1")
      return if field.blank?

      section.contents.new(type: "CaseStudy::HeadingContent", content: {size: size, text: field}, position: content_position)
      increment_content_position
    end

    def attach_paragraph(section, field)
      return if field.blank?

      section.contents.new(type: "CaseStudy::ParagraphContent", content: {text: field}, position: content_position)
      increment_content_position
    end

    def attach_results(section, results)
      section.contents.new(type: "CaseStudy::ResultsContent", content: {results: results}, position: content_position)
      increment_content_position
    end

    def attach_links(section, field)
      return if field.blank?

      links = field.first.split("\n")
      section.contents.new(type: "CaseStudy::LinksContent", content: {links: links}, position: content_position)
      increment_content_position
    end

    def attach_images(section, fields)
      return if fields.none?

      content = section.contents.new(type: "CaseStudy::ImagesContent", position: content_position)
      increment_content_position
      fields.each do |field|
        url = URI.parse(field["url"])
        filename = File.basename(url.path)
        content.images.attach(io: url.open, filename: filename)
      end
    end

    def increment_content_position
      @content_position += 1
    end
  end
end
