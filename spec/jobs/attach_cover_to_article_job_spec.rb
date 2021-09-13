# frozen_string_literal: true

require "rails_helper"

RSpec.describe AttachCoverToArticleJob do
  let(:article) { create(:case_study_article) }
  let(:s3_client) { Aws::S3::Client.new(stub_responses: true) }

  before do
    allow(Aws::S3::Client).to receive(:new).and_return(s3_client)
    s3_client.stub_responses(:list_objects, {contents: [{key: "cover.jpg"}]})
    stub_request(:get, /#{AttachCoverToArticleJob::BUCKET_NAME}.*amazonaws/o).to_return(body: "")
  end

  it "attaches a random photo" do
    expect(article.cover_photo).to receive(:attach).with(hash_including(filename: "cover.jpg"))
    described_class.perform_now(article)
  end
end
