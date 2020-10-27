class Airtable::Project < Airtable::Base
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
  sync_column 'Brief Pending Confirmation - Timestamp',
              to: :brief_pending_confirmation_at
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
  sync_association 'Owner', to: :sales_person

  # sync_data is used to sync more complicated parts of the airtable record that
  # dont fit into a simple column mapping like above. It takes the ActiveRecord
  # project record as an argument and allows you to set atttributes directly
  # onto it. You do not need to call 'save' on the active record object.
  sync_data do |project|
    project.currency = fields['Currency'].try(:first)

    # Sync the project owner username
    owner_id = fields['Owner'].try(:first)
    if owner_id
      owner = Airtable::SalesPerson.find(owner_id)
      project.owner = owner['Username']
    end

    user_id = fields['Client Contacts'].try(:first)

    if user_id
      user = ::User.find_by_uid_or_airtable_id(user_id)
      user = Airtable::ClientContact.find(user_id).sync if user.nil?
      project.user = user
    end

    # Still sync the old primary_skill text column for now.
    project[:primary_skill] = fields['Primary Skill Required']

    required_skills = fields['Skills Required'] || []
    required_skills.each do |skill_id|
      skill = ::Skill.find_by_uid_or_airtable_id(skill_id)
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
    # values, however, the new project flow expects all of the charactersitics
    # to be inside the 'characteristics' column and the required ones duplicated
    # inside of 'required_characteristics'. Syncing from airtable would
    # overwrite the 'characteristics' value without the required ones.

    project.accepted_terms = fields['Accepted Terms']
    project.deposit = (fields['Deposit Amount Required'].to_f * 100).to_i
    project.remote = true if fields['Remote OK'].try(:include?, 'Yes')
    project.remote = false if fields['Remote OK'].try(:include?, 'No')
    if fields['Industry Experience Required'].try(:include?, 'No')
      project.industry_experience_required = false
    end
    if fields['Industry Experience Required'].try(:include?, 'Yes')
      project.industry_experience_required = true
    end
    if fields['Company Type Experience Required'].try(:include?, 'No')
      project.company_type_experience_required = false
    end
    if fields['Company Type Experience Required'].try(:include?, 'Yes')
      project.company_type_experience_required = true
    end
  end

  push_data do |project|
    self['Client Contacts'] = [project.user.try(:airtable_id)].compact.uniq
    self['Project Stage'] = project[:status]
    if project.saved_change_to_deposit?
      self['Deposit Amount Required'] = project.deposit / 100.0
    end
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
    if project.industry_experience_required
      self['Industry Experience Required'] = 'Yes'
    end
    if project.industry_experience_required == false
      self['Industry Experience Required'] = 'No'
    end
    if project.company_type_experience_required
      self['Company Type Experience Required'] = 'Yes'
    end
    if project.company_type_experience_required == false
      self['Company Type Experience Required'] = 'No'
    end
    self['Project Status'] = project.sales_status

    if project.owner
      owner = SalesPerson.find_by_username(project.owner)
      self['Owner'] = [owner.try(:airtable_id)].compact
    end
  end

  private

  def sync_goals(project)
    project.goals = JSON.parse(fields['Goals']) if fields['Goals']
  rescue JSON::ParserError
  end

  def sync_questions(project)
    # for the questions field we find any fields that match the string
    # "Qualification Question N" and return an object for each question.
    project.questions =
      fields.inject([]) do |questions, (key, val)|
        matches = key.match(/Qualification\sQuestion\s(?<number>\d)$/)
        questions << val if matches
        questions
      end
  end
end
