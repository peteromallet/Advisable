# frozen_string_literal: true

module Airtable
  class Project < Airtable::Base
    self.table_name = 'Projects'
    # Tells which active record model to sync data with.
    sync_with ::Project
    # We store the project name in a "Project" column on the "Projects" table
    # in airtable.
    sync_column 'Project', to: :name
    sync_column 'Project Stage', to: :status
    sync_column 'Company Description', to: :company_description
    sync_column 'Project Description', to: :description
    sync_column 'Specialist Requirement Description', to: :specialist_description
    sync_column 'Currency', to: :currency
    sync_column 'Client Referral URL', to: :client_referral_url
    sync_column 'Project Status', to: :sales_status
    sync_column 'Estimated Budget', to: :estimated_budget
    sync_column 'Campaign Source', to: :campaign_source
    sync_column 'Campaign Name', to: :campaign_name
    sync_column 'Brief Confirmed - Timestamp', to: :brief_confirmed_at
    sync_column 'Brief Pending Confirmation - Timestamp', to: :brief_pending_confirmation_at
    sync_column 'Call Scheduled - Timestamp', to: :call_scheduled_at
    sync_column 'Interview Scheduled - Timestamp', to: :interview_scheduled_at
    sync_column 'Candidate Proposed - Timestamp', to: :candidate_proposed_at
    sync_column 'Candidate Accepted - Timestamp', to: :candidate_accepted_at
    sync_column 'Interview Completed - Timestamp', to: :interview_completed_at
    sync_column 'Booking Request Sent - Timestamp', to: :booking_request_sent_at
    sync_column 'Booking Confirmed - Timestamp', to: :booking_confirmed_at
    sync_column 'Proposal Received - Timestamp', to: :proposal_received_at
    sync_column 'Won - Timestamp', to: :won_at
    sync_column 'Lost - Timestamp', to: :lost_at
    sync_column 'Plain Text Industry', to: :industry
    sync_column 'Level Of Expertise Required', to: :level_of_expertise_required
    sync_column 'Likelihood To Confirm (%)', to: :likelihood_to_confirm
    sync_column 'Lost Reason', to: :lost_reason
    sync_column 'Project Start', to: :project_start

    # sync_data is used to sync more complicated parts of the airtable record that
    # dont fit into a simple column mapping like above. It takes the ActiveRecord
    # project record as an argument and allows you to set atttributes directly
    # onto it. You do not need to call 'save' on the active record object.
    sync_data do |project|
      project.currency = fields['Currency'].try(:first)

      user_id = fields['Client Contacts'].try(:first)

      if user_id
        user = ::User.find_by_airtable_id(user_id)
        user = Airtable::ClientContact.find(user_id).sync if user.nil?
        project.user = user
      end

      sales_person_airtable_id = fields['Owner'].try(:first)
      if sales_person_airtable_id
        sales_person = ::SalesPerson.find_by(airtable_id: sales_person_airtable_id)
        if sales_person.nil?
          airtable_sp = Airtable::SalesPerson.find(sales_person_airtable_id)
          sales_person = airtable_sp.sync
        end
        project.user&.company&.update(sales_person: sales_person)
      end

      required_skills = fields['Skills Required'] || []
      required_skills.each do |skill_id|
        skill = ::Skill.find_by_airtable_id(skill_id)
        skill = Airtable::Skill.find(skill_id).sync if skill.blank?
        next if skill.nil?

        project_skill = project.project_skills.find_by_skill_id(skill.id)
        is_primary = skill.name == fields['Primary Skill Required']

        if project_skill.present?
          project_skill.update(primary: is_primary)
        else
          project.project_skills.new(skill: skill, primary: is_primary)
        end
      end

      sync_goals(project)
      sync_questions(project)

      # TODO: Sync characteristics from airtable to postgres.
      # We don't sync characteristic values from airtable back to postgres
      # because airtable ( and the old project setup flow ) expects the optional
      # characteristics and required characteristics columns to have different
      # values, however, the new project flow expects all of the characteristics
      # to be inside the 'characteristics' column and the required ones duplicated
      # inside of 'required_characteristics'. Syncing from airtable would
      # overwrite the 'characteristics' value without the required ones.

      project.accepted_terms = fields['Accepted Terms']
      project.deposit = (fields['Deposit Amount Required'].to_f * 100).to_i
      project.remote = true if fields['Remote OK'].try(:include?, 'Yes')
      project.remote = false if fields['Remote OK'].try(:include?, 'No')
      project.stop_candidate_proposed_emails = fields['Stop Candidate Proposed Emails'].try(:include?, 'Yes')
      project.industry_experience_required = false if fields['Industry Experience Required'].try(:include?, 'No')
      project.industry_experience_required = true if fields['Industry Experience Required'].try(:include?, 'Yes')
      project.company_type_experience_required = false if fields['Company Type Experience Required'].try(:include?, 'No')
      project.company_type_experience_required = true if fields['Company Type Experience Required'].try(:include?, 'Yes')
    end

    push_data do |project|
      self['Client Contacts'] = [project.user.try(:airtable_id)].compact.uniq
      self['Project Stage'] = project[:status]
      self['Deposit Amount Required'] = project.deposit / 100.0 if project.saved_change_to_deposit?
      self['Deposit Amount Paid'] = project.deposit_paid / 100.0
      self['Company Description'] = project.company_description
      self['Project Description'] = project.description
      self['Specialist Requirement Description'] = project.specialist_description
      self['Goals'] = project.goals.to_json
      self['Service Type'] = project.service_type
      self['Required Characteristics'] = project.required_characteristics.to_json
      self['Optional Characteristics'] = project.optional_characteristics.to_json
      self['Qualification Question 1'] = project.questions.try(:[], 0)
      self['Qualification Question 2'] = project.questions.try(:[], 1)
      self['Accepted Terms'] = project.accepted_terms
      self['Skills Required'] = project.skills.map(&:airtable_id).uniq
      self['Primary Skill Required'] = project.primary_skill.try(:name)
      self['Industry Experience Required'] = 'Yes' if project.industry_experience_required
      self['Industry Experience Required'] = 'No' if project.industry_experience_required == false
      self['Remote OK'] = 'Yes' if project.remote
      self['Remote OK'] = 'No' if project.remote == false
      self['Stop Candidate Proposed Emails'] = 'Yes' if project.stop_candidate_proposed_emails
      self['Company Type Experience Required'] = 'Yes' if project.company_type_experience_required
      self['Company Type Experience Required'] = 'No' if project.company_type_experience_required == false
      self['Project Status'] = project.sales_status
      self['Owner'] = [project.user.company.sales_person.airtable_id].compact if project.user.company.sales_person
      self['Level Of Expertise Required'] = project.level_of_expertise_required
      self['Likelihood To Confirm (%)'] = project.likelihood_to_confirm
      self['Lost Reason'] = project.lost_reason
      self['Project Start'] = project.project_start
    end

    private

    def sync_goals(project)
      project.goals = JSON.parse(fields['Goals']) if fields['Goals']
    rescue JSON::ParserError
      nil
    end

    def sync_questions(project)
      # for the questions field we find any fields that match the string
      # "Qualification Question N" and return an object for each question.
      project.questions =
        fields.each_with_object([]) do |(key, val), questions|
          matches = key.match(/Qualification\sQuestion\s(?<number>\d)$/)
          questions << val if matches
        end
    end
  end
end
