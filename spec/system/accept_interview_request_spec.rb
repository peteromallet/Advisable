require 'rails_helper'

describe 'Accept interview request' do
  let(:client) {
    create(:client, {
      availability: [
        2.days.from_now.change({ hour: 10, min: 0, secs: 0 }),
        2.days.from_now.change({ hour: 10, min: 30, secs: 0 }),
        2.days.from_now.change({ hour: 11, min: 0, secs: 0 }),
        2.days.from_now.change({ hour: 11, min: 30, secs: 0 }),
      ]
    })
  }
  let(:project) { create(:project, client: client) }
  let(:application) { create(:application, project: project) }
  let(:interview) {
    create(:interview, status: "Call Requested", application: application)
  }

  it 'Accepts an interview request' do
    specialist_airtable_record = double('Airtable::Specialist')
    expect(specialist_airtable_record).to receive(:[]=).with('Phone Number', '0861234567')
    expect(specialist_airtable_record).to receive(:save)
    expect(Airtable::Specialist).to receive(:find).with(interview.application.specialist.airtable_id).and_return(specialist_airtable_record)

    interview_airtable_record = double('Airtable::Interview')
    expect(interview_airtable_record).to receive(:[]=).with('Interview Time', client.availability[0])
    expect(interview_airtable_record).to receive(:[]=).with('Call Status', 'Call Scheduled')
    expect(interview_airtable_record).to receive(:save)
    expect(Airtable::Interview).to receive(:find).with(interview.airtable_id).and_return(interview_airtable_record)

    visit "/interview_request/#{interview.airtable_id}"
    click_on client.availability[0].strftime("%A")
    click_on "10:00am - 10:30am"
    fill_in "phoneNumber", with: "0861234567"
    click_on "Confirm Call"
    expect(page).to have_content("has been scheduled!")
  end
end
