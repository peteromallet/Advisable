# frozen_string_literal: true

class GraphqlChannel < ApplicationCable::Channel
  def subscribed
    @subscription_ids = []
  end

  def execute(data)
    result = execute_query(data)

    payload = {
      result: result.subscription? ? {data: nil} : result.to_h,
      more: result.subscription?
    }

    @subscription_ids << context[:subscription_id] if result.context[:subscription_id]

    transmit(payload)
  end

  def unsubscribed
    @subscription_ids.each do |sid|
      AdvisableSchema.subscriptions.delete_subscription(sid)
    end
  end

  private

  def execute_query(data)
    AdvisableSchema.execute(
      query: data["query"],
      context:,
      variables: data["variables"],
      operation_name: data["operationName"]
    )
  end

  def context
    {
      current_user:,
      current_user_id: current_user&.id,
      current_account:,
      current_account_id: current_account&.id,
      channel: self
    }
  end
end
