require 'rails_helper'

describe Applications::Submit do
  let(:application) { create(:application, status: 'Invited To Apply') }

  before :each do
    airtable_record = double(Airtable::Application)
    allow(airtable_record).to receive(:push)
    allow(Airtable::Application).to receive(:find).and_return(airtable_record)
  end

  it 'sets an applications status to Applied' do
    expect { Applications::Submit.call(application) }.to change {
      application.reload.status
    }.from('Invited To Apply').to('Applied')
  end

  context 'when the status is Application Rejected' do
    it 'allows the candidate to reaply' do
      application = create(:application, status: "Application Rejected")
      expect { Applications::Submit.call(application) }.to change {
        application.reload.status
      }.from('Application Rejected').to('Applied')
    end
  end

  context 'when the status is not Invited To Apply or Invitation Rejected' do
    it 'raises an error' do
      application = create(:application, status: "Applied")
      expect { Applications::Submit.call(application) }
        .to raise_error(Service::Error, "applications.cannotSubmit")
    end
  end
end
