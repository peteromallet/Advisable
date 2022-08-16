# frozen_string_literal: true

require "rails_helper"

class SluggableDummy
  def self.exists?(_)
    if @num_exists.positive?
      @num_exists -= 1
      return true
    end
    false
  end

  def self.before_validation(_); end

  def self.validates(*_args); end

  include Sluggable
  slug_from :title

  attr_reader :options

  def initialize(num_exists, **options)
    self.class.instance_variable_set(:@num_exists, num_exists)
    @options = options
  end

  def method_missing(method, *_args, **_options, &)
    return options[method] if respond_to_missing?(method)

    super
  end

  def respond_to_missing?(method)
    options.key?(method)
  end
end

RSpec.describe Sluggable do
  let(:dummy) { SluggableDummy.new(0, title: "aa bb") }

  it "sets the slug" do
    expect(dummy.__send__(:unique_slug)).to eq("aa-bb")
  end

  context "when there are already instances with that slug" do
    let(:dummy) { SluggableDummy.new(3, title: "aa bb") }

    it "sets the slug" do
      expect(dummy.__send__(:unique_slug)).to eq("aa-bb-4")
    end
  end
end
