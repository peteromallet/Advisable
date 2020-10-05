namespace :accounts do
  task migrate: :environment do
    User.find_each(&:copy_data_to_account)
    Specialist.find_each(&:copy_data_to_account)
  end
end
