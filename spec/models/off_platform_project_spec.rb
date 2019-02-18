require 'rails_helper'

describe OffPlatformProject do
  it 'has a valid factory' do
    project = build(:off_platform_project)
    expect(project).to be_valid
  end

  describe '#contact_name' do
    it 'combines the first and last name' do
      project = create(:off_platform_project, {
        contact_first_name: "John",
        contact_last_name: "Doe",
      })
      expect(project.contact_name).to eq("John Doe")
    end
  end
end