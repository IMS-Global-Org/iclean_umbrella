defmodule Employment.SearchTest do
  use ExUnit.Case, async: true

  alias Employment.Search

  setup do
    [
      json_params: %{
        "type" => "full_time",
        "wage" => 50,
        "per" => "hour",
        "employer" => "Some Employer Name",
      }
    ]
  end

  describe "Search.valid_work_type?/1 for groups" do
    test "with valid type", context do
      search = %Search{ params: context[:json_params]}
      result = Search.valid_work_type?(search)
      assert length(Map.keys(result.errors)) == 0
    end

    test "with invalid type", context do
      search = %Search{params: %{context.json_params | "type" => "full-time"}}
      result = Search.valid_work_type?(search)
      assert length(Map.keys(result.errors)) == 1
    end
  end
end
