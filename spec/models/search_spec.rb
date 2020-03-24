require 'rails_helper'

describe Search do
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

    it 'find specialist by project skills' do
      skill = create(:skill, name: 'Testing')
      project = create(:project)
      project.skills << skill

      s1 = create(:specialist, average_score: 70)
      s2 = create(:specialist, average_score: 70)
      s3 = create(:specialist, average_score: 70)

      create(:application, project: project, specialist: s1, status: 'Applied')
      create(:application, project: project, specialist: s2, status: 'Working')
      create(
        :application,
        project: project, specialist: s3, status: 'Stopped Working'
      )

      search = create(:search, skill: skill.name)

      expect(search.results).not_to include(s1)
      expect(search.results).to include(s2)
      expect(search.results).to include(s3)
    end

    it 'finds specialists by off platform projects skills' do
      skill = create(:skill, name: 'Testing')
      specialist = create(:specialist, average_score: 70)
      project = create(:off_platform_project, specialist: specialist)
      project.skills << skill
      search = create(:search, skill: skill.name)
      expect(search.results).to include(specialist)
    end

    it 'can filter by industry' do
      skill = create(:skill, name: 'Testing')
      industry = create(:industry, name: 'Tech')

      specialist1 = create(:specialist, average_score: 70)
      project = create(:off_platform_project, specialist: specialist1)
      project.skills << skill
      project.industries << industry

      specialist2 = create(:specialist, average_score: 70)
      project = create(:off_platform_project, specialist: specialist2)
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
          :off_platform_project,
          specialist: specialist1, company_type: company_type
        )
      project.skills << skill

      specialist2 = create(:specialist, average_score: 70)
      project =
        create(
          :off_platform_project,
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
