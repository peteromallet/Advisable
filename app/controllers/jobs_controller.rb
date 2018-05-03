class JobsController < ApplicationController
  def show
    @job = Job.find(params[:id])
    @candidates = @job[:candidates]
    puts @candidates.class
  end
end
