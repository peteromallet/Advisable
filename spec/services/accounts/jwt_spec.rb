require 'rails_helper'

describe Accounts::JWT do
  it 'returns a JWT' do
    user = build(:user)
    expect(Accounts::JWT.call(user)).to_not be_nil
  end
end