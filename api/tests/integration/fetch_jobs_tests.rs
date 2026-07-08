use crate::integration::test_utils::{get, get_json, setup_router_with_test_db};
use axum::body::Body;
use axum::http::{Request, StatusCode};
use portfolio_api::models::job::Job;
use tower::ServiceExt;

#[tokio::test]
async fn test_fetch_jobs_integration() {
    let jobs: Vec<Job> = get_json("/jobs").await;
    assert!(!jobs.is_empty(), "Jobs should not be empty");
}

#[tokio::test]
async fn test_fetch_job_by_id_integration() {
    let job: Job = get_json("/jobs/10").await;
    assert_eq!(job.id, 10, "Expected job ID to be 10");
}

#[tokio::test]
async fn test_fetch_job_by_id_not_found_integration() {
    let response = get("/jobs/9999").await;
    assert_eq!(response.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn test_negative_job_id() {
    let response = get("/jobs/-1").await;
    assert_eq!(response.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn test_jobs_method_not_allowed() {
    let router = setup_router_with_test_db().await;

    // POST to a GET-only endpoint
    let response = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/jobs")
                .header("Content-Type", "application/json")
                .body(Body::from(
                    serde_json::json!({
                        "title": "Test Job",
                        "company": "Test Company"
                    })
                    .to_string(),
                ))
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(response.status(), StatusCode::METHOD_NOT_ALLOWED);
}

#[tokio::test]
async fn test_jobs_path_not_found() {
    let response = get("/jobs/invalid/path").await;
    assert_eq!(response.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn test_jobs_content_type() {
    let response = get("/jobs").await;

    let content_type = response
        .headers()
        .get("content-type")
        .expect("Response should have Content-Type header");

    assert_eq!(
        content_type, "application/json",
        "Response Content-Type should be application/json"
    );
}
