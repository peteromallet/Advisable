class Mutations::StartClientApplication < Mutations::BaseMutation
  argument :first_name, String, required: true
  argument :last_name, String, required: true
  argument :email, String, required: true

  field :clientApplication, Types::ClientApplicationType, null: true

  def resolve(**args)
    user =
      User.find_or_initialize_by(email: args[:email]) do |u|
        u.application_status = :started
      end

    if user.application_status == :started
      user.first_name = args[:first_name]
      user.last_name = args[:last_name]
      user.sync_to_airtable
      user.save
    end

    { clientApplication: user }
  end
end
