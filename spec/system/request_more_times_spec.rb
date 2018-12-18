require 'rails_helper'

describe 'Accept interview request' do
  let(:user) {
    create(:user, {
      availability: [
        2.days.from_now.change({ hour: 10, min: 0, secs: 0 }),
        2.days.from_now.change({ hour: 10, min: 30, secs: 0 }),
        2.days.from_now.change({ hour: 11, min: 0, secs: 0 }),
        2.days.from_now.change({ hour: 11, min: 30, secs: 0 }),
      ]
    })
  }
  let(:interview) {
    create(:interview, status: "Call Requested", user: user)
  }
end
