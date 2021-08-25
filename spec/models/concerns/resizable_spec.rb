# frozen_string_literal: true

require "rails_helper"

class ResizedDummyImage
  def variant(_options)
    OpenStruct.new(processed?: true, hello: "World")
  end
end

class ResizedDummy
  include Resizable

  resize avatar: {resize_to_limit: [400, 400]}, cover_photo: {resize_to_limit: [2000, 2000]}

  def cover_photo
    nil
  end

  def avatar
    ResizedDummyImage.new
  end
end

RSpec.describe Resizable do
  let(:dummy) { ResizedDummy.new }
  let(:specialist) { create(:specialist) }
  let(:file) { Rails.root.join("spec/support/01.jpg") }
  let(:avatar) { ActiveStorage::Blob.create_and_upload!(io: File.open(file), filename: "01.jpg", content_type: "image/jpeg").signed_id }

  it "defines methods" do
    expect(dummy).to respond_to(:resized_avatar).
      and(respond_to(:resized_avatar_url).
      and(respond_to(:resized_cover_photo).
      and(respond_to(:resized_cover_photo_url))))
  end

  it "returns nil when empty" do
    expect(dummy.resized_cover_photo).to be_nil
    expect(dummy.resized_cover_photo_url).to be_nil
  end

  it "returns variant when processed" do
    expect(dummy.resized_avatar.hello).to eq("World")
  end

  context "when real world ActiveRecord" do
    it "returns variant" do
      specialist.avatar.attach(avatar)
      expect(specialist.resized_avatar).to be_a(ActiveStorage::VariantWithRecord)
    end

    it "returns an url" do
      specialist.avatar.attach(avatar)
      specialist.resized_avatar_url
      expect(specialist.resized_avatar_url).to start_with("http")
    end

    context "when many" do
      let(:project) { create(:previous_project) }
      let(:file2) { Rails.root.join("spec/support/02.jpg") }
      let(:image2) { ActiveStorage::Blob.create_and_upload!(io: File.open(file2), filename: "02.jpg", content_type: "image/jpeg").signed_id }

      it "returns variants" do
        project.images.attach(avatar)
        project.images.attach(image2)

        expect(project.resized_images).to all(be_a(ActiveStorage::VariantWithRecord))
      end

      it "returns urls" do
        project.images.attach(avatar)
        project.images.attach(image2)

        expect(project.resized_images_urls).to all(start_with("http"))
      end

      it "works correctly with _mapping method" do
        project.images.attach(avatar)
        project.images.attach(image2)
        mapping = project.resized_images_mapping

        # This is testing memoization 👇
        project.resized_images_mapping
        project.resized_images_mapping
        project.resized_images_mapping
        # This is testing memoization 👆

        keys = []
        project.images.attachments.each do |att|
          keys << att.blob_id
        end
        expect(mapping.keys).to eq(keys)
      end
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
