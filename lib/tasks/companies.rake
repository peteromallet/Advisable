namespace :companies do
  task create: :environment do
    User.all.find_each do |user|
      next if user.company_id.present?

      company = Company.create!(name: Company.fresh_company_name_for(user), kind: user.company_type, industry_id: user.industry_id, sales_person_id: user.sales_person_id)
      user.update_columns(company_id: company.id) # rubocop:disable Rails/SkipsModelValidations
    end
  end
end
