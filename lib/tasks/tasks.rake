namespace :tasks do
  # This task will trigger a webhook for any tasks where their due date is the
  # previous day. This should be setup as a cron job to run once a day.
  task trigger_webhooks_for_past_due_date: :environment do
    Task.due_date(Date.yesterday).find_each do |task|
      WebhookEvent.trigger("tasks.due_date_past", WebhookEvent::Task.data(task))
    end
  end

  # This task willl trigger a webhook for any tasks where their due date is 3
  # days away. This should be setup to run on a daily basis.
  task trigger_webhooks_for_upcoming_due_date: :environment do
    Task.due_date(3.days.from_now).find_each do |task|
      WebhookEvent.trigger("tasks.due_date_upcoming", WebhookEvent::Task.data(task))
    end
  end
end
