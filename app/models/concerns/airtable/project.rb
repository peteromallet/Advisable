class Airtable::Project < Airtable::Base
  self.table_name = "Projects"
  # Tells which active record model to sync data with.
  sync_with ::Project
  # We store the project name in a "Project" column on the "Projects" table
  # in airtable.
  sync_column :project, to: :name
  sync_column :project_stage, to: :status
  sync_column :company_description, to: :company_description
  sync_column :project_description, to: :description
  sync_column :specialist_requirement_description, to: :specialist_description
  sync_columns :currency, :client_referral_url

  sync_data do |project|
    project.currency = fields['Currency'].try(:first)

    client_id = fields["Client"].try(:first)
    if client_id
      client = ::Client.find_by_airtable_id(client_id)
      client = Airtable::Client.find(client_id).sync if client.nil?
      project.client = client
    end

    sync_arrays(project)
    sync_questions(project)

    project.accepted_terms = fields["Accepted Terms"]
    project.deposit = (fields["Deposit Amount Required"].to_f * 100).to_i
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
