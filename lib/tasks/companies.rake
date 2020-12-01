namespace :companies do
  task copy_stripe_data: :environment do
    User.all.find_each do |user|
      # rubocop:disable Rails/SkipsModelValidations
      user.company.update_columns(
        stripe_setup_intent_id: user.stripe_setup_intent_id,
        stripe_customer_id: user.stripe_customer_id
      )
      # rubocop:enable Rails/SkipsModelValidations
    end
  end
end
