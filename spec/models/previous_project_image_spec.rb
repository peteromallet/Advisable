require 'rails_helper'

describe PreviousProjectImage, type: :model do
  it 'has a valid factory' do
    record = create(:previous_project_image)
    expect(record).to be_valid
  end
end
