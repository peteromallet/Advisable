# frozen_string_literal: true

module Mutations
  class PostCollaborationRequest < Mutations::BaseMutation
    description "Posts a new collaboration request"

    argument :audience_type, String, required: true
    argument :body, String, required: true
    argument :labels, [String], required: true
    argument :shareable, Boolean, required: false
    argument :title, String, required: true

    field :post, ::Types::Guild::Post::OpportunityType, null: true

    def authorized?(**_args)
      requires_accepted_specialist!
    end

    def resolve(**args)
      post = ::Guild::Opportunity.new(
        specialist_id: current_user.id,
        title: args[:title],
        body: args[:body],
        audience_type: args[:audience_type],
        shareable: args[:shareable],
        status: :published
      )

      labels = args[:labels].map { |name| Label.find_or_create_by(name: name) }
      post.labels = labels
      post.save!

      {post: post}
    end
  end
end
