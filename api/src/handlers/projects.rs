use crate::db::projects_db;
use crate::handlers::{item_response, list_response};
use crate::models::project::Project;
use axum::extract::{Path, State};
use axum::response::IntoResponse;
use sqlx::PgPool;

/// Get all projects
///
/// Returns a list of all projects in the portfolio
#[utoipa::path(
    get,
    path = "/projects",
    responses(
        (status = 200, description = "List of projects retrieved successfully", body = Vec<Project>),
        (status = 500, description = "Internal server error")
    ),
    tag = "projects"
)]
pub async fn get_projects(State(pool): State<PgPool>) -> impl IntoResponse {
    list_response(projects_db::fetch_projects(&pool).await, "projects")
}

/// Get a single project by ID
///
/// Returns a single project if found, or 404 if not found
#[utoipa::path(
    get,
    path = "/projects/{project_id}",
    responses(
        (status = 200, description = "Project retrieved successfully", body = Project),
        (status = 404, description = "Project not found"),
        (status = 500, description = "Internal server error")
    ),
    params(
        ("project_id" = i32, Path, description = "ID of the project to retrieve")
    ),
    tag = "projects"
)]
pub async fn get_project_by_id(
    State(pool): State<PgPool>,
    Path(project_id): Path<i32>,
) -> impl IntoResponse {
    item_response(
        projects_db::fetch_project_by_id(&pool, project_id).await,
        "Project",
    )
}

/// Get all projects for a specific job
///
/// Returns a list of all projects associated with the specified job
#[utoipa::path(
    get,
    path = "/projects/job/{job_id}",
    responses(
        (status = 200, description = "List of projects retrieved successfully", body = Vec<Project>),
        (status = 500, description = "Internal server error")
    ),
    params(
        ("job_id" = i32, Path, description = "ID of the job to fetch projects for")
    ),
    tag = "projects"
)]
pub async fn get_projects_by_job(
    State(pool): State<PgPool>,
    Path(job_id): Path<i32>,
) -> impl IntoResponse {
    list_response(
        projects_db::fetch_projects_by_job(&pool, job_id).await,
        "projects",
    )
}

/// Get all projects that use a specific skill
///
/// Returns a list of all projects that use the specified skill
#[utoipa::path(
    get,
    path = "/projects/skill/{skill_id}",
    responses(
        (status = 200, description = "List of projects retrieved successfully", body = Vec<Project>),
        (status = 500, description = "Internal server error")
    ),
    params(
        ("skill_id" = i32, Path, description = "ID of the skill to fetch projects for")
    ),
    tag = "projects"
)]
pub async fn get_projects_by_skill(
    State(pool): State<PgPool>,
    Path(skill_id): Path<i32>,
) -> impl IntoResponse {
    list_response(
        projects_db::fetch_projects_by_skill(&pool, skill_id).await,
        "projects",
    )
}
