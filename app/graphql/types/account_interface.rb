# frozen_string_literal: true

module Types::AccountInterface
  include Types::BaseInterface
  delegate :account, to: :object

  field :name, String, null: true
  field :first_name, String, null: true
  field :last_name, String, null: true
  delegate :name, :first_name, :last_name, to: :account

  field :needs_to_set_a_password, Boolean, null: true

  def needs_to_set_a_password
    account.password_digest.blank?
  end

  field :confirmed, Boolean, null: false

  def confirmed
    account.confirmed_at.present?
  end

  field :account_id, String, null: true

  def account_id
    account.uid
  end
end
