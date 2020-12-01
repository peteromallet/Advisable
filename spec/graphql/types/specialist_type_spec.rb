require 'rails_helper'

RSpec.describe Types::SpecialistType do
  let(:specialist) { create(:specialist) }
  let(:context) { {current_user: specialist} }
  let(:response) { AdvisableSchema.execute(query, context: context) }

  describe 'applications field' do
    let!(:application1) do
      create(:application, specialist: specialist, status: 'Applied')
    end
    let(:project) { create(:project, sales_status: 'Lost') }
    let!(:application2) do
      create(
        :application,
        specialist: specialist, status: 'Applied', project: project
      )
    end
    let!(:application3) do
      create(:application, specialist: specialist, status: 'Invited To Apply')
    end
    let!(:application4) do
      create(:application, specialist: specialist, status: 'Working')
    end

    let(:query) do
      <<-GRAPHQL
      {
        specialist(id: "#{specialist.airtable_id}") {
          applications(status: ["Applied", "Invited To Apply"], salesStatus: ["Open"]) {
            id
          }
        }
      }
      GRAPHQL
    end

    it 'returns the specialists applications' do
      applications = response['data']['specialist']['applications']
      expect(applications).not_to be_empty
    end

    it 'excludes the applications where project sales_status is Lost' do
      applications = response['data']['specialist']['applications']
      expect(applications).not_to include({'id' => application2.uid})
    end

    it 'can filter by status' do
      applications = response['data']['specialist']['applications']
      expect(applications).to include({'id' => application1.uid})
      expect(applications).to include({'id' => application3.uid})
      expect(applications).not_to include({'id' => application4.uid})
    end

    context 'when logged in as another specialist' do
      let(:context) { {current_user: create(:specialist)} }

      it 'prevents access' do
        error = response['errors'][0][:code]
        expect(response['data']['specialist']['applications']).to be_nil
        expect(error).to eq('invalidPermissions')
      end
    end

    context 'when logged in as a user' do
      let(:context) { {current_user: project.user} }

      it 'prevents access' do
        error = response['errors'][0][:code]
        expect(response['data']['specialist']['applications']).to be_nil
        expect(error).to eq('invalidPermissions')
      end
    end

    context 'when logged in as an admin' do
      let(:context) { {current_user: create(:user, account: create(:account, permissions: %w[admin]))} }

      it 'allows access' do
        applications = response['data']['specialist']['applications']
        expect(applications).not_to be_nil
      end
    end
  end

  describe "email field" do
    let(:query) do
      <<-GRAPHQL
      {
        specialist(id: "#{specialist.uid}") {
          email
        }
      }
      GRAPHQL
    end

    context "when logged in as another specialist" do
      let(:context) { {current_user: create(:specialist)} }

      it "prevents access" do
        error = response["errors"][0][:code]
        expect(response["data"]["specialist"]["applications"]).to be_nil
        expect(error).to eq("invalidPermissions")
      end
    end

    context "when logged in as a user" do
      let(:context) { {current_user: create(:user)} }

      it "prevents access" do
        error = response["errors"][0][:code]
        expect(response["data"]["specialist"]["applications"]).to be_nil
        expect(error).to eq("invalidPermissions")
      end
    end

    context "when logged in as a user from the same company" do
      let(:project) { create(:project) }
      let(:application) { create(:application, specialist: specialist, status: 'Applied', project: project) }
      let(:context) { {current_user: create(:user, company: application.project.user.company)} }

      it "allows access" do
        email = response["data"]["specialist"]["email"]
        expect(email).not_to be_nil
      end
    end

    context "when logged in as an admin" do
      let(:context) { {current_user: create(:user, account: create(:account, permissions: %w[admin]))} }

      it "allows access" do
        email = response["data"]["specialist"]["email"]
        expect(email).not_to be_nil
      end
    end
  end

  context "with a guild specialist" do
    let!(:specialist) { create(:specialist, :guild) }
    let(:query) do
      <<-GRAPHQL
      {
        specialist(id: "#{specialist.uid}") {
          id
          guildPosts(first: 10) {
            pageInfo {
              endCursor
              hasNextPage
            }
            nodes {
              ... on PostInterface {
                status
                id
              }
            }
          }
        }
      }
      GRAPHQL
    end

    context "with a freelancer profile" do
      it "does not include draft posts" do
        published_post = create(:guild_post, specialist: specialist, status: "published")
        create(:guild_post, specialist: specialist, status: "draft")
        expect(specialist.guild_posts.count).to eq(2)

        response = AdvisableSchema.execute(query)
        data = response.dig("data", "specialist", "guildPosts", "nodes")
        expect(data).to eq([{"status" => "published", "id" => published_post.id}])
      end
    end
  end
end
