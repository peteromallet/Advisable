# frozen_string_literal: true

# The SpecialistOrUser module contains of all the login for user accounts. Both Users and
# Specialists are able to login to the system and act as user accounts.
module SpecialistOrUser
  extend ActiveSupport::Concern

  included do
    belongs_to :account, dependent: :destroy
  end

  delegate :email, :first_name, :last_name, :name, to: :account

  %i[find_by_email find_by_remember_token].each do |method|
    define_singleton_method(method) do |param|
      Account.public_send(method, param)&.specialist_or_user
    end

    define_singleton_method("#{method}!") do |param|
      public_send(method, param).presence || raise(ActiveRecord::RecordNotFound)
    end
  end

  %i[find_by_uid_or_airtable_id find_by_uid find_by_airtable_id].each do |method|
    define_singleton_method(method) do |param|
      Specialist.public_send(method, param) || User.public_send(method, param)
    end

    define_singleton_method("#{method}!") do |param|
      public_send(method, param).presence || raise(ActiveRecord::RecordNotFound)
    end
  end
end
