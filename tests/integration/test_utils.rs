use axum::Router;
use axum::body::Body;
use axum::http::Request;
use axum::response::Response;
use dotenvy::dotenv;
use serde::de::DeserializeOwned;
use sqlx::{Error, PgPool};
use tower::ServiceExt;

// NOTE: these integration tests run against the live database pointed to by
// `DATABASE_URL` and assume it is seeded with known data (e.g. job/project
// IDs 1 and 10 exist). Make sure `DATABASE_URL` points at a test database.

/// Establishes a database connection for integration tests, loading
/// `DATABASE_URL` from the `.env` file or environment variables.
pub async fn get_test_db_pool() -> Result<PgPool, Error> {
    dotenv().ok();

    let database_url = std::env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set in your .env file or as an environment variable");

    PgPool::connect(&database_url).await
}

/// Builds the full application router backed by the test database pool.
pub async fn setup_router_with_test_db() -> Router {
    let pool = get_test_db_pool()
        .await
        .expect("Failed to get test DB pool");

    portfolio_api::routes::create_router(pool)
}

/// Sends a GET request to a freshly built router and returns the raw response.
pub async fn get(uri: &str) -> Response {
    let router = setup_router_with_test_db().await;
    router
        .oneshot(
            Request::builder()
                .method("GET")
                .uri(uri)
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap()
}

/// Sends a GET request, asserts a 200 response, and deserializes the JSON body.
pub async fn get_json<T: DeserializeOwned>(uri: &str) -> T {
    let response = get(uri).await;
    assert_eq!(response.status(), 200, "GET {} should return 200", uri);

    let body = axum::body::to_bytes(response.into_body(), usize::MAX)
        .await
        .unwrap();
    serde_json::from_slice(&body).expect("Failed to parse response body")
}
