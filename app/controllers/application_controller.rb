class ApplicationController < ActionController::Base
  def not_found
    render json: "Not found.", status: 404
  end
end
