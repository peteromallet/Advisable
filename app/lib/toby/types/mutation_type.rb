# frozen_string_literal: true

module Toby
  module Types
    class MutationType < GraphQL::Schema::Object
      field :create_toby_view, mutation: Mutations::CreateView
      field :update_toby_view, mutation: Mutations::UpdateView
      field :delete_toby_view, mutation: Mutations::DeleteView

      Toby::Resources.resource_classes.each do |resource|
        field resource.query_name_update, mutation: resource.update_mutation
        field resource.query_name_create, mutation: resource.create_mutation
        field resource.query_name_delete, mutation: resource.delete_mutation
        field "trigger#{resource.model_s.camelize}Action", mutation: resource.action_mutation
      end
    end
  end
end
