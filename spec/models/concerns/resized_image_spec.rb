# frozen_string_literal: true

require "rails_helper"

class ResizedDummyImage
  def variant(_options)
    OpenStruct.new(processed?: true, hello: "World")
  end
end

class ResizedDummy
  include ResizedImage

  resize avatar: {resize_to_limit: [400, 400]}, cover_photo: {resize_to_limit: [2000, 2000]}

  def cover_photo
    nil
  end

  def avatar
    ResizedDummyImage.new
  end
end

RSpec.describe ResizedImage do
  let(:dummy) { ResizedDummy.new }
  let(:specialist) { create(:specialist) }
  let(:file) { Rails.root.join("spec/support/01.jpg") }
  let(:avatar) { ActiveStorage::Blob.create_and_upload!(io: File.open(file), filename: "01.jpg", content_type: "image/jpeg").signed_id }

  it "defines methods" do
    expect(dummy).to respond_to(:resized_avatar).
      and respond_to(:resized_avatar_url).
      and respond_to(:resized_cover_photo).
      and respond_to(:resized_cover_photo_url)
  end

  it "returns nil when empty" do
    expect(dummy.resized_cover_photo).to be_nil
    expect(dummy.resized_cover_photo_url).to be_nil
  end

  it "returns variant when processed" do
    expect(dummy.resized_avatar.hello).to eq("World")
  end

  context "when real world ActiveRecord" do
    it "schedules ResizeImageJob" do
      specialist.avatar.attach(avatar)
      specialist.resized_avatar
      expect(ResizeImageJob).to have_been_enqueued.with(specialist, :avatar, resize_to_limit: [400, 400])
    end

    it "schedules ResizeImageJob on url method" do
      specialist.avatar.attach(avatar)
      specialist.resized_avatar_url
      expect(ResizeImageJob).to have_been_enqueued.with(specialist, :avatar, resize_to_limit: [400, 400])
    end
  end

  context "when pdf" do
    let(:file)  { Rails.root.join("spec/support/test.pdf") }
    let(:avatar) { ActiveStorage::Blob.create_and_upload!(io: File.open(file), filename: "test.pdf").signed_id }

    it "removes the image" do
      specialist.avatar.attach(avatar)
      expect(specialist.resized_avatar_url).to be_nil
      expect(specialist.avatar).not_to be_attached
    end
  end
end
