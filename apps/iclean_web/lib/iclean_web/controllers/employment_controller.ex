defmodule EmloymentController do
  use ICleanWeb, :controller

  alias Employment.{Search}

  def search(conn, params) do
    employments = Search.with(params)
    json(conn, employments)
  end
end
