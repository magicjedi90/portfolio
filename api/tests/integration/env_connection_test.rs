use dotenvy::dotenv;
use portfolio_api::db::connection::{connect, connect_with_config};

#[tokio::test]
async fn test_database_connection() {
    // Load .env file for defaults
    dotenv().ok();

    let result = connect().await;
    assert!(
        result.is_ok(),
        "Database connection failed: {:?}",
        result.err()
    );
}

#[tokio::test]
async fn test_database_connection_failure_missing_url() {
    let result = connect_with_config("", 5).await;
    assert!(
        result.is_err(),
        "Expected error when database_url is invalid"
    );
}
