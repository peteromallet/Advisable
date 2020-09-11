FactoryBot.define do
  factory :application do
    specialist
    project
    score { 90 }
    status { 'Applied' }
    rate { 240 }
    project_type { 'Fixed' }
    availability { '2 Weeks' }
    introduction { 'Hi there' }
    sequence(:uid) { "app_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |id| "airtable_#{id}" }

    factory :full_application do
      introduction { Faker::Lorem.sentence(word_count: 40) }

      after :create do |application, options|
        project = create(:previous_project, specialist: application.specialist)
        application.previous_projects << project
        create(
          :review,
          type: 'Off-Platform Project Review',
          specialist: application.specialist,
          project: project
        )
      end
    end
  end
end
