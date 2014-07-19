require 'test_helper'

class LoanCompanyTest < ActiveSupport::TestCase
  test "loanCompany uniqueness save" do
    loan_company = LoanCompany.new({
    	name: "ジープラ",
    	address: "東京都港区六本木7丁目18番18号"
    	})
    refute loan_company.save, "Failed to save"
  end

  test "loanCompany presence save" do
    loan_company = LoanCompany.new({
    	name: "",
    	address: ""
    	})
    refute loan_company.save, "Failed to save"
  end
end
