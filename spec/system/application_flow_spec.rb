require 'rails_helper'

RSpec.describe 'Application flow' do
  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
    # mock the skills endpoint for the add a previous project modal
    skill =
      double(Airtable: Skill, id: 'rec_123', fields: { 'Name' => 'Testing' })
    allow(Airtable::Skill).to receive(:active).and_return([skill])
  end

  let(:project) do
    create(
      :project,
      questions: ['Is this a test?', 'Is this another question?']
    )
  end
  let(:application) do
    create(:application, project: project, status: 'Invited To Apply')
  end

  describe 'Overview step' do
    it 'Continues to the questions step' do
      visit "/invites/#{application.airtable_id}/apply"
      fill_in :introduction, with: 'This is my intro'
      find('label', text: 'Immediately').click
      click_on 'Next'
      expect(page).to have_content('Application Questions')
    end

    context 'when there are no questions' do
      let(:application) do
        create(:application, { status: 'Invited To Apply', questions: [] })
      end

      it 'goes to the references step' do
        visit "/invites/#{application.airtable_id}/apply"
        fill_in :introduction, with: 'This is my intro'
        find('label', text: 'Immediately').click
        click_on 'Next'
        expect(page).to have_content('We require references from all')
      end
    end
  end

  describe 'Questions step' do
    it 'proceeeds to the next question' do
      visit "/invites/#{application.airtable_id}/apply/questions"
      fill_in :answer, with: 'This is my answer'
      click_on 'Next'
      expect(page).to have_content('Are you sure?')
      click_on 'Ignore'
      expect(page).to have_content('Is this another question?')
    end

    context 'when on the last question' do
      let(:application) do
        create(
          :application,
          {
            project: project,
            status: 'Invited To Apply',
            questions: [
              {
                answer: 'This has been answered', question: project.questions[0]
              }
            ]
          }
        )
      end

      it 'proceeds to the references step after submission' do
        visit "/invites/#{application.airtable_id}/apply/questions/2"
        fill_in :answer, with: 'This is my answer'
        click_on 'Next'
        expect(page).to have_content('Are you sure?')
        click_on 'Ignore'
        expect(page).to have_content('We require references from all')
      end
    end

    context 'when there are no questions' do
      let(:project) { create(:project, questions: []) }
      let(:application) do
        create(:application, { project: project, status: 'Invited To Apply' })
      end

      it 'proceeds to the references step' do
        visit "/invites/#{application.airtable_id}/apply/questions"
        expect(page).to have_content('We require references from all')
      end
    end
  end

  describe 'References step' do
    context 'when the specialist has previous projects' do
      let!(:specialist) { create(:specialist) }
      let!(:project) { create(:previous_project, specialist: specialist) }
      let(:application) do
        create(:application, specialist: specialist, status: 'Invited To Apply')
      end

      it 'proceeds to the payment terms' do
        visit "/invites/#{application.airtable_id}/apply/references"
        find(
          'label',
          text:
            "#{project.primary_skill.name} project with #{project.client_name}"
        ).click
        click_on 'Next'
        click_on 'Continue With 1 Reference'
        expect(page).to have_content("Including Advisable's fee")
      end
    end

    context 'when the user has no previous projects' do
      let!(:specialist) { create(:specialist) }
      let(:application) do
        create(:application, specialist: specialist, status: 'Invited To Apply')
      end
    end
  end

  describe 'Terms step' do
    before :each do
      create(:application_reference, application: application)
    end

    it 'completes the application process' do
      visit "/invites/#{application.airtable_id}/apply/terms"
      fill_in 'rate', with: '100'
      find(
        'label',
        text:
          'I agree that if Advisable connects me to a client that I successfully contract with, between 5-20% of my fees are payable to Advisable and all payments must go through Advisable.'
      ).click
      find('input[name="acceptsTerms"').sibling(
        '*[class^=styles__StyledCheckboxToggle]'
      ).click
      find('input[name="trialProgram"').sibling(
        '*[class^=styles__StyledCheckboxToggle]'
      ).click
      click_on 'Submit Application'
      expect(page).to have_content('Application sent!')
    end
  end

  context 'when the application status is Invitation Rejeceted' do
    let(:application) { create(:application, status: 'Invitation Rejected') }

    it 'redirects to the job listing page' do
      visit "/invites/#{application.airtable_id}/apply"
      expect(page).to have_content('You have already rejected this invitation')
    end
  end
end
