require 'rails_helper'

RSpec.describe Search do
  it 'has a valid factory' do
    search = build(:search)
    expect(search).to be_valid
  end

  describe '#create_recommendation' do
    it 'calls Search::Recommendations class' do
      recommender = double(Search::Recommendations)
      allow(Search::Recommendations).to receive(:new).and_return(recommender)
      expect(recommender).to receive(:create_recommendation)
      create(:search).create_recommendation
    end
  end

  describe '#results' do
    it 'finds specialists by specialist skills' do
      skill = create(:skill, name: 'Testing')
      specialist = create(:specialist, average_score: 70)
      specialist.skills << skill
      search = create(:search, skill: skill.name)
      expect(search.results).to include(specialist)
    end

    it 'excludes specialists with an average_score below 65' do
      skill = create(:skill, name: 'Testing')
      specialist = create(:specialist, average_score: 64)
      specialist.skills << skill
      search = create(:search, skill: skill.name)
      expect(search.results).to_not include(specialist)
    end

    it 'excludes test accounts' do
      skill = create(:skill, name: 'Testing')
      specialist = create(:specialist, average_score: 70, test_account: true)
      specialist.skills << skill
      search = create(:search, skill: skill.name)
      expect(search.results).to_not include(specialist)
    end

    it 'can filter by industry' do
      skill = create(:skill, name: 'Testing')
      industry = create(:industry, name: 'Tech')

      specialist1 = create(:specialist, average_score: 70)
      project = create(:previous_project, specialist: specialist1)
      project.skills << skill
      project.industries << industry

      specialist2 = create(:specialist, average_score: 70)
      project = create(:previous_project, specialist: specialist2)
      project.skills << skill

      search =
        create(
          :search,
          skill: skill.name,
          industry: industry.name,
          industry_experience_required: true
        )

      expect(search.results).to include(specialist1)
      expect(search.results).not_to include(specialist2)
    end

    it 'can filter by company_type' do
      skill = create(:skill, name: 'Testing')
      company_type = 'Startup'

      specialist1 = create(:specialist, average_score: 70)
      project =
        create(
          :previous_project,
          specialist: specialist1, company_type: company_type
        )
      project.skills << skill

      specialist2 = create(:specialist, average_score: 70)
      project =
        create(
          :previous_project,
          specialist: specialist2, company_type: 'Corpo'
        )
      project.skills << skill

      search =
        create(
          :search,
          skill: skill.name,
          company_type: company_type,
          company_experience_required: true
        )

      expect(search.results).to include(specialist1)
      expect(search.results).not_to include(specialist2)
    end
  end
end
