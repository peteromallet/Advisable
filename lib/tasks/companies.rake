namespace :companies do
  task create: :environment do
    User.all.find_each do |user|
      Company.create_for_user(user)
    end
  end
end
