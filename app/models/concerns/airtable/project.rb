class Airtable::Project < Airtable::Base
  self.table_name = "Projects"
  # Tells which active record model to sync data with.
  sync_with ::Project
  # We store the project name in a "Project" column on the "Projects" table
  # in airtable.
  sync_column 'Project', to: :name
  sync_column 'Project Stage', to: :status
  sync_column 'Primary Skill Required', to: :primary_skill
  sync_column 'Company Description', to: :company_description
  sync_column 'Project Description', to: :description
  sync_column 'Specialist Requirement Description', to: :specialist_description
  sync_column 'Currency', to: :currency
  sync_column 'Client Referral URL', to: :client_referral_url
  sync_column 'Project Status', to: :sales_status
  sync_column 'Estimated Budget', to: :estimated_budget

  sync_data do |project|
    project.currency = fields['Currency'].try(:first)

    user_id = fields['Client Contacts'].try(:first)
    if user_id
      user = ::User.find_by_airtable_id(user_id)
      user = Airtable::ClientContact.find(user_id).sync if user.nil?
      project.user = user
    end

    skills = project.skills.map(&:airtable_id)
    required_skills = fields['Skills Required'] || []
    required_skills.each do |skill_id|
      unless skills.include?(skill_id)
        skill = ::Skill.find_by_airtable_id(skill_id)
        skill = Airtable::Skill.find(skill_id).sync unless skill.present?
        project.project_skills.new(skill: skill)
      end
    end

    sync_arrays(project)
    sync_questions(project)

    project.accepted_terms = fields["Accepted Terms"]
    project.deposit = (fields["Deposit Amount Required"].to_f * 100).to_i
    project.remote = true if fields['Remote OK'].try(:include?, "Yes")
    project.remote = false if fields['Remote OK'].try(:include?, "No")
  end

  push_data do |project|
    self['Client Contacts'] = [project.user.airtable_id] if project.saved_change_to_user_id?
    self['Project Stage'] = project.status if !project.status.blank? && project.saved_change_to_status?
    self['Deposit Amount Required'] = project.deposit / 100.0 if project.saved_change_to_deposit?
    self['Deposit Amount Paid'] = project.deposit_paid / 100.0
    self['Company Description'] = project.company_description if project.saved_change_to_company_description?
    self['Project Description'] = project.description if project.saved_change_to_description?
    self['Specialist Requirement Description'] = project.specialist_description if project.saved_change_to_specialist_description?
    self['Goals'] = project.goals.to_json if project.saved_change_to_goals?
    self['Service Type'] = project.service_type if project.saved_change_to_service_type?
    self['Required Characteristics'] = project.required_characteristics.to_json if project.saved_change_to_required_characteristics?
    self['Optional Characteristics'] = project.optional_characteristics.to_json if project.saved_change_to_optional_characteristics?
    self['Qualification Question 1'] = project.questions.try(:[], 0) if project.saved_change_to_questions?
    self['Qualification Question 2'] = project.questions.try(:[], 1) if project.saved_change_to_questions?
    self['Accepted Terms'] = project.accepted_terms if project.saved_change_to_accepted_terms_at?
    self['Skills Required'] = project.skills.map(&:airtable_id).uniq
    self['Primary Skill Required'] = project.primary_skill
  end

  private

  def sync_arrays(project)
    project.goals = JSON.parse(fields["Goals"]) if fields["Goals"]
    project.required_characteristics = JSON.parse(fields["Required Characteristics"]) if fields["Required Characteristics"]
    project.optional_characteristics = JSON.parse(fields["Optional Characteristics"]) if fields["Optional Characteristics"]
  rescue JSON::ParserError
  end

  def sync_questions(project)
    # for the questions field we find any fields that match the string
    # "Qualification Question N" and return an object for each question.
    project.questions = fields.inject([]) do |questions, (key, val)|
      matches = key.match(/Qualification\sQuestion\s(?<number>\d)$/)
      if matches
        questions << val
      end
      questions
    end
  end
end
