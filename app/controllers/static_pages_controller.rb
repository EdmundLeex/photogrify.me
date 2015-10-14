class StaticPagesController < ApplicationController
	def root
		require_user!
	end

	def home
		redirect_to root_url if current_user
	end
end
