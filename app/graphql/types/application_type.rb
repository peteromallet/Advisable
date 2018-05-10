Types::ApplicationQuestion = GraphQL::ObjectType.define do
  name 'ApplicationQuestion'
  field :question, types.String, hash_key: :question
  field :answer, types.String, hash_key: :answer
end

Types::ApplicationType = GraphQL::ObjectType.define do
  name 'Application'

  field :id, !types.ID
  field :rate, types.String, hash_key: :hourly_rate_for_project
  field :availability, types.String, hash_key: :available_to_start
  field :specialist, Types::SpecialistType, hash_key: :expert
  field :status, types.String, hash_key: :application_status
  field :introduction, types.String, hash_key: :one_line_overview

  # for the questions field we find any fields that match the string
  # "Question N" and return an object for each question. This allows us to add
  # more questions to airtable without having to create a direct mapping to
  # each column.
  field :questions, types[Types::ApplicationQuestion] do
    resolve ->(obj, args, ctx) {
      obj.fields.inject([]) do |questions, (key, val)|
        matches = key.match(/Question\s(?<number>\d)$/)
        if matches
          questions << {
            question: val,
            answer: obj.fields["Answer #{matches[:number]}"]
          }
        end
        questions
      end
    }
  end
end
