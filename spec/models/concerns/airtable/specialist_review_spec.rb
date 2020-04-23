require 'rails_helper'

describe Airtable::SpecialistReview do
  include_examples 'airtable syncing'
  include_examples 'sync airtable column', 'Comment', to: :comment
  include_examples 'sync airtable column', 'Type', to: :type
  include_examples 'sync airtable association', 'Specialist', to: :specialist
  include_examples 'sync airtable association', 'Project', to: :project

  it 'syncs the previous project' do
    record = build(:review, project: nil)
    record.save(validate: false)
    association = create(:previous_project)

    airtable =
      described_class.new(
        { 'Previous Project UID' => association.uid },
        id: record.airtable_id
      )

    expect(record.project).to be_nil
    airtable.sync
    expect(record.reload.project).to eq(association)
  end

  it 'syncs the ratings' do
    record = create(:review, ratings: {})
    airtable =
      Airtable::SpecialistReview.new(
        {
          'Overall Rating' => 5,
          'Skills - Rating' => 4,
          'Quality of Work - Rating' => 3,
          'Adherence to Schedule - Rating' => 2,
          'Availability - Rating' => 1,
          'Communication - Rating' => 1
        },
        id: record.airtable_id
      )
    expect { airtable.sync }.to change { record.reload.ratings }.from({}).to(
      {
        'adherence_to_schedule' => 2,
        'availability' => 1,
        'communication' => 1,
        'overall' => 5,
        'quality_of_work' => 3,
        'skills' => 4
      }
    )
  end
end
