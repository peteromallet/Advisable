# frozen_string_literal: true

module Sluggable
  extend ActiveSupport::Concern

  class_methods do
    attr_reader :slug_source

    def find_by_slug_or_id(slug_or_id)
      find_by(slug: slug_or_id) || find_by(id: slug_or_id)
    end

    def find_by_slug_or_id!(slug_or_id)
      find_by(slug: slug_or_id) || find(slug_or_id)
    end

    def slug_from(column)
      @slug_source = column
    end
  end

  included do
    before_validation :set_slug
    validates :slug, uniqueness: true
  end

  def set_slug
    return if slug.present?

    self.slug = unique_slug
  end

  def unique_slug
    slug = public_send(self.class.slug_source).to_s.parameterize
    return slug unless slug_taken?(slug)

    (2..).each do |i|
      new_slug = "#{slug}-#{i}"
      break new_slug unless slug_taken?(new_slug)
    end
  end

  def slug_taken?(slug)
    self.class.exists?(slug: slug)
  end
end
