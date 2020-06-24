unless Rails.env.test?
  Airtable::Skill.sync(filter: nil)
  Airtable::Industry.sync(filter: nil)
  Airtable::ClientContact.sync(filter: nil)
  Airtable::Specialist.sync(filter: nil)
  Airtable::Project.sync(filter: nil)
  Airtable::Application.sync(filter: nil)
  Airtable::Task.sync(filter: nil)
  Airtable::SalesPerson.sync(filter: nil)
  Airtable::SpecialistReview.sync(filter: nil)

  User.all.each do |user|
    user.update(password: 'testing123', confirmed_at: 2.hours.ago)
  end

  Specialist.all.each do |specialist|
    specialist.update(
      password: 'testing123', confirmed_at: 2.hours.ago, average_score: 85
    )
  end
end