# require 'rails_helper'

# describe 'Request Introduction' do
#   before :each do
#     stub_request(:post, %r{https:\/\/api\.airtable\.com\/v0\/.*\/}).to_return(
#       status: 200, body: { "id": 'rec_123', "fields": {} }.to_json, headers: {}
#     )

#     allow_any_instance_of(Application).to receive(:sync_to_airtable)
#   end

#   it 'Creates an interview request' do
#     user = create(:user)
#     project = create(:project, user: user)
#     application = create(:application, status: 'Applied', project: project)

#     monday = Date.parse('monday')
#     delta = monday > Date.today ? 0 : 7
#     next_monday = monday + delta

#     authenticate_as project.user
#     visit "/projects/#{project.airtable_id}/applied"
#     click_on 'Request Call'
#     find("[aria-label='#{next_monday.strftime('%-d %b %Y, 10:00')}']").click
#     find("[aria-label='#{next_monday.strftime('%-d %b %Y, 10:30')}']").click
#     find("[aria-label='#{next_monday.strftime('%-d %b %Y, 11:00')}']").click
#     find("[aria-label='#{next_monday.strftime('%-d %b %Y, 11:30')}']").click
#     find("[aria-label='#{next_monday.strftime('%-d %b %Y, 12:00')}']").click
#     find("[aria-label='#{next_monday.strftime('%-d %b %Y, 12:30')}']").click
#     within "[role='dialog']" do
#       click_on 'Request Call'
#     end

#     expect(page).to have_content('An interview request has been sent')
#   end
# end
