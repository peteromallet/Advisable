class WebhookEvent::Specialist
  def self.data(specialist)
    {
      uid: specialist.uid,
      airtable_id: specialist.airtable_id,
      first_name: specialist.first_name,
      last_name: specialist.last_name,
      has_account: specialist.has_account?,
    }
  end
end