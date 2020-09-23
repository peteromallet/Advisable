FactoryBot.define do
  factory :project do
    user
    currency { 'EUR' }
    sales_status { 'Open' }
    company_type { 'Startup' }
    industry { 'Marketing' }
    name do
      'Firespring – Public Relations and Communications Marketing, Publicity'
    end
    sequence(:airtable_id) { |id| "recproject#{id}" }

    after :build do |project|
      project.primary_skill = create(:skill) if project.primary_skill.nil?
    end
  end
end
