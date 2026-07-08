use crate::api_docs::ApiDoc;
use crate::handlers::jobs::{get_job_by_id, get_jobs};
use crate::handlers::projects::{
    get_project_by_id, get_projects, get_projects_by_job, get_projects_by_skill,
};
use crate::handlers::skills::{get_skill_by_id, get_skills};
use axum::http::HeaderValue;
use axum::{Router, routing::get};
use sqlx::PgPool;
use tower_http::cors::{Any, CorsLayer};
use tracing::warn;
use utoipa::OpenApi;
use utoipa_swagger_ui::{Config, SwaggerUi};

const OPENAPI_JSON_PATH: &str = "/api-docs/openapi.json";
const DEFAULT_CORS_ORIGIN: &str = "https://sindbadmcintosh.com";

/// Builds the CORS layer from the `CORS_ALLOWED_ORIGINS` environment variable —
/// a comma-separated list of origins (e.g. "http://localhost:3000,https://example.com").
/// Falls back to the production origin when unset; invalid entries are skipped with a warning.
fn cors_layer() -> CorsLayer {
    let origins: Vec<HeaderValue> = std::env::var("CORS_ALLOWED_ORIGINS")
        .unwrap_or_else(|_| DEFAULT_CORS_ORIGIN.to_string())
        .split(',')
        .map(str::trim)
        .filter(|origin| !origin.is_empty())
        .filter_map(|origin| match HeaderValue::from_str(origin) {
            Ok(value) => Some(value),
            Err(_) => {
                warn!("Ignoring invalid CORS origin: {:?}", origin);
                None
            }
        })
        .collect();

    if origins.is_empty() {
        warn!("No valid CORS origins configured; browsers will be blocked from calling the API");
    }

    CorsLayer::new()
        .allow_origin(origins)
        .allow_methods(Any)
        .allow_headers(Any)
}

/// Creates and configures all API routes
pub fn create_router(pool: PgPool) -> Router {
    // Create the base router
    let app = Router::new();

    // Create nested routers for each resource type
    let projects_router = Router::new()
        .route("/", get(get_projects))
        .route("/{project_id}", get(get_project_by_id))
        .route("/job/{job_id}", get(get_projects_by_job))
        .route("/skill/{skill_id}", get(get_projects_by_skill));

    let jobs_router = Router::new()
        .route("/", get(get_jobs))
        .route("/{job_id}", get(get_job_by_id));

    let skills_router = Router::new()
        .route("/", get(get_skills))
        .route("/{skill_id}", get(get_skill_by_id));

    let config = Config::new([OPENAPI_JSON_PATH]);
    let swagger_ui = SwaggerUi::new("/swagger-ui")
        .config(config)
        .url(OPENAPI_JSON_PATH, ApiDoc::openapi());

    // Nest the routers under their respective paths
    app.nest("/projects", projects_router)
        .nest("/jobs", jobs_router)
        .nest("/skills", skills_router)
        .merge(swagger_ui)
        .layer(cors_layer())
        .with_state(pool)
}
