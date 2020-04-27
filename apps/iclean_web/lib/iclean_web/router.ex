defmodule ICleanWeb.Router do
  use ICleanWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", ICleanWeb do
    pipe_through :api
  end
end
