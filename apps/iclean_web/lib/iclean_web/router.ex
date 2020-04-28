defmodule ICleanWeb.Router do
  use ICleanWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug ICleanWeb.APIAuthPlug, otp_app: :iclean
  end

  pipeline :api_protected do
    plug Pow.Plug.RequireAuthenticated, error_handler: MyAppWeb.APIAuthErrorHandler
  end

  scope "/api", ICleanWeb do
    pipe_through :api

    # Auth API endpoints here
    resources "/registration", RegistrationController, singleton: true, only: [:create]
    resources "/session", SessionController, singleton: true, only: [:create, :delete]
    post "/session/renew", SessionController, :renew

    # Your public API endpoints here
  end

  scope "/api", ICleanWeb do
    pipe_through [:api, :api_protected]

    # Your protected API endpoints here
  end
end
