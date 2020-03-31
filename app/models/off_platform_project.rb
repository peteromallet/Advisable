class OffPlatformProject < PreviousProject
  include Uid
  include Airtable::Syncable

  uid_prefix 'opp'
end
