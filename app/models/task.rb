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
  self.ignored_columns += %i[airtable_id]

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

  def charge!
    return unless final_cost.to_i.positive?

    create_payout!
    create_payment!
  end

  private

  def create_payout!
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
#  id                             :bigint           not null, primary key
#  approved_at                    :datetime
#  assigned_at                    :datetime
#  description                    :string
#  due_date                       :datetime
#  estimate                       :integer
#  estimate_type                  :string
#  final_cost                     :integer
#  flexible_estimate              :integer
#  hours_worked                   :integer
#  name                           :string
#  quote_provided_at              :datetime
#  quote_requested_at             :datetime
#  repeat                         :string
#  stage                          :string
#  started_working_at             :datetime
#  submitted_at                   :datetime
#  submitted_for_approval_comment :string
#  to_be_invited_at               :datetime
#  trial                          :boolean
#  uid                            :string           not null
#  created_at                     :datetime         not null
#  updated_at                     :datetime         not null
#  application_id                 :bigint
#  stripe_invoice_id              :string
#
# Indexes
#
#  index_tasks_on_airtable_id     (airtable_id)
#  index_tasks_on_application_id  (application_id)
#  index_tasks_on_stage           (stage)
#  index_tasks_on_uid             (uid) UNIQUE
#
