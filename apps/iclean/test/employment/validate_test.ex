defmodule Employment.ValidateTest do
  use ExUnit.Case, async: true

  alias Employment.{ Search, Validate }

  setup do
    [
      search: %Search{
        params: %{
          "type" => "full_time",
          "wage" => 50,
          "per" => "hour",
          "employer" => "Some Employer Name",
        }
      }
    ]
  end

  describe "Search.valid_work_type?/1 for groups" do
    test "with valid type", ctx do
      result = Validate.work_type?(ctx.search)
      assert length(Map.keys(result.errors)) == 0
    end

    test "with invalid type", ctx do
      search = %Search{params: %{ctx.search.params | "type" => "full-time"}}
      result = Validate.work_type?(search)
      assert length(Map.keys(result.errors)) == 1
    end
  end

  describe "Search.valid_wage?/1 for groups" do
    test "with valid wage", ctx do
      result = Validate.wage?(ctx.search)
      assert length(Map.keys(result.errors)) == 0
    end

    test "with invalid wage", ctx do
      search = %Search{ params: %{ctx.search.params | "wage" => -23.99}}
      result = Validate.wage?(search)
      assert length(Map.keys(result.errors)) == 1
    end
  end

  describe "Search.valid_per?/1" do
    test "with valid per", ctx do
      result = Validate.per?(ctx.search)
      assert length(Map.keys(result.errors)) == 0
    end

    test "with invalid per", ctx do
      search = %Search{params: %{ctx.search.params | "per" => "second"}}
      result = Validate.per?(search)
      assert length(Map.keys(result.errors)) == 1
    end
  end

  describe "Search.valid_employer?/1" do
    test "with valid employer", ctx do
      result = Validate.employer?(ctx.search)
      assert length(Map.keys(result.errors)) == 0
    end

    test "with invalid employer", ctx do
      search = %Search{params: %{ctx.search.params | "employer" => 123}}
      result = Validate.employer?(search)
      assert length(Map.keys(result.errors)) == 1
    end
  end

  describe "Search.with/1" do
    test "all params are valid", ctx do
      result = Validate.with(ctx.search.params)
      assert length(Map.keys(result.errors)) == 0
    end
  end

  describe "Search.validate/1" do
    test "for group validation", ctx do
      result = Validate.validate(ctx.search.params, :group)
      assert length(Map.keys(result.errors)) == 0
    end

    test "for individual validation", ctx do
      result = Validate.validate(ctx.search.params, :individual)
      assert length(Map.keys(result.errors)) == 0
    end
  end
end

