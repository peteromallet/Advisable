require 'rails_helper'

describe Accounts::Jwt do
  it 'returns a JWT' do
    user = build(:user)
    expect(Accounts::Jwt.call(user)).to_not be_nil
  end
end