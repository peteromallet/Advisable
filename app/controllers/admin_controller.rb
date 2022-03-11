# frozen_string_literal: true

class AdminController < ApplicationController
  layout "tailwind"
  before_action :admin?
end
