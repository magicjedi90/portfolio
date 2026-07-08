use crate::db::jobs_db;
use crate::handlers::{item_response, list_response};
use crate::models::job::Job;
use axum::extract::{Path, State};
use axum::response::IntoResponse;
use sqlx::PgPool;

/// Get all jobs
///
/// Returns a list of all jobs in the portfolio
#[utoipa::path(
    get,
    path = "/jobs",
    responses(
        (status = 200, description = "List of jobs retrieved successfully", body = Vec<Job>),
        (status = 500, description = "Internal server error")
    ),
    tag = "jobs"
)]
pub async fn get_jobs(State(pool): State<PgPool>) -> impl IntoResponse {
    list_response(jobs_db::fetch_jobs(&pool).await, "jobs")
}

/// Get a single job by ID
///
/// Returns a single job if found, or 404 if not found
#[utoipa::path(
    get,
    path = "/jobs/{job_id}",
    responses(
        (status = 200, description = "Job retrieved successfully", body = Job),
        (status = 404, description = "Job not found"),
        (status = 500, description = "Internal server error")
    ),
    params(
        ("job_id" = i32, Path, description = "ID of the job to retrieve")
    ),
    tag = "jobs"
)]
pub async fn get_job_by_id(
    State(pool): State<PgPool>,
    Path(job_id): Path<i32>,
) -> impl IntoResponse {
    item_response(jobs_db::fetch_job_by_id(&pool, job_id).await, "Job")
}
