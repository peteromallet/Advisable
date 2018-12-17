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
  sync_column 'Client Referray URL', to: :client_referral_url

  sync_data do |project|
    project.currency = fields['Currency'].try(:first)

    user_id = fields['Client Contacts'].try(:first)
    if user_id
      user = ::User.find_by_airtable_id(user_id)
      user = Airtable::ClientContact.find(user_id).sync if user.nil?
      project.user = user
    end

    sync_arrays(project)
    sync_questions(project)

    project.accepted_terms = fields["Accepted Terms"]
    project.deposit = (fields["Deposit Amount Required"].to_f * 100).to_i
    project.deposit_paid = (fields["Deposit Amount Paid"].to_f * 100).to_i
  end

  push_data do |project|
    self['Project'] = project.name if project.saved_change_to_name?
    self['Client Contacts'] = [project.user.airtable_id] if saved_change_to_user_id?
    self['Project Stage'] = project.status if !project.status.blank? && project.saved_change_to_status?
    self['Deposit Amount Required'] = project.deposit / 100.0 if project.saved_change_to_deposit?
    self['Company Description'] = project.company_description if project.saved_change_to_company_description?
    self['Project Description'] = project.description if project.saved_change_to_description?
    self['Specialist Requirement Description'] = project.specialist_description if project.saved_change_to_specialist_description?
    self['Goals'] = project.goals.to_json if project.saved_change_to_goals?
    self['Required Characteristics'] = project.required_characteristics.to_json if project.saved_change_to_required_characteristics?
    self['Optional Characteristics'] = project.optional_characteristics.to_json if project.saved_change_to_optional_characteristics?
    self['Qualification Question 1'] = project.questions.try(:[], 0) if project.saved_change_to_questions?
    self['Qualification Question 2'] = project.questions.try(:[], 1) if project.saved_change_to_questions?
    self['Accepted Terms'] = project.accepted_terms if project.saved_change_to_accepted_terms_at?
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
