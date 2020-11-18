def company_name_for(user)
  return user.company_name unless Company.exists?(name: user.company_name)

  n = 2
  n += 1 while Company.exists?(name: "#{user.company_name} (#{n})")
  "#{user.company_name} (#{n})"
end

namespace :companies do
  task create: :environment do
    User.all.find_each do |user|
      next if user.company_id.present?

      company = Company.create!(name: company_name_for(user), kind: user.company_type)
      user.update_columns(company_id: company.id) # rubocop:disable Rails/SkipsModelValidations
    end
  end
end
