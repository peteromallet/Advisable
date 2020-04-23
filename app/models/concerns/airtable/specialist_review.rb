class Airtable::SpecialistReview < Airtable::Base
  self.table_name = 'Specialist Reviews'

  sync_with ::Review
  sync_column 'Comment', to: :comment
  sync_column 'Type', to: :type

  sync_data do |review|
    pull_specialist(review)
    pull_project(review)
    pull_ratings(review)
  end

  private

  # Setup the specialist relationship for the review
  def pull_specialist(review)
    airtable_id = fields['Specialist'].try(:first)
    return unless airtable_id
    specialist = ::Specialist.find_by_airtable_id(airtable_id)
    specialist = Airtable::Specialist.find(airtable_id).sync if specialist.nil?
    review.specialist = specialist
  end

  # Setup the project relationship for the review
  def pull_project(review)
    # If there is a value in the "Project" column then setup that relationship

    if fields['Project']
      airtable_id = fields['Project'].try(:first)
      return unless airtable_id
      project = ::Project.find_by_airtable_id(airtable_id)
      project = Airtable::Project.find(airtable_id).sync if project.nil?
      review.project = project
    end

    if fields['Previous Project UID']
      project = ::PreviousProject.find_by_uid(fields['Previous Project UID'])
      review.project = project
    end
  end

  # Pull the ratings from the airtable record and store the values in the
  # reviews ratings hash.
  def pull_ratings(review)
    review.ratings = {
      overall: fields['Overall Rating'],
      skills: fields['Skills - Rating'],
      quality_of_work: fields['Quality of Work - Rating'],
      adherence_to_schedule: fields['Adherence to Schedule - Rating'],
      availability: fields['Availability - Rating'],
      communication: fields['Communication - Rating']
    }
  end
end
