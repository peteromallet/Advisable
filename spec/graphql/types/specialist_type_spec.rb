require 'rails_helper'

describe Types::SpecialistType do
  let(:specialist) { create(:specialist) }
  let(:context) { { current_user: specialist } }
  let(:response) { AdvisableSchema.execute(query, context: context) }

  describe 'applications field' do
    let!(:application1) { create(:application, specialist: specialist, status: "Applied") }
    let(:project) { create(:project, sales_status: "Lost" )}
    let!(:application2) { create(:application, specialist: specialist, status: "Applied", project: project) }
    let!(:application3) { create(:application, specialist: specialist, status: "Invited To Apply") }
    let!(:application4) { create(:application, specialist: specialist, status: "Working") }

    let(:query) { %|
      {
        specialist(id: #{specialist.airtable_id}) {
          applications(status: ["Applied", "Invited To Apply"]) {
            id
          }
        }
      }
    |}

    it 'returns the specialists applications' do
      applications = response["data"]["specialist"]["applications"]
      expect(applications).to_not be_empty
    end

    it 'excludes the applications where project sales_status is Lost' do
      applications = response["data"]["specialist"]["applications"]
      expect(applications).to_not include({ "id" => application2.uid })
    end

    it 'can filter by status' do
      applications = response["data"]["specialist"]["applications"]
      expect(applications).to include({ "id" => application1.uid })
      expect(applications).to include({ "id" => application3.uid })
      expect(applications).to_not include({ "id" => application4.uid })
    end

    context 'when logged in as another specialist' do
      let(:context) {{ current_user: create(:specialist) }}

      it "prevents access" do
        error =  response["errors"][0][:code]
        expect(response["data"]["specialist"]["applications"]).to be_nil
        expect(error).to eq("invalidPermissions")
      end
    end

    context 'when logged in as a user' do
      let(:context) {{ current_user: project.user }}

      it "prevents access" do
        error =  response["errors"][0][:code]
        expect(response["data"]["specialist"]["applications"]).to be_nil
        expect(error).to eq("invalidPermissions")
      end
    end

    context 'when logged in as an admin' do
      let(:context) {{ current_user: create(:user, permissions: ["admin"]) }}

      it "allows access" do
        applications = response["data"]["specialist"]["applications"]
        expect(applications).to_not be_nil
      end
    end
  end
end