class Api::PhotoTaggingsController < ApplicationController
  before_filter :require_current_user!, :only => [:create]
  before_filter :requrie_owner_user!, :only => [:create]

  def create
    @photo_tagging = PhotoTagging.new(params[:photo_tagging])
    if @photo_tagging.save
      render :json => @photo_tagging
    else

      render(
        :json => @photo_tagging.error.full_messages,
        :status => :unprocessable_entity
      )
    end
  end

  def index
    @photo_taggings =
      PhotoTagging.where("photo_id = ?", params[:photo_id])

    render :json => @photo_taggings
  end

  private
  def require_owner_user!
    # TODO: really should give permission error!
    redirect_to user_url(current_user)
  end
end