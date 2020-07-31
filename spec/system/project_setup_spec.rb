require 'rails_helper'

describe 'Project setup flow' do
  let(:project) do
    create(
      :project,
      {
        status: 'Brief Pending Confirmation',
        company_description: 'company overview',
        description: 'project description',
        goals: %w[goal],
        specialist_description: 'specialist overview',
        required_characteristics: %w[characteristic],
        characteristics: %w[characteristic],
        questions: %w[question?],
        accepted_terms: true,
        deposit: 100_00
      }
    )
  end

  before :each do
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
    intent =
      double(
        Stripe::PaymentIntent,
        id: '1234', client_secret: '1234', last_payment_error: nil
      )
    allow(Stripe::PaymentIntent).to receive(:create).and_return(intent)
    invoice_settings = OpenStruct.new(default_payment_method: nil)
    customer = double(Stripe::Customer, id: '1234', name: 'Test', email: '')
    allow(customer).to receive(:invoice_settings).and_return(invoice_settings)
    allow(Stripe::Customer).to receive(:create).and_return(customer)
    allow(Stripe::Customer).to receive(:retrieve).and_return(customer)
  end

  describe 'company overview step' do
    it 'progresses to the next step' do
      authenticate_as project.user
      visit "/project_setup/#{project.airtable_id}/company_overview"
      content = 'This is the company description'
      fill_in 'companyDescription', with: content
      click_button 'Continue'
      expect(page).to have_content('Project Overview')
    end
  end

  describe 'project overview step' do
    it 'progresses to the next step' do
      authenticate_as project.user
      visit "/project_setup/#{project.airtable_id}/project_overview"
      content = 'This is the project description'
      fill_in 'description', with: content
      click_button 'Continue'
      expect(page).to have_content('Goals')
    end

    context 'when there is no company description' do
      it 'redirects to the company overview step' do
        project.update(company_description: nil)
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/project_overview"
        expect(page).to have_content('Company Overview')
      end
    end
  end

  describe 'project goals steps' do
    it 'progresses to the next step' do
      authenticate_as project.user
      visit "/project_setup/#{project.airtable_id}/goals"
      fill_in 'goals[0]', with: 'This is a project goal'
      click_button 'Continue'
      expect(page).to have_content('Specialist Overview')
    end

    context 'when there is no description' do
      it 'redirects to the project overview step' do
        project.update(description: nil)
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/goals"
        expect(page).to have_content('Project Overview')
      end
    end
  end

  describe 'specialist overview step' do
    it 'progresses to the next step' do
      authenticate_as project.user
      visit "/project_setup/#{project.airtable_id}/specialist_overview"
      fill_in 'specialistDescription',
              with: 'This is the specialist description'
      click_button 'Continue'
      expect(page).to have_content('Must-have Characteristics')
    end

    context 'when there are no goals' do
      it 'redirects to the goals step' do
        project.update(goals: [])
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/specialist_overview"
        expect(page).to have_content('Goals')
      end
    end
  end

  describe 'must have characteristics step' do
    it 'progresses to the next step' do
      authenticate_as project.user
      visit "/project_setup/#{project.airtable_id}/must_have"
      fill_in 'requiredCharacteristics[0]', with: 'characteristic'
      click_button 'Continue'
      expect(page).to have_content('Nice-to-have Characteristics')
    end

    context 'when there is no specialist overview' do
      it 'redirects to the specialist overview step' do
        project.update(specialist_description: nil)
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/must_have"
        expect(page).to have_content('Specialist Overview')
      end
    end
  end

  describe 'nice-to-have characteristics step' do
    it 'progresses to the next step' do
      authenticate_as project.user
      visit "/project_setup/#{project.airtable_id}/nice_to_have"
      fill_in 'optionalCharacteristics[0]', with: 'characteristic'
      click_button 'Continue'
      expect(page).to have_content('Questions')
    end

    context 'when there are no required characteristics' do
      it 'redirects to the specialist overview step' do
        project.update(required_characteristics: [])
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/nice_to_have"
        expect(page).to have_content('Must-have Characteristics')
      end
    end
  end

  describe 'questions step' do
    it 'progresses to the next step' do
      authenticate_as project.user
      visit "/project_setup/#{project.airtable_id}/questions"
      fill_in 'questions[0]', with: 'This is a question?'
      click_button 'Continue'
      expect(page).to have_content('Terms')
    end

    context 'when there are no required characteristics' do
      it 'redirects to the specialist overview step' do
        project.update(required_characteristics: [])
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/nice_to_have"
        expect(page).to have_content('Must-have Characteristics')
      end
    end
  end

  describe 'terms and conditions step' do
    it 'progresses to the deposit step' do
      authenticate_as project.user
      visit "/project_setup/#{project.airtable_id}/terms"
      check 'acceptedTerms'
      click_button 'Continue'
      expect(page).to have_content('Deposit')
    end

    context 'when the proejct does not require a deposit' do
      it 'progresses to the confirm step' do
        project.update(deposit: 0)
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/terms"
        check 'acceptedTerms'
        click_button 'Continue'
        expect(page).to have_current_path(
          "/projects/#{project.airtable_id}/applied"
        )
      end
    end
  end

  describe 'deposit step' do
    context 'when terms have not been accepted' do
      it 'redirects to the terms' do
        project.update(accepted_terms: false)
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/deposit"
        expect(page).to have_content('Terms')
      end
    end
  end
end
