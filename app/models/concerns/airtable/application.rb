class Airtable::Application < Airtable::Base
  self.base_key = ENV["AIRTABLE_DATABASE_KEY"]
  self.table_name = "Applications"

  belongs_to :specialist, class: 'Specialist', column: "Expert"

  sync_with ::Application
  sync_column :application_status, to: :status
  sync_column :hourly_rate_for_project, to: :rate
  sync_column :available_to_start, to: :availability
  sync_column :one_line_overview, to: :introduction

  sync_data do |application|
    specialist_id = fields["Expert"].try(:first)
    specialist = ::Specialist.find_by_airtable_id(specialist_id)
    specialist = Airtable::Specialist.find(specialist_id).sync if specialist.nil?
    application.specialist = specialist

    project_id = fields["Client Project"].try(:first)
    project = ::Project.find_by_airtable_id(project_id)
    project = Airtable::Project.find(project_id).sync if project.nil?
    application.project = project

    # for the questions field we find any fields that match the string
    # "Question N" and return an object for each question. This allows us to add
    # more questions to airtable without having to create a direct mapping to
    # each column.
    application.questions = fields.inject([]) do |questions, (key, val)|
      matches = key.match(/Question\s(?<number>\d)$/)
      if matches
        questions << {
          question: val,
          answer: fields["Answer #{matches[:number]}"]
        }
      end
      questions
    end
  end
end
