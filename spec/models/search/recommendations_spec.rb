require 'rails_helper'

describe Search::Recommendations do
  let(:search) { create(:search, recommended_project: nil) }
  let(:skill) { create(:skill, name: search.skill) }
  let(:industry) { create(:industry, name: search.industry) }
  let(:specialist) { create(:specialist, average_score: 90) }
  let(:project) do
    create(
      :previous_project,
      specialist: specialist, primary_skill: skill, advisable_score: 90
    )
  end

  before :each do
    project.skills << skill
    project.industries << industry
    create(:review, project: project, type: 'Off-Platform Project Review')
  end

  it 'creates a recommendation for a search' do
    recommendation = Search::Recommendations.new(search).create_recommendation
    expect(recommendation).to eq(project)
  end

  it 'creates a match based on any skill' do
    design = create(:skill, name: 'Design')
    project.skills << design
    search.update skill: design.name
    recommendation = Search::Recommendations.new(search).create_recommendation
    expect(recommendation).to eq(project)
  end

  it 'saves the recommendation on the search' do
    expect {
      Search::Recommendations.new(search).create_recommendation
    }.to change { search.reload.recommended_project }.from(nil).to(project)
  end

  context 'when the average_score is below 85' do
    let(:specialist) { create(:specialist, average_score: 70) }

    it 'does not create a recommendation' do
      recommendation = Search::Recommendations.new(search).create_recommendation
      expect(recommendation).to be_nil
    end
  end
end
