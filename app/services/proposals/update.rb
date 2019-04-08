class Proposals::Update < ApplicationService
  attr_reader :proposal, :attributes

  def initialize(proposal:, attributes:)
    @proposal = proposal
    @attributes = attributes
  end

  def call
    if proposal.update_attributes(allowed_attributes)
      proposal.sync_to_airtable
      return proposal
    else
      raise Service::Error.new(proposal.errors.full_messages.first)
    end
  end

  private

  def allowed_attributes
    attributes.slice(:rate)
  end
end