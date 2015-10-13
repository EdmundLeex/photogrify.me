class StaticPagesController < ApplicationController
	def root
	end

	def home
		require_user!
	end
end
