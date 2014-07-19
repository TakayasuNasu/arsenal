class LoanCompaniesController < ApplicationController

	def create
		@loan_company = LoanCompany.new(loan_company_params)
		if @loan_company.save
			logger.info("登録")
		else
			logger.info("エラー : 登録できませんでした")
		end
		render :nothing => true
	end

	private

		def loan_company_params
			params.require(:loan_company).permit(:name, :address)
		end

		def set_loan_company
			@loan_company = LoanCompany.find(params[:id])
		end
end
