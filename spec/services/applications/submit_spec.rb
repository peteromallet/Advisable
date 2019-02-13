require 'rails_helper'

describe Applications::Submit do
  let(:application) { create(:application, status: 'Invited To Apply') }

  it 'Sets an applications status to Applied' do
    expect { Applications::Submit.call(application) }.to change {
      application.reload.status
    }.from('Invited To Apply').to('Applied')
  end

  context 'When the status is not Invited To Apply' do
    it 'raises an error' do
      application = create(:application, status: "Applied")
      expect { Applications::Submit.call(application) }
        .to raise_error(Service::Error, /Cannot submit application with status/)
    end
  end
end
