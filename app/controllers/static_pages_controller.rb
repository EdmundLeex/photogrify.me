class StaticPagesController < ApplicationController
	def root
		redirect_to home_url if current_user
	end

	def home
		require_user!
	end
end
