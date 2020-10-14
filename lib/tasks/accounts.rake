namespace :accounts do
  task check: :environment do
    User.where(account_id: nil).each do |user|
      Raven.capture_message("Creating missing User Account for ##{user.id}: #{user.name}", level: 'info')

      user.copy_data_to_account
      user.save!(validate: false)
    end

    Specialist.where(account_id: nil).each do |specialist|
      Raven.capture_message("Creating missing Specialist Account for ##{specialist.id}: #{specialist.name}", level: 'info')

      specialist.copy_data_to_account
      specialist.save!(validate: false)
    end
  end
end
