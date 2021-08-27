# frozen_string_literal: true

require "rails_helper"

class DummySoftDeleteable < ApplicationRecord
  include SoftDeleteable
end

RSpec.describe SoftDeleteable do
  let(:article) { create(:case_study_article) }

  it "generates the expected set of methods" do
    expect(DummySoftDeleteable.instance_methods).to include(:soft_delete!, :restore!)
    expect(DummySoftDeleteable.methods(false)).to include(:active, :deleted)
  end

  describe "#soft_delete!" do
    it "sets deleted_at" do
      expect(article.deleted_at).to be_nil
      article.soft_delete!
      expect(article.deleted_at).not_to be_nil
      expect(CaseStudy::Article.active.pluck(:id)).not_to include(article.id)
      expect(CaseStudy::Article.deleted.pluck(:id)).to include(article.id)
    end
  end

  describe "#restore!" do
    let(:article) { create(:case_study_article, deleted_at: Time.current) }

    it "sets deleted_at to nil" do
      expect(article.deleted_at).not_to be_nil
      article.restore!
      expect(article.deleted_at).to be_nil
      expect(CaseStudy::Article.active.pluck(:id)).to include(article.id)
      expect(CaseStudy::Article.deleted.pluck(:id)).not_to include(article.id)
    end
  end
end
