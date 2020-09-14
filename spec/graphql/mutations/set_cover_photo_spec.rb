require 'rails_helper'

describe Mutations::SetCoverPhoto do
  let(:specialist) { create(:specialist) }
  let(:context) { {current_user: specialist} }

  let(:query) do
    <<-GRAPHQL
    mutation {
      setCoverPhoto(input: {
        blob: "#{blob}",
      }) {
        specialist {
          id
        }
      }
    }
    GRAPHQL
  end

  let(:blob) do
    file = Rails.root.join('spec', 'support', '01.jpg')
    ActiveStorage::Blob.create_and_upload!(
      io: File.open(file),
      filename: '01.jpg',
      content_type: 'image/jpeg'
    ).signed_id
  end

  def execute
    AdvisableSchema.execute(
      query,
      context: context
    )
  end

  it 'attaches the passed blob as an cover_photo' do
    expect(specialist.reload.cover_photo).to_not be_attached
    execute
    expect(specialist.reload.cover_photo).to be_attached
  end

  context 'when no specialist is signed in' do
    let(:context) { {current_user: nil} }

    it 'returns an error' do
      error = execute['errors'].first['extensions']['code']
      expect(error).to eq('notAuthenticated')
    end
  end

  context 'when a user is signed in' do
    let(:context) { {current_user: create(:user)} }

    it 'returns an error' do
      error = execute['errors'].first['extensions']['code']
      expect(error).to eq('MUST_BE_SPECIALIST')
    end
  end

  context 'when passed an invalid blob' do
    let(:blob) { 'invalidblob' }

    it 'returns an error' do
      error = execute['errors'].first['extensions']['code']
      expect(error).to eq('INVALID_BLOB')
    end
  end
end
