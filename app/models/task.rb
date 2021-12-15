# frozen_string_literal: true

# Task
#
# Inside of the UI tasks are referred to as specialist projects. They are what
# are assigned to a specialist when a client is working with a specialist.
#
# == Attributes
#
# estimate_type [String] The type of estimate that was given for the task. This
#   should either be 'Hourly' or 'Fixed'.
#
# estimate [Int] The estimate for the task. If estimate_type is 'Hourly' this
#   indicates a number of hours. If estimate_type is 'Fixed' this represents
#   a currency amount in cents.
#
# flexible_estimate [Int] The flexible estimate for the task. When set it
#   means the task has a flexible estimate ranging from the 'estimate' value to
#   the 'flexible_estimate' value. If estimate_type is 'Hourly' this represents
#   a number of hours. If estimate_type is 'Fixed' this represents a currency
#   amount in cents.
#
# final_cost [Int] Represents the final cost of the task in cents. This is
#   usually set when the freelancer submits the task for approval from the
#   client.
#
class Task < ApplicationRecord
  include Uid

  has_logidze

  validates :estimate_type, inclusion: {in: %w[Hourly Fixed]}, allow_nil: true

  has_many :payments, dependent: :nullify
  has_one :payout, dependent: :nullify
  belongs_to :application

  scope :active, -> { where.not(stage: "Deleted") }

  # Returns a collection of tasks that have a due date on a given date.
  def self.due_date(date)
    Task.where("due_date >= ?", date.beginning_of_day).where(
      "due_date <= ?",
      date.end_of_day
    )
  end

  # Returns the amount of hours that should be invoiced for the task
  def invoice_hours
    (flexible_estimate || estimate).ceil
  end

  def fixed_estimate?
    estimate_type == "Fixed"
  end

  def financialize!
    return unless final_cost.to_i.positive?

    create_payout!
    create_payment!
  end

  private

  def create_payout!
    return if payout.present?

    Payout.create!(specialist_id: application.specialist_id, task: self, amount: final_cost, status: "pending")
  end

  def create_payment!
    amount = final_cost - payments.sum(:amount)
    return if amount.zero?

    payment = Payment.create!(company_id: application.project.user.company_id, specialist_id: application.specialist_id, amount: amount, task: self, status: "pending")
    payment.charge!
  end
end

# == Schema Information
#
# Table name: tasks
#
#  id                             :integer          not null, primary key
#  name                           :string
#  uid                            :string           not null
#  stage                          :string
#  estimate                       :integer
#  due_date                       :datetime
#  description                    :string
#  submitted_for_approval_comment :string
#  created_at                     :datetime         not null
#  updated_at                     :datetime         not null
#  application_id                 :integer
#  repeat                         :string
#  flexible_estimate              :integer
#  hours_worked                   :integer
#  trial                          :boolean
#  stripe_invoice_id              :string
#  estimate_type                  :string
#  final_cost                     :integer
#  to_be_invited_at               :datetime
#  quote_requested_at             :datetime
#  quote_provided_at              :datetime
#  assigned_at                    :datetime
#  started_working_at             :datetime
#  submitted_at                   :datetime
#  approved_at                    :datetime
#
# Indexes
#
#  index_tasks_on_application_id  (application_id)
#  index_tasks_on_stage           (stage)
#  index_tasks_on_uid             (uid) UNIQUE
#
