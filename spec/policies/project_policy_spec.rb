require 'rails_helper'

describe ProjectPolicy do
  let(:project) { create(:project) }

  describe '#is_client' do
    it 'returns true if the user is the client' do
      policy = ProjectPolicy.new(project.user, project)
      expect(policy.is_client).to be_truthy
    end

    it 'returns false if the user is the not the client' do
      policy = ProjectPolicy.new(create(:user), project)
      expect(policy.is_client).to be_falsey
    end
  end
end