use crate::db::skills_db;
use crate::handlers::{item_response, list_response};
use crate::models::skill::Skill;
use axum::extract::{Path, State};
use axum::response::IntoResponse;
use sqlx::PgPool;

/// Get all skills
///
/// Returns a list of all skills in the portfolio
#[utoipa::path(
    get,
    path = "/skills",
    responses(
        (status = 200, description = "List of skills retrieved successfully", body = Vec<Skill>),
        (status = 500, description = "Internal server error")
    ),
    tag = "skills"
)]
pub async fn get_skills(State(pool): State<PgPool>) -> impl IntoResponse {
    list_response(skills_db::fetch_skills(&pool).await, "skills")
}

/// Get a single skill by ID
///
/// Returns a single skill if found, or 404 if not found
#[utoipa::path(
    get,
    path = "/skills/{skill_id}",
    responses(
        (status = 200, description = "Skill retrieved successfully", body = Skill),
        (status = 404, description = "Skill not found"),
        (status = 500, description = "Internal server error")
    ),
    params(
        ("skill_id" = i32, Path, description = "ID of the skill to retrieve")
    ),
    tag = "skills"
)]
pub async fn get_skill_by_id(
    State(pool): State<PgPool>,
    Path(skill_id): Path<i32>,
) -> impl IntoResponse {
    item_response(skills_db::fetch_skill_by_id(&pool, skill_id).await, "Skill")
}
